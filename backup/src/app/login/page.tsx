'use client'

import { supabase } from "../utils/supabase/client";

export default function GoogleLoginButton() {
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