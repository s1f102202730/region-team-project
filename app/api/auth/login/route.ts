import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// PrismaClient インスタンスをグローバルで共有
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export async function POST(request: Request) {
  const { username, password, prefecture } = await request.json();

  try {
    const user = await prisma.user.findFirst({
      where: { username },
    });

    if (!user){
      return NextResponse.json(
        { error: 'User not found or invalid credentials'},
        { status: 401}
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    if (user.prefecture !== prefecture) {
      return NextResponse.json(
        { error: 'Prefecture does not match the registered user' },
        { status: 401 }
      );
    }

    return NextResponse.json({ message: 'Login successful', role: user.role, prefecture: user.prefecture, });
  } catch (error) {
    console.error('Login error:', error); // エラーログを出力
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
