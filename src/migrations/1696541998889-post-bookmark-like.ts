import { MigrationInterface, QueryRunner } from "typeorm";

export class PostBookmarkLike1696541998889 implements MigrationInterface {
    name = 'PostBookmarkLike1696541998889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "bookmarkCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "bookmarkCount"`);
    }

}
