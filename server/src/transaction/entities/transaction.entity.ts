/* eslint-disable prettier/prettier */
import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
/* eslint-disable prettier/prettier */
@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Product)
    @JoinColumn()
    productId: Product;
    @Column()
    quantity: number;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;
  }

