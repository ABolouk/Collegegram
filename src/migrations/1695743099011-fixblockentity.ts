import { MigrationInterface, QueryRunner } from "typeorm";

export class Fixblockentity1695743099011 implements MigrationInterface {
    name = 'Fixblockentity1695743099011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow requset" DROP CONSTRAINT "FK_0247095e520dfd5a5f97357f58d"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP CONSTRAINT "FK_187adc6c8c4186b70aa2fec1ef0"`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD "userId" character varying`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD "user1Id" character varying`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD CONSTRAINT "FK_e1ab31ec1750a22a2bf403c52ec" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD CONSTRAINT "FK_68c61ba1dea94c21a5ea73da3f6" FOREIGN KEY ("user1Id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follow requset" DROP CONSTRAINT "FK_68c61ba1dea94c21a5ea73da3f6"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP CONSTRAINT "FK_e1ab31ec1750a22a2bf403c52ec"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP COLUMN "user1Id"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD CONSTRAINT "FK_187adc6c8c4186b70aa2fec1ef0" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD CONSTRAINT "FK_0247095e520dfd5a5f97357f58d" FOREIGN KEY ("followingId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
