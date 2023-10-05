import { MigrationInterface, QueryRunner } from "typeorm";

export class Notification1696535043787 implements MigrationInterface {
    name = 'Notification1696535043787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notifications" ("id" SERIAL NOT NULL, "interactingUserId" character varying NOT NULL, "interactedUserId" character varying NOT NULL, "type" character varying NOT NULL, "postId" integer, "commentId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_627b9741fe3db5e4889cc4c91a9" FOREIGN KEY ("interactingUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_8ce1ff2572f085752a7f0f34087" FOREIGN KEY ("interactedUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_93c464aaf70fb0720dc500e93c8" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_9faba56a12931cf4e38f9dddb49" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_9faba56a12931cf4e38f9dddb49"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_93c464aaf70fb0720dc500e93c8"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_8ce1ff2572f085752a7f0f34087"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_627b9741fe3db5e4889cc4c91a9"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
    }

}
