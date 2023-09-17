import { DataSource, Repository } from "typeorm";
import { PostEntity } from "./entity/post.entity";
import { PostId } from "./model/post-id";
import { UserId } from "../user/model/user.id";
import { CreatePostDao, PostDao } from "./dao/post.dao";
import { UserEntity } from "../user/entity/user.entity";
import { CreatePostInterface } from "./model/post";
import { TagEntity } from "./tag/entity/tag.entity";
import { CreateTagInterface } from "./tag/model/tag";

export class PostRepository {
    private postRepo: Repository<PostEntity>;
    constructor(private appDataSource: DataSource) {
        this.postRepo = appDataSource.getRepository(PostEntity);
    }

    getPostById(id: PostId): Promise<PostEntity | null> {
        return this.postRepo.findOneBy({ id });
    }

    getPostsByUserId(userId: UserId, limit: number, page: number): Promise<PostEntity[]> {
        return this.postRepo.find({
            where: { userId: userId },
            order: { createdAt: 'ASC', id: 'ASC' },
            skip: limit * (page - 1),
            take: limit,
        });
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
                description: post.description,
                closeFriends: post.closeFriends,
            }) as PostEntity
            await userRepo.update(
                { id: post.userId },
                { postCount: () => "postCount + 1" }
            )
            newPost.tags = createdTags;
            await this.appDataSource.manager.save(newPost);
            return CreatePostDao(newPost);
        })
    }
}
