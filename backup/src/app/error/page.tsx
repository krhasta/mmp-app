'use client';
import { useRouter } from 'next/navigation';



export default function ErrorPage() {
  const HandleGotoLogin = () => {
    const router = useRouter();
    router.push('/');
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Something went wrong</h1>
      <p>We couldn't find the page you were looking for.</p>
      <button
        onClick={HandleGotoLogin}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Go Back
      </button>
    </div>
  );
}
