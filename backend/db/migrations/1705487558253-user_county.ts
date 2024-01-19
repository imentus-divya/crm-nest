import { MigrationInterface, QueryRunner } from "typeorm";

export class UserCounty1705487558253 implements MigrationInterface {
    name = 'UserCounty1705487558253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_county" DROP CONSTRAINT "FK_a36f7245ea4eb97a4ce3a3774e2"`);
        await queryRunner.query(`ALTER TABLE "user_county" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "user_county" ADD CONSTRAINT "FK_c59cb2243d56c903f9f9bebba4f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_county" DROP CONSTRAINT "FK_c59cb2243d56c903f9f9bebba4f"`);
        await queryRunner.query(`ALTER TABLE "user_county" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "user_county" ADD CONSTRAINT "FK_a36f7245ea4eb97a4ce3a3774e2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
