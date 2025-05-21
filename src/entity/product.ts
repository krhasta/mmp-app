// entity/Product.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  // Description은 객체 형태이므로 JSON으로 저장
  @Column({ type: 'json', nullable: true })
  description: string;

  @Column({ type: 'json', nullable: true })
  manufacturer: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  manufacturerProductNumber: string;

  @Column('decimal', { precision: 10, scale: 4, nullable: true })
  unitPrice: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  datasheetUrl: string;

  @Column({ type: 'int', nullable: true })
  quantityAvailable: number;

  @Column({ type: 'json', nullable: true })
  productStatus: string;

  @Column({ type: 'json', nullable: true })
  discontinued: boolean;

  @Column({ type: 'boolean', nullable: true })
  endOfLife: boolean;

  // 배열 형태의 파라미터들
  @Column({ type: 'json', nullable: true })
  parameters: string[];

  @Column({ type: 'json', nullable: true })
  category: string;

  @Column({ type: 'json', nullable: true })
  series: string;

  @Column({ type: 'json', nullable: true })
  classifications: string;
}
