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
import { EditPostDto } from "./dto/edit-post.dto";
import { zodTagDao } from "./tag/dao/tag.dao";

export class PostRepository {
    private postRepo: Repository<PostEntity>;
    private tagRepo: Repository<TagEntity>;
    constructor(private appDataSource: DataSource) {
        this.postRepo = appDataSource.getRepository(PostEntity);
        this.tagRepo = appDataSource.getRepository(TagEntity);
    }

    async getPostById(id: PostId): Promise<PostInterface | null> {
        const post = await this.postRepo.findOne({
            relations: ['tags'],
            where: { id: id },
        })
        return post ? zodPostDao.parse(post) : null;
    }

    async getPostsByUserId(userId: UserId, limit: number, startTime: Date): Promise<PostInterface[]> {
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
            const createdTags = post.tags ? await Promise.all(post.tags.map(this.createOrGetTag)) : []
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

    private async createOrGetTag(element: CreateTagInterface): Promise<TagEntity> {
        const existingTag = await this.tagRepo.findOneBy({ title: element.title });
        if (!existingTag) {
            return await this.tagRepo.save({
                title: element.title,
                color: element.color,
            }) as TagEntity
        } else {
            return existingTag
        }
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

    async editPostById(postId: PostId, dto: EditPostDto): Promise<PostInterface> {
        const tags = await Promise.all(
            dto.tags
                .map(tag => (
                    this.createOrGetTag(zodTagDao.parse({ title: tag.title, color:tag.color }))
                ))
        )
        const post = await this.postRepo.save(
            {
                id: postId,
                description: dto.description,
                tags: tags,
                closeFriends: dto.closeFriend,
            }
        )
        return zodPostDao.parse(post)
    }
}
