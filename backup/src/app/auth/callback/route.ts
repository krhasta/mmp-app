import { NextResponse } from 'next/server';
// The client you created from the Server-Side Auth instructions
import { createClient } from '../../utils/supabase/server';

export async function GET(request: Request) {
  // const { searchParams, origin } = new URL(request.url);
  // const code = searchParams.get('code');
  // // if "next" is in param, use it as the redirect URL
  // const next = searchParams.get('next') ?? '/';

  // console.log(`code: ${code}`);
  // console.log(`next: ${next}`);
  // console.log(request);

  const { searchParams, origin } = new URL(request.url);
  // console.log(`searchParams: ${searchParams}`);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';
  console.log(`Callback received. Code: ${code}, Next: ${next}, Origin: ${origin}`); // Log essential info

  // console.log('Code:', code); // 인증 코드 출력
  // console.log('Next:', next); // 리디렉션 경로 출력

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development';
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`http://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }

    console.log('ERROR', error);
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/error`);
}

// // route.ts
// import { NextResponse } from 'next/server';
// import { supabase } from '@/app/utils/supabase/client';

// export async function GET(request: Request) {
//   const { searchParams, origin } = new URL(request.url);
//   const code = searchParams.get('code');
//   const next = searchParams.get('next') ?? '/';

//   // Construct the redirect URL *always* using origin first
//   // It will be updated later if forwardedHost exists and isn't local dev
//   const redirectUrl = new URL(next, origin);

//   console.log(`Callback received. Code: ${code}, Next: ${next}, Origin: ${origin}`); // Log essential info

//   if (code) {
//     // const supabase = createClient(); // Create server client implicitly handles cookies
//     const { error } = await supabase.auth.exchangeCodeForSession(code);

//     if (!error) {
//       console.log('Code exchange successful. Redirecting to:', redirectUrl.toString());

//       const forwardedHost = request.headers.get('x-forwarded-host');
//       const isLocalEnv = process.env.NODE_ENV === 'development';

//       // Prefer forwardedHost if it exists and we're not in local dev
//       if (!isLocalEnv && forwardedHost) {
//         // Ensure protocol is included (usually http or https)
//         // You might need to check 'x-forwarded-proto' too if behind a TLS-terminating proxy
//         const proto = request.headers.get('x-forwarded-proto') ?? 'http';
//         redirectUrl.protocol = proto; // Update protocol
//         redirectUrl.host = forwardedHost; // Update host based on proxy header
//         console.log('Using forwarded host. Redirecting to:', redirectUrl.toString());
//         return NextResponse.redirect(redirectUrl);
//       }

//       // Otherwise, use the original URL derived from request.url
//       return NextResponse.redirect(redirectUrl);
//     }

//     console.error('Error exchanging code for session:', error.message); // Log the specific error
//   } else {
//     console.error('No code found in query parameters.');
//   }

//   // Redirect to error page if code is missing or exchange failed
//   const errorUrl = new URL('/error', origin); // Use origin for error page too
//   console.log('Redirecting to error page:', errorUrl.toString());
//   return NextResponse.redirect(errorUrl);
// }
