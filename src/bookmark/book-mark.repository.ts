import { DataSource, Repository } from "typeorm";
import { BookmarkEntity } from "./entity/book-mark.entity";
import { Bookmark, bookmarkInterface } from "./model/book-mark";
import { PostEntity } from "../modules/post/entity/post.entity";
import { PostId } from "../modules/post/model/post-id";

export class BookmarkRepository {
  private bookmarkRepo: Repository<BookmarkEntity>
  constructor(private appDataSource: DataSource) {
    this.bookmarkRepo = appDataSource.getRepository(BookmarkEntity);
  }

  createBookmark(bookmark: bookmarkInterface) {
    return new Promise<bookmarkInterface>(async (resolve, reject) => {
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

  async getBookmark(bookmark: bookmarkInterface): Promise<Bookmark | null> {
    const getBookmark = await this.bookmarkRepo.findOneBy({ userId: bookmark.userId, postId: bookmark.postId })
    return getBookmark
  }

  async deleteBookmark(bookmark: Bookmark) {
    return new Promise<bookmarkInterface>(async (resolve, reject) => {
      try {
        await this.appDataSource.manager.transaction(async manager => {
          const postRepo = manager.getRepository(PostEntity);
          const bookmarkRepo = manager.getRepository(BookmarkEntity);
          const newBookmark = await bookmarkRepo.delete({ id: bookmark.id });
          await postRepo.update(
            { id: bookmark.postId },
            { bookmarkCount: () => "bookmarkCount - 1" }
          );
        });
      } catch (error) {
        reject(error);
      }
    });
  }

}