import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { username, password, role, municipalityId } = await request.json(); // municipalityId を追加
  console.log({ username, password, role, municipalityId });

  // パスワードのハッシュ化
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // ユーザーの作成
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role,
        municipalityId, // municipalityId を保存
      },
    });
    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error); // エラーの詳細をログに出力
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
