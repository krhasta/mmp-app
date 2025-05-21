// import { createClient } from '../utils/supabase/server';

import GoogleLoginButton from '../components/GoogleLoginButton'

export default async function Home() {

  return (
    <div className="w-[1000px] h-[650px] shadow-lg flex items-center justify-center rounded-[30px] bg-[#303030] py-[120px] px-[60px]">
      <div className="border w-full flex justify-center items-center h-full">
        <div className="border w-1/2 h-full flex flex-col  ">
          <div className="font-bold text-[40px]">MMP</div>
          <div className="font-bold text-[30px]">전자 부품 관리의 색다른 시작</div>
          <div className="font-bold text-[25px]">등록과 주문을 간편하게!</div>
          <br />
          <div className="text-[20px]">
            MMP(Monkey Management Program)는 Digikey, Mouser 등에서 주문한 전자 부품을 데이터베이스에 등록하고,
            부품함으로 옮겨 편리하게 주문할 수 있게 도와주는 관리 프로그램입니다. 또한 등록된 제품의 자세한 설명을
            열람할 수 있어 재고 파악부터 주문까지 한 번에 해결할 수 있습니다.
          </div>


          {/* <button 
            className="gsi-material-button m-auto"
            style={{ width: '300px', height: '50px', fontSize: '20px', fontFamily: 'Roboto' }}
          >
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
              <div className="gsi-material-button-icon">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  ></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              </div>
              <span className="gsi-material-button-contents">Continue with Google</span>
              <span style={{ display: 'none' }}>Continue with Google</span>
            </div>
          </button> */}
          <GoogleLoginButton></GoogleLoginButton>
        </div>
        <div className="border w-1/2 h-full flex items-center">fdsf</div>
      </div>
    </div>

  );
}

// import { createClient } from '../utils/supabase/server';

// export default async function Instruments() {
//   const supabase = await createClient();
//   const { data: instruments } = await supabase.from('instruments').select();
//   return <pre>{JSON.stringify(instruments, null, 2)}</pre>;
// }
