import Link from 'next/link';
import React from 'react';
import { signOut } from '@/utils/supabase/actions';

interface userInfoProps {
  userInfo: {
    name?: string;
    picture?: string;
  };
}

export default function Sidebar({ userInfo }: userInfoProps) {
  return (
    <div className="h-screen w-[300px] bg-[#171717] text-white shadow-md py-[22px] px-[18px]">
      <ul className="space-y-4">
        <li className="text-lg font-medium">
          <div className="flex items-center justify-between">
            <img className="cursor-pointer" src="/imgs/btn-sidebar.svg" alt="Sidebar Toggle" title="사이드바 여닫기" />
            <img
              className="cursor-pointer"
              src="/imgs/btn-signout.svg"
              alt="Signout"
              onClick={signOut}
              title="로그아웃"
            />
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <img src={`${userInfo.picture}`} alt="google profile pic" className="w-10 h-10 rounded-full mr-2" />
            <span>{userInfo.name || 'USERNAME'}님</span>
          </div>
        </li>
        <li className="text-lg font-medium">
          <Link href="/" className="flex space-x-2">
            <img src="/imgs/icon-home.svg" alt="" />
            <span>메인 화면</span>
          </Link>
        </li>
        <li className="text-lg font-medium">
          <Link href="/register" className="flex space-x-2">
            <img src="/imgs/icon-register.svg" alt="" />
            <span>제품 등록</span>
          </Link>
        </li>
        <li className="text-lg font-medium">
          <Link href="/contact" className="flex space-x-2">
            <img src="/imgs/icon-setting.svg" alt="" />
            <span>환경 설정</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
