import { MigrationInterface, QueryRunner } from "typeorm";

export class Fix1696107672443 implements MigrationInterface {
    name = 'Fix1696107672443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "bookmarkCount"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "likeCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "commentCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "commentCount"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "likeCount"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "bookmarkCount" integer NOT NULL DEFAULT '0'`);
    }

}
