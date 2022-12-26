import { IsEmail } from 'class-validator';
import {
  AfterInsert,
  AfterUpdate,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsEmail()
  email: string;
  @Column()
  password: string;
  @Column()
  template: string;
  @Column()
  duration: number;
  @Column()
  otpType: string;
  @Column()
  configKey: string;
  @Column()
  otpLength?: number;
}
