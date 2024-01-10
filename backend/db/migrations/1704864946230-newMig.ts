import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMig1704864946230 implements MigrationInterface {
    name = 'NewMig1704864946230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "screen_url" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "url_type" character varying NOT NULL, "url_description" character varying NOT NULL, "screen_id" integer, CONSTRAINT "PK_7510b6e612c541d608dd6f4c14d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "screens" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_15b65ed44367c5411efccdd7de1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_screen" ("id" SERIAL NOT NULL, "role_id" integer, "screen_id" integer, CONSTRAINT "PK_68e6526fb97b489a2ecd7514ee8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT NOW(), "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lov_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_bc990f1b2db0fd579ecbf1738b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lov" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type_id" integer, CONSTRAINT "UQ_5846f176877ef7964522de6cd94" UNIQUE ("name"), CONSTRAINT "PK_ac8566a3a7af55196019ec4523d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "groups" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "username" character varying(50) NOT NULL, "refresh_token" character varying, "expiry_token" TIMESTAMP, "tenant_id" integer NOT NULL, "company_id" integer NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT NOW(), "active" boolean NOT NULL DEFAULT true, "role_id" integer, "country_code" integer, "group" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "upload_meta_data" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT NOW(), "filename" character varying NOT NULL, "record_count" integer NOT NULL, "view_data" character varying NOT NULL, "upload_type" character varying, "county" character varying, CONSTRAINT "PK_ad5d797194f56b1c8d99f69e31e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_fileType" ("id" SERIAL NOT NULL, "user_id" integer, "file_type" integer, CONSTRAINT "PK_de88c86aff01383fe4200808691" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "foreclosure" ("auction_date" TIMESTAMP WITH TIME ZONE NOT NULL, "case_number" character varying(100) NOT NULL, "address" text NOT NULL, "defendants" text array NOT NULL, "plaintiffs" text array NOT NULL, "judgement" money NOT NULL, "zillow" money NOT NULL, "redfin" money NOT NULL, "reporting_date" character varying(20) NOT NULL, "status" character varying(50) NOT NULL, "internal_case_id" character varying(50) NOT NULL, "user_comments" text array NOT NULL, "county_name" text NOT NULL, CONSTRAINT "PK_8ab2783c4654b8ed9a863197603" PRIMARY KEY ("case_number", "internal_case_id"))`);
        await queryRunner.query(`CREATE TABLE "user_county" ("id" SERIAL NOT NULL, "user_id" integer, "county" integer, CONSTRAINT "PK_65dcbf685f59bd5fb8595fcbc9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lpcases" ("id" SERIAL NOT NULL, "casefile_date" TIMESTAMP WITH TIME ZONE NOT NULL, "case_type" character varying(100) NOT NULL, "case_number" character varying(100) NOT NULL, "address" text NOT NULL, "defendants" text array NOT NULL, "plaintiffs" text array NOT NULL, "estimated_claim" money NOT NULL, "zillow" money NOT NULL, "redfin" money NOT NULL, "repoting_date" TIMESTAMP WITH TIME ZONE NOT NULL, "case_status" character varying(50) NOT NULL, "county_name" text NOT NULL, CONSTRAINT "PK_539e47277d0792654a7b1f140c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "screen_url" ADD CONSTRAINT "FK_44d741274ac8860f1955d4d8285" FOREIGN KEY ("screen_id") REFERENCES "screens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_screen" ADD CONSTRAINT "FK_299ad30564c8266309fbebd05ab" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_screen" ADD CONSTRAINT "FK_7313f91bf6d625f7e989d7cfc5a" FOREIGN KEY ("screen_id") REFERENCES "screens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lov" ADD CONSTRAINT "FK_bc990f1b2db0fd579ecbf1738b2" FOREIGN KEY ("type_id") REFERENCES "lov_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_830cf13458b1afa48e36dd76e43" FOREIGN KEY ("country_code") REFERENCES "lov"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_364032a4a5fc69fb77d7b94cfc3" FOREIGN KEY ("group") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "upload_meta_data" ADD CONSTRAINT "FK_a0c818a11dcf984d4fa4abe12f3" FOREIGN KEY ("upload_type") REFERENCES "lov"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "upload_meta_data" ADD CONSTRAINT "FK_78e1e10d879811b6b1ba3c2a1f6" FOREIGN KEY ("county") REFERENCES "lov"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_fileType" ADD CONSTRAINT "FK_271e0c99de8784924b1870ab020" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_fileType" ADD CONSTRAINT "FK_a48bec7acd3be76c62046db52b1" FOREIGN KEY ("file_type") REFERENCES "lov"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_county" ADD CONSTRAINT "FK_a36f7245ea4eb97a4ce3a3774e2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_county" ADD CONSTRAINT "FK_1e90f4370ef67794f7461fb7599" FOREIGN KEY ("county") REFERENCES "lov"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_county" DROP CONSTRAINT "FK_1e90f4370ef67794f7461fb7599"`);
        await queryRunner.query(`ALTER TABLE "user_county" DROP CONSTRAINT "FK_a36f7245ea4eb97a4ce3a3774e2"`);
        await queryRunner.query(`ALTER TABLE "user_fileType" DROP CONSTRAINT "FK_a48bec7acd3be76c62046db52b1"`);
        await queryRunner.query(`ALTER TABLE "user_fileType" DROP CONSTRAINT "FK_271e0c99de8784924b1870ab020"`);
        await queryRunner.query(`ALTER TABLE "upload_meta_data" DROP CONSTRAINT "FK_78e1e10d879811b6b1ba3c2a1f6"`);
        await queryRunner.query(`ALTER TABLE "upload_meta_data" DROP CONSTRAINT "FK_a0c818a11dcf984d4fa4abe12f3"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_364032a4a5fc69fb77d7b94cfc3"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_830cf13458b1afa48e36dd76e43"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
        await queryRunner.query(`ALTER TABLE "lov" DROP CONSTRAINT "FK_bc990f1b2db0fd579ecbf1738b2"`);
        await queryRunner.query(`ALTER TABLE "role_screen" DROP CONSTRAINT "FK_7313f91bf6d625f7e989d7cfc5a"`);
        await queryRunner.query(`ALTER TABLE "role_screen" DROP CONSTRAINT "FK_299ad30564c8266309fbebd05ab"`);
        await queryRunner.query(`ALTER TABLE "screen_url" DROP CONSTRAINT "FK_44d741274ac8860f1955d4d8285"`);
        await queryRunner.query(`DROP TABLE "lpcases"`);
        await queryRunner.query(`DROP TABLE "user_county"`);
        await queryRunner.query(`DROP TABLE "foreclosure"`);
        await queryRunner.query(`DROP TABLE "user_fileType"`);
        await queryRunner.query(`DROP TABLE "upload_meta_data"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "groups"`);
        await queryRunner.query(`DROP TABLE "lov"`);
        await queryRunner.query(`DROP TABLE "lov_type"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "role_screen"`);
        await queryRunner.query(`DROP TABLE "screens"`);
        await queryRunner.query(`DROP TABLE "screen_url"`);
    }

}
