import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// PrismaClient インスタンスをグローバルで共有
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export async function POST(request: Request) {
  const { username, password } = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login successful', role: user.role });
  } catch (error) {
    console.error('Login error:', error); // エラーログを出力
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
