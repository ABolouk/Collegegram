import { MigrationInterface, QueryRunner } from "typeorm";

export class FollowFollowreq1695142997089 implements MigrationInterface {
    name = 'FollowFollowreq1695142997089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "postCount"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "interactionId"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "followerId"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "followingId"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP COLUMN "interactionId"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP COLUMN "followingId"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP COLUMN "followerId"`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "interactionIdId" integer`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "followerIdId" character varying`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "followingIdId" character varying`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD "interactionIdId" integer`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD "followerIdId" character varying`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD "followingIdId" character varying`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_9caabdf926c73855f513caba5c4" FOREIGN KEY ("interactionIdId") REFERENCES "userInteraction"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_6233d655bc025d8cfce12db1bca" FOREIGN KEY ("followerIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_aca89a748d87102b636c8715835" FOREIGN KEY ("followingIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD CONSTRAINT "FK_0d44fb7b918b0d698ada3efa9e7" FOREIGN KEY ("interactionIdId") REFERENCES "userInteraction"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD CONSTRAINT "FK_dc8b1d28f2e9c6f04968f501421" FOREIGN KEY ("followerIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD CONSTRAINT "FK_088953ddd7ef0b2d97edcad9d58" FOREIGN KEY ("followingIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow requset" DROP CONSTRAINT "FK_088953ddd7ef0b2d97edcad9d58"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP CONSTRAINT "FK_dc8b1d28f2e9c6f04968f501421"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP CONSTRAINT "FK_0d44fb7b918b0d698ada3efa9e7"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_aca89a748d87102b636c8715835"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_6233d655bc025d8cfce12db1bca"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_9caabdf926c73855f513caba5c4"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP COLUMN "followingIdId"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP COLUMN "followerIdId"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP COLUMN "interactionIdId"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "followingIdId"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "followerIdId"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP COLUMN "interactionIdId"`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD "followerId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD "followingId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD "interactionId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "followingId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "followerId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "follow" ADD "interactionId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "postCount" integer NOT NULL DEFAULT '0'`);
    }

}
