import {MigrationInterface, QueryRunner} from "typeorm";

export class InitMigration1641778025650 implements MigrationInterface {
    name = 'InitMigration1641778025650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "deck" ("id" varchar PRIMARY KEY NOT NULL, "type" varchar NOT NULL, "shuffled" boolean NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "card" ("id" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "suit" varchar NOT NULL, "value" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "deck_cards_card" ("deckId" varchar NOT NULL, "cardId" varchar NOT NULL, PRIMARY KEY ("deckId", "cardId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0722f3114d3f770b07646af8ab" ON "deck_cards_card" ("deckId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bd453408658286bec79a79c2af" ON "deck_cards_card" ("cardId") `);
        await queryRunner.query(`DROP INDEX "IDX_0722f3114d3f770b07646af8ab"`);
        await queryRunner.query(`DROP INDEX "IDX_bd453408658286bec79a79c2af"`);
        await queryRunner.query(`CREATE TABLE "temporary_deck_cards_card" ("deckId" varchar NOT NULL, "cardId" varchar NOT NULL, CONSTRAINT "FK_0722f3114d3f770b07646af8abc" FOREIGN KEY ("deckId") REFERENCES "deck" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_bd453408658286bec79a79c2af1" FOREIGN KEY ("cardId") REFERENCES "card" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("deckId", "cardId"))`);
        await queryRunner.query(`INSERT INTO "temporary_deck_cards_card"("deckId", "cardId") SELECT "deckId", "cardId" FROM "deck_cards_card"`);
        await queryRunner.query(`DROP TABLE "deck_cards_card"`);
        await queryRunner.query(`ALTER TABLE "temporary_deck_cards_card" RENAME TO "deck_cards_card"`);
        await queryRunner.query(`CREATE INDEX "IDX_0722f3114d3f770b07646af8ab" ON "deck_cards_card" ("deckId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bd453408658286bec79a79c2af" ON "deck_cards_card" ("cardId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_bd453408658286bec79a79c2af"`);
        await queryRunner.query(`DROP INDEX "IDX_0722f3114d3f770b07646af8ab"`);
        await queryRunner.query(`ALTER TABLE "deck_cards_card" RENAME TO "temporary_deck_cards_card"`);
        await queryRunner.query(`CREATE TABLE "deck_cards_card" ("deckId" varchar NOT NULL, "cardId" varchar NOT NULL, PRIMARY KEY ("deckId", "cardId"))`);
        await queryRunner.query(`INSERT INTO "deck_cards_card"("deckId", "cardId") SELECT "deckId", "cardId" FROM "temporary_deck_cards_card"`);
        await queryRunner.query(`DROP TABLE "temporary_deck_cards_card"`);
        await queryRunner.query(`CREATE INDEX "IDX_bd453408658286bec79a79c2af" ON "deck_cards_card" ("cardId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0722f3114d3f770b07646af8ab" ON "deck_cards_card" ("deckId") `);
        await queryRunner.query(`DROP INDEX "IDX_bd453408658286bec79a79c2af"`);
        await queryRunner.query(`DROP INDEX "IDX_0722f3114d3f770b07646af8ab"`);
        await queryRunner.query(`DROP TABLE "deck_cards_card"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP TABLE "deck"`);
    }

}
