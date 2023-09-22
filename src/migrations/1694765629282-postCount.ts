import { MigrationInterface, QueryRunner } from "typeorm";

export class PostCount1694765629282 implements MigrationInterface {
    name = 'PostCount1694765629282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "postCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "postCount"`);
    }

}
