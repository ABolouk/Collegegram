import { MigrationInterface, QueryRunner } from "typeorm";

export class Interaction1694797895296 implements MigrationInterface {
    name = 'Interaction1694797895296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "userInteraction" ("id" SERIAL NOT NULL, "userId1" character varying NOT NULL, "userId2" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e73fa457f6df7b4ce75164cb596" UNIQUE ("userId1", "userId2"), CONSTRAINT "PK_3d4fde7f2d2672bcbb32d5e6fca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_interaction_user_id1_users" ("userInteractionId" integer NOT NULL, "usersId" character varying NOT NULL, CONSTRAINT "PK_028c6cad101aa40de778b5aaeef" PRIMARY KEY ("userInteractionId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cfbe1c590c304b03257eebcad7" ON "user_interaction_user_id1_users" ("userInteractionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_07c7b884eebc597cec830e822b" ON "user_interaction_user_id1_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "user_interaction_user_id2_users" ("userInteractionId" integer NOT NULL, "usersId" character varying NOT NULL, CONSTRAINT "PK_10bc82cda8ea124ce5e0e2deec3" PRIMARY KEY ("userInteractionId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d31748d6958a90187c7c5e64c2" ON "user_interaction_user_id2_users" ("userInteractionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_39f27d863ac9b111aa5d1df9c9" ON "user_interaction_user_id2_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "user_interaction_user_id1_users" ADD CONSTRAINT "FK_cfbe1c590c304b03257eebcad7f" FOREIGN KEY ("userInteractionId") REFERENCES "userInteraction"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_interaction_user_id1_users" ADD CONSTRAINT "FK_07c7b884eebc597cec830e822b2" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_interaction_user_id2_users" ADD CONSTRAINT "FK_d31748d6958a90187c7c5e64c29" FOREIGN KEY ("userInteractionId") REFERENCES "userInteraction"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_interaction_user_id2_users" ADD CONSTRAINT "FK_39f27d863ac9b111aa5d1df9c9f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_interaction_user_id2_users" DROP CONSTRAINT "FK_39f27d863ac9b111aa5d1df9c9f"`);
        await queryRunner.query(`ALTER TABLE "user_interaction_user_id2_users" DROP CONSTRAINT "FK_d31748d6958a90187c7c5e64c29"`);
        await queryRunner.query(`ALTER TABLE "user_interaction_user_id1_users" DROP CONSTRAINT "FK_07c7b884eebc597cec830e822b2"`);
        await queryRunner.query(`ALTER TABLE "user_interaction_user_id1_users" DROP CONSTRAINT "FK_cfbe1c590c304b03257eebcad7f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_39f27d863ac9b111aa5d1df9c9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d31748d6958a90187c7c5e64c2"`);
        await queryRunner.query(`DROP TABLE "user_interaction_user_id2_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_07c7b884eebc597cec830e822b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cfbe1c590c304b03257eebcad7"`);
        await queryRunner.query(`DROP TABLE "user_interaction_user_id1_users"`);
        await queryRunner.query(`DROP TABLE "userInteraction"`);
    }

}
