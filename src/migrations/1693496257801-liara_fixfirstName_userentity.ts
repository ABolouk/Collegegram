import { MigrationInterface, QueryRunner } from "typeorm";

export class LiaraFixfirstNameUserentity1693496257801 implements MigrationInterface {
    name = 'LiaraFixfirstNameUserentity1693496257801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "firsrName" TO "firstName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "firstName" TO "firsrName"`);
    }

}
