/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({unique:true})
  email: string;
  @Column({ nullable: false })
  password: string;
  @Column({ nullable: false })
  role: string;
}
