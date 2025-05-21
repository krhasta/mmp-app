// lib/data-source.ts
import { DataSource } from 'typeorm';
import { User } from '@/entity/user'; // 예시 엔티티
import { Product } from '@/entity/product';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Product],
});
