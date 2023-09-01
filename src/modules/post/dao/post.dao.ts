import { UserId } from "../../user/model/user.id";
import { CommentEntity } from "../comment/entity/comment.entity";
import { PostEntity } from "../entity/post.entity";
import { CreateTagInterface } from "../tag/model/tag";

export type PostDao = {
    userId: UserId;
    photos: string[];
    description?: string;
    comments?: CommentEntity[];
    tags?: CreateTagInterface[];
    closeFriends: boolean;
};

export const CreatePostDao = (post: PostEntity): PostDao => ({
    userId: post.userId,
    photos: post.photos,
    description: post.description,
    comments: post.comments,
    tags: post.tags,
    closeFriends: post.closeFriends,
})
