import {MigrationInterface, QueryRunner} from "typeorm";

export class DevelopmentStage1Liara1695393096745 implements MigrationInterface {
    name = 'DevelopmentStage1Liara1695393096745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying, "lastName" character varying, "bio" character varying, "avatar" character varying, "isPrivate" boolean NOT NULL DEFAULT false, "postCount" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "userId" character varying NOT NULL, "expireDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "postId" integer NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "color" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_25cae3ff755adc0abe5ca284092" UNIQUE ("title"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "photos" character varying array NOT NULL, "description" character varying NOT NULL, "closeFriends" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "userInteraction" ("id" SERIAL NOT NULL, "userId1" character varying NOT NULL, "userId2" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e73fa457f6df7b4ce75164cb596" UNIQUE ("userId1", "userId2"), CONSTRAINT "PK_3d4fde7f2d2672bcbb32d5e6fca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "follow" ("id" SERIAL NOT NULL, "interactionId" integer NOT NULL, "followerId" character varying NOT NULL, "followingId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fda88bc28a84d2d6d06e19df6e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "follow requset" ("id" SERIAL NOT NULL, "interactionId" integer NOT NULL, "followerId" character varying NOT NULL, "followingId" character varying NOT NULL, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" character varying, "user1Id" character varying, CONSTRAINT "PK_208b1c80c75b048a23c43d3b0a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts_tags_tags" ("postsId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_0102fd077ecbe473388af8f3358" PRIMARY KEY ("postsId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cf364c7e6905b285c4b55a0034" ON "posts_tags_tags" ("postsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ce163a967812183a51b044f740" ON "posts_tags_tags" ("tagsId") `);
        await queryRunner.query(`CREATE TABLE "user_interaction_user_id1_users" ("userInteractionId" integer NOT NULL, "usersId" character varying NOT NULL, CONSTRAINT "PK_028c6cad101aa40de778b5aaeef" PRIMARY KEY ("userInteractionId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cfbe1c590c304b03257eebcad7" ON "user_interaction_user_id1_users" ("userInteractionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_07c7b884eebc597cec830e822b" ON "user_interaction_user_id1_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "user_interaction_user_id2_users" ("userInteractionId" integer NOT NULL, "usersId" character varying NOT NULL, CONSTRAINT "PK_10bc82cda8ea124ce5e0e2deec3" PRIMARY KEY ("userInteractionId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d31748d6958a90187c7c5e64c2" ON "user_interaction_user_id2_users" ("userInteractionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_39f27d863ac9b111aa5d1df9c9" ON "user_interaction_user_id2_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_26d54baee41e71d60ae6823cc08" FOREIGN KEY ("interactionId") REFERENCES "userInteraction"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_550dce89df9570f251b6af2665a" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_e9f68503556c5d72a161ce38513" FOREIGN KEY ("followingId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD CONSTRAINT "FK_52d7bc99aa34bb2f7a9facb6a67" FOREIGN KEY ("interactionId") REFERENCES "userInteraction"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD CONSTRAINT "FK_e1ab31ec1750a22a2bf403c52ec" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow requset" ADD CONSTRAINT "FK_68c61ba1dea94c21a5ea73da3f6" FOREIGN KEY ("user1Id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts_tags_tags" ADD CONSTRAINT "FK_cf364c7e6905b285c4b55a00343" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_tags_tags" ADD CONSTRAINT "FK_ce163a967812183a51b044f7404" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
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
        await queryRunner.query(`ALTER TABLE "posts_tags_tags" DROP CONSTRAINT "FK_ce163a967812183a51b044f7404"`);
        await queryRunner.query(`ALTER TABLE "posts_tags_tags" DROP CONSTRAINT "FK_cf364c7e6905b285c4b55a00343"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP CONSTRAINT "FK_68c61ba1dea94c21a5ea73da3f6"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP CONSTRAINT "FK_e1ab31ec1750a22a2bf403c52ec"`);
        await queryRunner.query(`ALTER TABLE "follow requset" DROP CONSTRAINT "FK_52d7bc99aa34bb2f7a9facb6a67"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_e9f68503556c5d72a161ce38513"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_550dce89df9570f251b6af2665a"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_26d54baee41e71d60ae6823cc08"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_39f27d863ac9b111aa5d1df9c9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d31748d6958a90187c7c5e64c2"`);
        await queryRunner.query(`DROP TABLE "user_interaction_user_id2_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_07c7b884eebc597cec830e822b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cfbe1c590c304b03257eebcad7"`);
        await queryRunner.query(`DROP TABLE "user_interaction_user_id1_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ce163a967812183a51b044f740"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cf364c7e6905b285c4b55a0034"`);
        await queryRunner.query(`DROP TABLE "posts_tags_tags"`);
        await queryRunner.query(`DROP TABLE "follow requset"`);
        await queryRunner.query(`DROP TABLE "follow"`);
        await queryRunner.query(`DROP TABLE "userInteraction"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
