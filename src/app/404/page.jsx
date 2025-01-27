// app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for doesn’t exist.</p>
      <Link href="/">Go back to Home</Link>
    </div>
  );
}
