import { MigrationInterface, QueryRunner } from "typeorm";

export class Commentcnt1696073186221 implements MigrationInterface {
    name = 'Commentcnt1696073186221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "commentCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "commentCount"`);
    }

}
