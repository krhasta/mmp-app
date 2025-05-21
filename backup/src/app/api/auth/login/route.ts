import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/server'; // 서버 전용 클라이언트 (쿠키 기반)

export async function GET() {
  // 1) 서버에서 OAuth URL 생성
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
    },
  });

  // 2) 에러 처리
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 3) 성공 시, data.url로 리다이렉트
  return NextResponse.redirect(data.url);
}
