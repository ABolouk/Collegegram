import { DataSource, Repository } from "typeorm";
import { PostEntity } from "./entity/post.entity";
import { PostId } from "./model/post-id";
import { UserId } from "../user/model/user.id";
import { PostDao } from "./dao/post.dao";

export class PostRepository {
    private postRepo: Repository<PostEntity>;
    constructor(appDataSourece: DataSource) {
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

    createPost(post: PostDao): Promise<PostEntity> {
        return this.postRepo.save(post);
    }
}
