import { MigrationInterface, QueryRunner } from "typeorm";

export class DevelopmentFollowReq1695397190492 implements MigrationInterface {
    name = 'DevelopmentFollowReq1695397190492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow requset" DROP CONSTRAINT "FK_68c61ba1dea94c21a5ea73da3f6"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP CONSTRAINT "FK_e1ab31ec1750a22a2bf403c52ec"`);
        await queryRunner.query(`CREATE TABLE "block" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userIdId" character varying, "blockedUserIdId" character varying, CONSTRAINT "PK_d0925763efb591c2e2ffb267572" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP COLUMN "user1Id"`);
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
        await queryRunner.query(`ALTER TABLE "follow requset" ADD "user1Id" character varying`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD "userId" character varying`);
        await queryRunner.query(`DROP TABLE "block"`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD CONSTRAINT "FK_e1ab31ec1750a22a2bf403c52ec" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD CONSTRAINT "FK_68c61ba1dea94c21a5ea73da3f6" FOREIGN KEY ("user1Id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
