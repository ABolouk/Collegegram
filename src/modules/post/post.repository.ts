import { DataSource, Repository } from "typeorm";
import { PostEntity } from "./entity/post.entity";
import { PostId } from "./model/post-id";
import { UserId } from "../user/model/user.id";
import { CreatePostDao, PostDao } from "./dao/post.dao";
import { zodHomePagePostsDao } from "./dao/home-page.dao";
import { UserEntity } from "../user/entity/user.entity";
import { CreatePostInterface } from "./model/post";
import { TagEntity } from "./tag/entity/tag.entity";
import { CreateTagInterface } from "./tag/model/tag";
import { LessThan, In } from "typeorm";


export class PostRepository {
    private postRepo: Repository<PostEntity>;
    constructor(private appDataSource: DataSource) {
        this.postRepo = appDataSource.getRepository(PostEntity);
    }

    async getPostById(id: PostId): Promise<PostDao | null> {
        const post = await this.postRepo.findOne({
            relations: ['tags'],
            where: { id: id },
        })
        return post ? CreatePostDao(post) : null;
    }

    async getPostsByUserId(userId: UserId, limit: number, startTime: Date): Promise<[PostDao[], boolean]> {
        const [posts, count] = await this.postRepo.findAndCount({
            relations: ['tags'],
            where: {
                userId: userId as UserId,
                createdAt: LessThan(startTime),
            },
            order: { createdAt: 'desc' },
            take: limit,
        });
        const hasMore = (count - limit) > 0;
        return [posts.map(x => CreatePostDao(x)), hasMore]
    }

    async getPostsByusersId(usersId: string[], limit: number, startTime: Date) {
        const posts = await this.postRepo.find({
            relations: ["tags"],
            where: {
                userId: In(usersId),
                createdAt: LessThan(startTime),
            },
            order: { createdAt: 'desc' },
            take: limit,
        })
        const homePagePosts = zodHomePagePostsDao.parse(posts)
        return homePagePosts
    }

    async createPost(post: CreatePostInterface): Promise<PostDao> {
        return await this.appDataSource.manager.transaction(async (manager) => {
            const postRepo = manager.getRepository(PostEntity);
            const userRepo = manager.getRepository(UserEntity);
            const tagRepo = manager.getRepository(TagEntity);
            const createNewTag = async (element: CreateTagInterface) => {
                const existingTag = await tagRepo.findOneBy({ title: element.title });
                if (!existingTag) {
                    return await tagRepo.save({
                        title: element.title,
                        color: element.color,
                    }) as TagEntity
                } else {
                    return existingTag
                }
            }
            const createdTags = post.tags ? await Promise.all(post.tags.map(createNewTag)) : []
            const newPost = await postRepo.save({
                userId: post.userId,
                photos: post.photos,
                tags: createdTags,
                description: post.description,
                closeFriends: post.closeFriends,
            }) as PostEntity
            await userRepo.update(
                { id: post.userId },
                { postCount: () => "postCount + 1" }
            )
            return CreatePostDao(newPost);
        })
    }

    async getAuthorById(postId: PostId): Promise<UserId | null> {
        const post = await this.postRepo.findOne({where: {id: postId}})
        return post ? post.userId : null
    }
}
