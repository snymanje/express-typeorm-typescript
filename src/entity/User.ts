import { IUser } from './../interfaces/user.interfaces';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import { Length, IsNotEmpty, IsEmail } from 'class-validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

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

  @Column({ nullable: true })
  accountActivationToken: string;

  @Column({ nullable: true })
  accountActivationExpires: Date;

  @Column({ nullable: true })
  passwordResetToken: string;

  @Column({ nullable: true })
  passwordResetExpires: Date;

  @Column({ nullable: false })
  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  passwordChangedAt: Date;

  @Column({ nullable: false })
  @UpdateDateColumn()
  updatedAt: Date;

  /*   async hashLocalPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined; // We don't want to persist the confirm pass to DB - only used for validation
  } */

  @BeforeInsert()
  @BeforeUpdate()
  async hashLocalPasswordBeforeInsert(): Promise<void> {
    //if (this.password && this.passwordConfirm) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    //}
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

  async changedPasswordAfter(JWTTimestamp: number): Promise<boolean> {
    if (this.passwordChangedAt) {
      const changedTimestamp = Number((this.passwordChangedAt.getTime() / 1000, 10));
      return JWTTimestamp < changedTimestamp;
    }
  }

  async isVerified(): Promise<boolean> {
    return this.active;
  }

  async createPasswordResettoken(): Promise<string> {
    const resetToken = await crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = await crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

    return resetToken;
  }

  async toClientUserData(): Promise<IUser> {
    return {
      id: this.id,
      authMethod: this.authMethod,
      role: this.role,
      name: this.name,
      email: this.email
    };
  }
}
