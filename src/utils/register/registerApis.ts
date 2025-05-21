import { NextResponse } from 'next/server';

// Digi-Key OAuth 토큰만 발급받는 함수
async function getDigikeyOAuthToken(): Promise<string | null> {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    // Cookie는 서버 간 직접 호출 시 일반적으로 필요하지 않을 수 있으며, 보안상 권장되지 않습니다.
    // myHeaders.append("Cookie", "TS012a951d=01c72bed21b54ced055c042b3a0dd9439002d372a74c6827701576ae99664cefc0e84aee69133756c7ed2b5c5dff293562025920e3");

    const urlencoded = new URLSearchParams();
    urlencoded.append('client_id', 'UBlIGg2Zs8Py0VMfZKKyXunn0wf8iTTM');
    urlencoded.append('client_secret', 'FlGGGw9UrRiT3rQ9');
    urlencoded.append('grant_type', 'client_credentials');

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    const response = await fetch('https://api.digikey.com/v1/oauth2/token', requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OAuth 토큰 발급 실패: ${response.status}`, errorText);
      return null;
    }

    const tokenData = await response.json();

    if (tokenData.access_token) {
      console.log('OAuth 토큰 발급 성공!', tokenData.access_token);
      return tokenData.access_token;
    } else {
      console.error('OAuth 응답에 액세스 토큰이 없습니다:', tokenData);
      return null;
    }
  } catch (error) {
    console.error('OAuth 토큰 발급 중 오류 발생:', error);
    return null;
  }
}

export async function GET(request: Request) {
  try {
    // URL에서 부품 번호 파라미터 가져오기
    const { searchParams } = new URL(request.url);
    const partNumber = searchParams.get('partNumber') || 'RK73H1JTTD1002F';

    // OAuth 토큰 발급
    const token = await getDigikeyOAuthToken();
    if (!token) {
      return NextResponse.json({ error: 'OAuth 토큰 발급에 실패했습니다' }, { status: 500 });
    }

    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('X-DIGIKEY-Client-Id', 'UBlIGg2Zs8Py0VMfZKKyXunn0wf8iTTM');
    myHeaders.append('X-DIGIKEY-Local-Language', 'ko');
    myHeaders.append('X-DIGIKEY-Locale-Currency', 'KRW'); // 오타 수정
    myHeaders.append('X-DIGIKEY-Locale-Site', 'KR');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    // 서버 측에서 API 호출
    const response = await fetch(
      `https://api.digikey.com/products/v4/search/${encodeURIComponent(partNumber)}/productdetails`,
      requestOptions
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`제품 정보 조회 실패! ${errorText}`);
      return NextResponse.json({ error: `API 호출 실패: ${response.status}` }, { status: response.status });
    }

    const productData = await response.json();
    return NextResponse.json(productData);
  } catch (error) {
    console.error('API 처리 중 오류 발생:', error);
    return NextResponse.json({ error: '내부 서버 오류' }, { status: 500 });
  }
}

// Digikey Product Details API 수행
// export default async function getProductDetails(): Promise<string | null> {
//   try {
//     const myHeaders = new Headers();

//     const OAuthToken = await getDigikeyOAuthToken();

//     console.log('발급받은 OAuthToken: ', OAuthToken);

//     myHeaders.append('accept', 'application/json');
//     myHeaders.append('Authorization', `Bearer ${OAuthToken}`);
//     // myHeaders.append('Authorization', 'Bearer HqyrMun6tCxVkNDwhmPrVJV2uBik');
//     myHeaders.append('X-DIGIKEY-Client-Id', 'UBlIGg2Zs8Py0VMfZKKyXunn0wf8iTTM');
//     myHeaders.append('X-DIGIKEY-Local-Language', 'ko');
//     myHeaders.append('X-DIGIKEY-Locale-Currenty', 'KRW');
//     myHeaders.append('X-DIGIKEY-Locale-Site', 'KR');

//     const requestOptions: RequestInit = {
//       method: 'GET',
//       headers: myHeaders,
//       redirect: 'follow',
//     };

//     const response = await fetch(
//       'https://api.digikey.com/products/v4/search/RK73H1JTTD1002F/productdetails',
//       requestOptions
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error(`제품 정보 조회 실패! ${errorText}`);
//       return null;
//     }

//     const productData = await response.json();
//     console.log('제품 정보 조회 성공!', productData);

//     return JSON.stringify(productData);
//   } catch (error) {
//     console.error('productDetails API 실행 중 오류 발생:', error);
//     return null;
//   }
// }
