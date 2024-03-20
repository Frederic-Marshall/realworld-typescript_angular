import {MigrationInterface, QueryRunner} from "typeorm";

export class SeedDB1701766114436 implements MigrationInterface {
    name = 'SeedDB1701766114436'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('makers')`);


			await queryRunner.query(`INSERT INTO users (username, email, password) VALUES ('foo', 'foo@gmail.com', '$2b$10$8hgE3iB01BAJvmuxMGREj.ihNVxt1jwumabY8vBPTYwgUPlZOzdcu')`);

      await queryRunner.query(`INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('Egor', 'Egor', 'Egor', 'Egor', 'coffee,dragons', 1)`);

      await queryRunner.query(`INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('Paleev', 'Paleev', 'Paleev', 'Paleev', 'coffee,dragons', 1)`);
    }

    public async down(): Promise<void> {}

}
