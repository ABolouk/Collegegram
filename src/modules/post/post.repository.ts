import { DataSource, Repository } from "typeorm";
import { PostEntity } from "./entity/post.entity";
import { PostId } from "./model/post-id";
import { UserId } from "../user/model/user.id";
import { zodPostDao } from "./dao/post.dao";
import { zodHomePagePostsDao } from "./dao/home-page.dao";
import { UserEntity } from "../user/entity/user.entity";
import { CreatePostInterface, PostInterface } from "./model/post";
import { TagEntity } from "./tag/entity/tag.entity";
import { CreateTagInterface } from "./tag/model/tag";
import { LessThan, In } from "typeorm";

export class PostRepository {
    private postRepo: Repository<PostEntity>;
    constructor(private appDataSource: DataSource) {
        this.postRepo = appDataSource.getRepository(PostEntity);
    }

    async getPostById(id: PostId): Promise<PostInterface | null> {
        const post = await this.postRepo.findOne({
            relations: ['tags'],
            where: { id: id },
        })
        return post ? zodPostDao.parse(post) : null;
    }

    async getTotalPostById(id: PostId) {
        return await this.postRepo.findOne({
            where: { id: id },
        })
    }

    async getPostsByUserId(userId: UserId, limit: number, startTime: Date): Promise<PostDao[]> {
        const posts = await this.postRepo.find({
            relations: ['tags'],
            where: {
                userId: userId,
                createdAt: LessThan(startTime),
            },
            order: { createdAt: 'desc' },
            take: limit,
        });
        return posts.map(post => zodPostDao.parse(post))
    }

    async getPostsByusersId(usersId: UserId[], limit: number, startTime: Date) {
        const [posts, count] = await this.postRepo.findAndCount({
            relations: ["tags"],
            where: {
                userId: In(usersId),
                createdAt: LessThan(startTime),
            },
            order: { createdAt: 'desc' },
            take: limit,
        })
        const homePagePosts = zodHomePagePostsDao.parse(posts)
        const hasMore = count > limit
        return {homePagePosts, hasMore}
    }

    async createPost(post: CreatePostInterface): Promise<PostInterface> {
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
            })
            await userRepo.update(
                { id: post.userId },
                { postCount: () => "postCount + 1" }
            )
            return zodPostDao.parse(newPost);
        })
    }

    async userHasMorePosts(userId: UserId, startTime: Date): Promise<boolean> {
        const posts = await this.postRepo.find(
            {where: {userId: userId, createdAt: LessThan(startTime)}}
        )
        return posts.length !== 0;
    }

    async getAuthorById(postId: PostId): Promise<UserId | null> {
        const post = await this.postRepo.findOne({where: {id: postId}})
        return post ? post.userId : null
    }
}
