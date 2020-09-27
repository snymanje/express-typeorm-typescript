import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { User } from '../entity/User';

export class CreateAdminUser21600180030074 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = new User();
    user.name = 'admin2';
    user.password = 'admin2';
    user.email = 'admin2@admin.com';
    user.role = 'admin';
    user.active = true;
    /*  user.hashLocalPassword(); */
    const userRepository = getRepository(User);
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
