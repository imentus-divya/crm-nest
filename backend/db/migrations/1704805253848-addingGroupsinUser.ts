import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingGroupsinUser1704805253848 implements MigrationInterface {
    name = 'AddingGroupsinUser1704805253848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "group" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_364032a4a5fc69fb77d7b94cfc3" FOREIGN KEY ("group") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_364032a4a5fc69fb77d7b94cfc3"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "group"`);
    }

}
