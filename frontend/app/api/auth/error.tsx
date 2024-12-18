// app/auth/error.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ErrorPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Assuming NextAuth passes an error message in the URL or state
    const error = router.query.error as string;
    if (error) {
      setErrorMessage(error);
      console.error('Authentication Error:', error); // Log error to the console
    }
  }, [router.query]);

  return (
    <div>
      <h1>Authentication Error</h1>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <p>There was an issue with the authentication process. Please try again.</p>
      )}
      <button onClick={() => router.push('/')}>Go back to home</button>
    </div>
  );
};

export default ErrorPage;
