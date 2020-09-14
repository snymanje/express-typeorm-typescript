import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Length, IsNotEmpty, IsEmail } from 'class-validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Length(4, 20, {
    message: 'Length must be between 4 and 20 characters, please.'
  })
  username: string;

  @Column({ nullable: false })
  @Length(6, 100, {
    message: 'Password must have a minimum of 6 character, please.'
  })
  password: string;

  @Column({ nullable: false })
  @IsEmail(
    {},
    {
      message: 'Please provide a validate email address.'
    }
  )
  email: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  role: string;

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

  createAccountActivationToken = function (): string {
    const activationToken = crypto.randomBytes(32).toString('hex');
    //this.accountActivationToken = crypto.createHash('sha256').update(activationToken).digest('hex');

    //this.accountActivationExpires = Date.now() + 10 * 60 * 1000;

    return activationToken;
  };
}
