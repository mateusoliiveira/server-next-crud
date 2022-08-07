import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1657252921571 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'admin',
          type: 'int',
          default: 0
        },
        {
          name: 'email',
          type: 'varchar(100)',
          isUnique: true
        },
        {
          name: 'name',
          type: 'varchar(100)',
        },
        {
          name: 'password',
          type: 'varchar(200)',
        },
        {
          name: 'avatar',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'created_at',
          type: 'timestamp with time zone',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp with time zone',
          default: 'now()',
        },
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
