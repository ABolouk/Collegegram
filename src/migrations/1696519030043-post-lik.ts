import { MigrationInterface, QueryRunner } from "typeorm";

export class PostLik1696519030043 implements MigrationInterface {
    name = 'PostLik1696519030043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block" DROP CONSTRAINT "FK_2553888904670ce4b94c37bd987"`);
        await queryRunner.query(`ALTER TABLE "block" DROP CONSTRAINT "FK_88c720f9e88a5c03a58388049bc"`);
        await queryRunner.query(`ALTER TABLE "block" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "block" DROP COLUMN "blockedUserIdId"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "likeCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "commentCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "block" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "block" ADD "blockedUserId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "block" ADD CONSTRAINT "FK_b7c8985f27f5b0d1820832318da" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "block" ADD CONSTRAINT "FK_c9a8df2f7cbbae1cda940694409" FOREIGN KEY ("blockedUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block" DROP CONSTRAINT "FK_c9a8df2f7cbbae1cda940694409"`);
        await queryRunner.query(`ALTER TABLE "block" DROP CONSTRAINT "FK_b7c8985f27f5b0d1820832318da"`);
        await queryRunner.query(`ALTER TABLE "block" DROP COLUMN "blockedUserId"`);
        await queryRunner.query(`ALTER TABLE "block" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "commentCount"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "likeCount"`);
        await queryRunner.query(`ALTER TABLE "block" ADD "blockedUserIdId" character varying`);
        await queryRunner.query(`ALTER TABLE "block" ADD "userIdId" character varying`);
        await queryRunner.query(`ALTER TABLE "block" ADD CONSTRAINT "FK_88c720f9e88a5c03a58388049bc" FOREIGN KEY ("blockedUserIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "block" ADD CONSTRAINT "FK_2553888904670ce4b94c37bd987" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
