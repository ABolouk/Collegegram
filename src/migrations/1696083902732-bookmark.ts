import { MigrationInterface, QueryRunner } from "typeorm";

export class Bookmark1696083902732 implements MigrationInterface {
    name = 'Bookmark1696083902732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bookmark" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "postId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b7fbf4a865ba38a590bb9239814" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "likeCount"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "commentCount"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "bookmarkCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_e389fc192c59bdce0847ef9ef8b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_ee4a9b84b65399f9a6581d9a9a5" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_ee4a9b84b65399f9a6581d9a9a5"`);
        await queryRunner.query(`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_e389fc192c59bdce0847ef9ef8b"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "bookmarkCount"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "commentCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "likeCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`DROP TABLE "bookmark"`);
    }

}
