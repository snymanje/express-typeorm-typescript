import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { User } from '../entity/User';

export class CreateAdminUser1599881896528 implements MigrationInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = new User();
    user.username = 'admin';
    user.password = 'admin';
    user.email = 'admin@admin.com';
    user.hashPassword();
    user.role = 'ADMIN';
    const userRepository = getRepository(User);
    await userRepository.save(user);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
