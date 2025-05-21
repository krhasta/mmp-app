// app/login/page.tsx;

'use client';
import BtnSignin from '@/component/BtnSignin';

export default function Login() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-[1000px] h-[650px] shadow-lg flex items-center justify-center rounded-[30px] bg-[#303030] py-[60px] px-[60px]">
        <div className="border w-full flex justify-center items-center h-full">
          <div className="border w-1/2 h-full flex flex-col">
            <div className="font-bold text-[40px]">MMP</div>
            <div className="font-bold text-[30px]">전자 부품 관리의 색다른 시작</div>
            <div className="font-bold text-[25px]">등록과 주문을 간편하게!</div>
            <br />
            <div className="text-[20px]">
              MMP(Monkey Management Program)는 Digikey, Mouser 등에서 주문한 전자 부품을 데이터베이스에 등록하고,
              부품함으로 옮겨 편리하게 주문할 수 있게 도와주는 관리 프로그램입니다. 또한 등록된 제품의 자세한 설명을
              열람할 수 있어 재고 파악부터 주문까지 한 번에 해결할 수 있습니다.
            </div>
            <BtnSignin />
            <div className="text-[#b4b4b4] text-[12px]">
              MMP 서비스는 대진대학교 이메일로만 로그인할 수 있습니다.
              <br />
              자세한 사항은 관리자에게 문의하세요. <br />
              E-Mail: 명훈@daejin.ac.kr
            </div>
          </div>
          <div className="border w-1/2 h-full flex items-center">fdsf</div>
        </div>
      </div>
    </div>
  );
}
