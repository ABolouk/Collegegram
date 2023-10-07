import { DataSource, LessThan, Repository } from "typeorm";
import { BookmarkEntity } from "./entity/book-mark.entity";
import { Bookmark, BookmarkInterface } from "./model/book-mark";
import { PostEntity } from "../post/entity/post.entity";
import { UserId } from "../user/model/user.id";
import { zodBookmarkPostsDao } from "./dao/bookmark.dao";
import { z } from "zod"

export class BookmarkRepository {
  private bookmarkRepo: Repository<BookmarkEntity>
  constructor(private appDataSource: DataSource) {
    this.bookmarkRepo = appDataSource.getRepository(BookmarkEntity);
  }

  createBookmark(bookmark: BookmarkInterface) {
    return new Promise<BookmarkInterface>(async (resolve, reject) => {
      try {
        await this.appDataSource.manager.transaction(async manager => {
          const postRepo = manager.getRepository(PostEntity);
          const bookmarkRepo = manager.getRepository(BookmarkEntity);
          const newBookmark = await bookmarkRepo.save({
            userId: bookmark.userId,
            postId: bookmark.postId
          });
          await postRepo.update(
            { id: bookmark.postId },
            { bookmarkCount: () => "bookmarkCount + 1" }
          );
          resolve(newBookmark);
        });
      } catch (error) {
        reject(error);
      }
    });

  }

  async isBookmarked(bookmark: BookmarkInterface): Promise<Bookmark | null> {
    return this.bookmarkRepo.findOneBy({ userId: bookmark.userId, postId: bookmark.postId });
  }

  async getBookmark(bookmark: BookmarkInterface): Promise<Bookmark | null> {
    const getBookmark = await this.bookmarkRepo.findOneBy({ userId: bookmark.userId, postId: bookmark.postId })
    return getBookmark
  }


  async getBookmarksByUserId(userId: UserId, limit: number, startTime: Date) {
    const [posts, count] = await this.bookmarkRepo.findAndCount(
      {
        relations: ["post"],
        where: {
          userId: userId,
          createdAt: LessThan(startTime)
        },
        select: {
          post: {
            id: true,
            photos: true,
            createdAt: true
          }
        },
        order: { createdAt: 'desc' },
        take: limit

      }
    )
    const bookmarkPosts = z.nullable(zodBookmarkPostsDao).parse(posts)
    const hasMore = count > limit
    return { bookmarkPosts: bookmarkPosts, hasMore: hasMore }
  }

  async deleteBookmark(bookmark: Bookmark) {
    await this.appDataSource.manager.transaction(async manager => {
      const postRepo = manager.getRepository(PostEntity);
      const bookmarkRepo = manager.getRepository(BookmarkEntity);
      const deletedBookmark = await bookmarkRepo.delete({ userId: bookmark.userId, postId: bookmark.postId });
      await postRepo.update(
        { id: bookmark.postId },
        { bookmarkCount: () => "bookmarkCount - 1" }
      );
    });

  }

}