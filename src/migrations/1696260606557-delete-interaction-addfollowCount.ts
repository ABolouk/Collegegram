import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteInteractionAddfollowCount1696260606557 implements MigrationInterface {
    name = 'DeleteInteractionAddfollowCount1696260606557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "followerCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "followingCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "followingCount"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "followerCount"`);
    }

}
