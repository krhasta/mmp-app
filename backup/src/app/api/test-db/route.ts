// app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import { AppDataSource } from '@/app/data-source';
import { User } from '@/entity/user';

export async function GET() {
  if (!AppDataSource.isInitialized) await AppDataSource.initialize();

  const users = await AppDataSource.manager.find(User);

  return NextResponse.json(users);
}
