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

    getPostById(id: PostId) {
        return this.postRepo.findOneBy({ id })
    }

    getPostsByUserId(userId: UserId): Promise<PostEntity[]> {
        return this.postRepo.find({
            where: {
                userId: userId
            }
        })
    }

    createPost(post: CreatePost) {
        return this.postRepo.save(post)
    }
}