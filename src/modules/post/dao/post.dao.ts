import { PostEntity } from "../entity/post.entity";
import { TagInterface } from "../tag/model/tag";
import { zodTagDao } from "../tag/dao/tag.dao";

export type PostDao = {
    photos: string[];
    description?: string;
    tags?: TagInterface[];
    closeFriends: boolean;
    createdAt: Date;
};

export const CreatePostDao = (post: PostEntity): PostDao => ({
        photos: post.photos,
        description: post.description,
        tags: post.tags?.map(x => zodTagDao.parse(x)) || [],
        closeFriends: post.closeFriends,
        createdAt: post.createdAt,
    })
