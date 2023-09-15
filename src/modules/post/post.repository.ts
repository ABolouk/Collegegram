import { DataSource, Repository } from "typeorm";
import { PostEntity } from "./entity/post.entity";
import { PostId } from "./model/post-id";
import { UserId } from "../user/model/user.id";
import { PostDao } from "./dao/post.dao";
import { UserEntity } from "../user/entity/user.entity";

export class PostRepository {
    private postRepo: Repository<PostEntity>;
    constructor(private appDataSourece: DataSource) { // FIXME: wrong spelling
        this.postRepo = appDataSourece.getRepository(PostEntity);
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

    async createPost(post: PostDao): Promise<PostEntity> {
        return await this.appDataSourece.manager.transaction(async (manager) => {
            const postRepo = manager.getRepository(PostEntity);
            const userRepo = manager.getRepository(UserEntity);
            const newPost = await postRepo.save(post)
            await userRepo.update(
                { id: post.userId },
                { postCount: () => "postCount + 1" }
            )
            return newPost
        })
    }
}
