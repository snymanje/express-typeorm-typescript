import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Length, IsNotEmpty, IsEmail } from 'class-validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import UserToClientDto from '../dtos/userToClient';

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user must to be unique.
 *        example:
 *           name: Alexander
 *           email: fake@email.com
 */
@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'local', nullable: true })
  authMethod: string;

  @Column({ default: false })
  active: boolean;

  @Column({ default: 'user' })
  @IsNotEmpty()
  role: string;

  @Column()
  @Length(4, 20, {
    message: 'Length must be between 4 and 20 characters, please.'
  })
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  passwordConfirm: string;

  @Column({ nullable: false })
  @IsEmail(
    {},
    {
      message: 'Please provide a valid email address.'
    }
  )
  email: string;

  @Column({ nullable: true })
  googleId: string;

  @Column({ nullable: true, select: false })
  accountActivationToken: string;

  @Column({ nullable: true, select: false })
  accountActivationExpires: Date;

  @Column({ nullable: false })
  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: false })
  @UpdateDateColumn()
  updatedAt: Date;

  async hashLocalPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined; // We don't want to persist the confirm pass to DB - only used for validation
  }

  async checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): Promise<boolean> {
    return bcrypt.compare(unencryptedPassword, this.password);
  }

  async createAccountActivationToken(): Promise<string> {
    const activationToken = await crypto.randomBytes(32).toString('hex');
    this.accountActivationToken = crypto.createHash('sha256').update(activationToken).digest('hex');
    this.accountActivationExpires = new Date(Date.now() + 10 * 60 * 1000);
    return activationToken;
  }

  async isVerified(): Promise<boolean> {
    return this.active;
  }

  async toClientUserData(): Promise<UserToClientDto> {
    return {
      id: this.id,
      authMethod: this.authMethod,
      role: this.role,
      name: this.name,
      email: this.email
    };
  }
}
