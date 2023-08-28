import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMgration31693241893902 implements MigrationInterface {
    name = 'TestMgration31693241893902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "expireDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
