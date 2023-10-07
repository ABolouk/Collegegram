import { MigrationInterface, QueryRunner } from "typeorm";

export class FixAvatart1696257896400 implements MigrationInterface {
    name = 'FixAvatart1696257896400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_26d54baee41e71d60ae6823cc08"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP CONSTRAINT "FK_52d7bc99aa34bb2f7a9facb6a67"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "likeCount"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "commentCount"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "interactionId"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP COLUMN "interactionId"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "avatar" SET DEFAULT 'https://collegegram-avatars.darkube.app/default-avatar.png'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "avatar" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD "interactionId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "interactionId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "commentCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "likeCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD CONSTRAINT "FK_52d7bc99aa34bb2f7a9facb6a67" FOREIGN KEY ("interactionId") REFERENCES "userInteraction"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_26d54baee41e71d60ae6823cc08" FOREIGN KEY ("interactionId") REFERENCES "userInteraction"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
