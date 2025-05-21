// app/(home)/page.tsx 파일
import { createClientForServer } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = await createClientForServer();
  const session = await supabase.auth.getUser();

  // 세션에 유저 정보가 없다면 바로 리다이렉트
  // session에서 유저 정보를 받아온 후 확인.
  // 이걸 먼저 해야 로그아웃 할 때 에러가 생기지 않는다.
  if (!session.data.user) {
    redirect('/login');
  }

  // 유저 정보가 존재하면 안전하게 구조분해
  const { user_metadata } = session.data.user;

  // console.log('Login userInfo');
  // console.log(user_metadata);

  const email = user_metadata.email;
  const domain = email.split('@')[1];

  // user_metadata.custom_claims.hd
  // == daejin.ac.kr

  // 대진대 이메일이 아니라면 리다이렉트
  if (domain !== 'daejin.ac.kr' || !user_metadata) {
    redirect('/login');
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="w-[1000px] text-[25px] font-bold">제품 선택</div>
        <div className="w-[1000px] h-[650px] shadow-lg flex items-center justify-center rounded-[30px] bg-[#303030] p-[12px]">
          <div className="w-[600px]"></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
