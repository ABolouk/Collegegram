import { MigrationInterface, QueryRunner } from "typeorm";

export class LikeLikecount1695920057250 implements MigrationInterface {
    name = 'LikeLikecount1695920057250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block" DROP CONSTRAINT "FK_c9a8df2f7cbbae1cda940694409"`);
        await queryRunner.query(`ALTER TABLE "block" DROP CONSTRAINT "FK_b7c8985f27f5b0d1820832318da"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP CONSTRAINT "FK_68c61ba1dea94c21a5ea73da3f6"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP CONSTRAINT "FK_e1ab31ec1750a22a2bf403c52ec"`);
        await queryRunner.query(`ALTER TABLE "block" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "block" DROP COLUMN "blockedUserId"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP COLUMN "user1Id"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "likeCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "block" ADD "userIdId" character varying`);
        await queryRunner.query(`ALTER TABLE "block" ADD "blockedUserIdId" character varying`);
        await queryRunner.query(`ALTER TABLE "block" ADD CONSTRAINT "FK_2553888904670ce4b94c37bd987" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "block" ADD CONSTRAINT "FK_88c720f9e88a5c03a58388049bc" FOREIGN KEY ("blockedUserIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD CONSTRAINT "FK_187adc6c8c4186b70aa2fec1ef0" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD CONSTRAINT "FK_0247095e520dfd5a5f97357f58d" FOREIGN KEY ("followingId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow requset" DROP CONSTRAINT "FK_0247095e520dfd5a5f97357f58d"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP CONSTRAINT "FK_187adc6c8c4186b70aa2fec1ef0"`);
        await queryRunner.query(`ALTER TABLE "block" DROP CONSTRAINT "FK_88c720f9e88a5c03a58388049bc"`);
        await queryRunner.query(`ALTER TABLE "block" DROP CONSTRAINT "FK_2553888904670ce4b94c37bd987"`);
        await queryRunner.query(`ALTER TABLE "block" DROP COLUMN "blockedUserIdId"`);
        await queryRunner.query(`ALTER TABLE "block" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "likeCount"`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD "user1Id" character varying`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD "userId" character varying`);
        await queryRunner.query(`ALTER TABLE "block" ADD "blockedUserId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "block" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD CONSTRAINT "FK_e1ab31ec1750a22a2bf403c52ec" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD CONSTRAINT "FK_68c61ba1dea94c21a5ea73da3f6" FOREIGN KEY ("user1Id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "block" ADD CONSTRAINT "FK_b7c8985f27f5b0d1820832318da" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "block" ADD CONSTRAINT "FK_c9a8df2f7cbbae1cda940694409" FOREIGN KEY ("blockedUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
