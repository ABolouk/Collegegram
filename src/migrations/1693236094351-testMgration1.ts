import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMgration11693236094351 implements MigrationInterface {
    name = 'TestMgration11693236094351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "firsrName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "bio" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "avatar" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "avatar" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "bio" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "firsrName" SET NOT NULL`);
    }

}
