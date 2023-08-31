import { DataSource, Repository } from "typeorm";
import { PostEntity } from "./entity/post.entity";
import { PostId } from "./model/post-id";
import { UserId } from "../user/model/user.id";
import { CommentEntity } from "./comment/entity/comment.entity";
import { CreateTagInterface } from "./tag/model/tsg";

export interface CreatePost {
    userId: UserId;
    photos: string[];
    description?: string;
    comments?: CommentEntity[];
    tags?: CreateTagInterface[];
    closeFriends: boolean;
};

export class PostRepository {
    private postRepo: Repository<PostEntity>;
    constructor(appDataSourece: DataSource) {
        this.postRepo = appDataSourece.getRepository(PostEntity);
    }

    getPostById(id: PostId): Promise<PostEntity | null> {
        return this.postRepo.findOneBy({ id });
    }

    getPostsByUserId(userId: UserId, perPage: number, pageNumber: number): Promise<PostEntity[]> {
        return this.postRepo.find({
            where: { userId: userId },
            order: { createdAt: 'ASC', id: 'ASC' },
            skip: perPage * (pageNumber - 1),
            take: perPage,
        });
    }

    createPost(post: CreatePost): Promise<PostEntity> {
        return this.postRepo.save(post);
    }
}