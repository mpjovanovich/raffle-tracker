import { setAccessTokenCookie } from '@/utils/cookieUtility';
import { LoginResponse } from '@raffle-tracker/dto';
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
    await setAccessTokenCookie(loginResponse.accessToken);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
