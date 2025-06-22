import { LoginResponse } from '@raffle-tracker/dto';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Call external API
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { error: errorData.message || 'Failed to login' },
        { status: res.status }
      );
    }

    const data = await res.json();
    const loginResponse = data.data as LoginResponse;

    // Store access token in HTTP-only cookie (short-lived)
    const cookieStore = await cookies();
    cookieStore.set('accessToken', loginResponse.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60, // 15 minutes (matches your JWT config)
    });

    // Store refresh token in HTTP-only cookie
    cookieStore.set('refreshToken', loginResponse.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 1 day
    });

    // Store user info in HTTP-only cookie (for role-based access control)
    cookieStore.set('user', JSON.stringify(loginResponse.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 1 day
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
