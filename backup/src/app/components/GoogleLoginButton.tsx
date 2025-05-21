// 'use client'

// import { supabase } from "../utils/supabase/client"

// const GoogleLoginButton = () => {
//   const handleLogin = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: 'google',
//       options: {
//         redirectTo: `http://localhost:3000/auth/callback`,
//         queryParams: {
//           access_type: 'offline', // refresh_token을 받기 위해 필요
//           prompt: 'consent',      // 매번 사용자 동의를 요청
//         },
//       },
//     });

//     if (error) {
//       console.error('OAuth Error: ', error.message);
//     }
//   }

//   return (
//     <button onClick={handleLogin}
//       className="gsi-material-button m-auto"
//       style={{ width: '300px', height: '50px', fontSize: '20px', fontFamily: 'Roboto' }}
//     >
//       <div className="gsi-material-button-state"></div>
//       <div className="gsi-material-button-content-wrapper">
//         <div className="gsi-material-button-icon">
//           <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
//             <path
//               fill="#EA4335"
//               d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
//             ></path>
//             <path
//               fill="#4285F4"
//               d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
//             ></path>
//             <path
//               fill="#FBBC05"
//               d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
//             ></path>
//             <path
//               fill="#34A853"
//               d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
//             ></path>
//             <path fill="none" d="M0 0h48v48H0z"></path>
//           </svg>
//         </div>
//         <span className="gsi-material-button-contents">Continue with Google</span>
//         <span style={{ display: 'none' }}>Continue with Google</span>
//       </div>
//     </button>
//   )
// }

// export default GoogleLoginButton;

// GoogleLoginButton.tsx
'use client'

// Import the specific client creator function
// import { createClient } from "../utils/supabase/client";
import { supabase } from "../utils/supabase/client";

const GoogleLoginButton = () => {
  const handleLogin = async () => {
    // Get origin dynamically *on the client*
    const origin = window.location.origin;
    const redirectURL = `${origin}/auth/callback`; // Construct the callback URL dynamically

    // const supabase = createClient(); // Create a client instance

    console.log('Initiating OAuth with redirect to:', redirectURL); // Add log

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Use the dynamic URL
        redirectTo: redirectURL,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      console.error('OAuth Error initiating login:', error.message);
    }
  }

  // ... rest of your button JSX
  return (
    <button onClick={handleLogin}
      className="gsi-material-button m-auto"
      style={{ width: '300px', height: '50px', fontSize: '20px', fontFamily: 'Roboto' }}
    >
      {/* ... button content ... */}
      <span className="gsi-material-button-contents">Continue with Google</span>
    </button>
  )
}

export default GoogleLoginButton;