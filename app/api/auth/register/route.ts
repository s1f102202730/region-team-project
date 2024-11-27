import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { username, password, role, prefecture } = await request.json(); 
  console.log({ username, password, role, prefecture });

  // パスワードのハッシュ化
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // ユーザーの作成
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role,
        prefecture
      },
    });
    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error); // エラーの詳細をログに出力
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
