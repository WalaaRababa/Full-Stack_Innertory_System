/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({nullable:false})
  title: string;
  @Column()
  description: string;
  @Column({nullable:false,type: 'decimal', precision: 10, scale: 2  })
  price: number;
  @Column('int')
  stockQuantity: number;
}
