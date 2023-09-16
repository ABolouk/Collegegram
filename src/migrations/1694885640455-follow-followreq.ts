import { MigrationInterface, QueryRunner } from "typeorm";

export class FollowFollowreq1694885640455 implements MigrationInterface {
    name = 'FollowFollowreq1694885640455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "follow" ("id" SERIAL NOT NULL, "interactionId" integer NOT NULL, "followerId" character varying NOT NULL, "followingId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fda88bc28a84d2d6d06e19df6e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "follow requset" ("id" SERIAL NOT NULL, "interactionId" integer NOT NULL, "followerId" character varying NOT NULL, "followingId" character varying NOT NULL, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_208b1c80c75b048a23c43d3b0a7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "follow requset"`);
        await queryRunner.query(`DROP TABLE "follow"`);
    }

}
