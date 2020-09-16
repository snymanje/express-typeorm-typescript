import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Length, IsNotEmpty, IsEmail } from 'class-validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import UserToClientDto from '../dtos/userToClient';

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
  @Length(8, 100, {
    message: 'Password must have a minimum of 8 character, please.'
  })
  password: string;

  @Column({ nullable: true })
  @Length(8, 100, {
    message: 'Password must have a minimum of 8 character, please.'
  })
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

  hashPassword(): void {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

  createAccountActivationToken(): string {
    const activationToken = crypto.randomBytes(32).toString('hex');
    this.accountActivationToken = crypto.createHash('sha256').update(activationToken).digest('hex');
    this.accountActivationExpires = new Date(Date.now() + 10 * 60 * 1000);
    return activationToken;
  }

  toClient(): UserToClientDto {
    return {
      id: this.id,
      authMethod: this.authMethod,
      role: this.role,
      name: this.name,
      email: this.email
    };
  }
}
