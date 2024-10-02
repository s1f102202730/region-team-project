'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const TouristLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.role === 'tourist') {
          router.push('/tourist');
        } else {
          setErrorMessage('観光客としてログインできません。');
        }
      } else {
        throw new Error('ログインに失敗しました。');
      }
    } catch (error) {
      setErrorMessage('エラーが発生しました。もう一度お試しください。');
    }
  };

  return (
    <div>
      <h1>観光客ログイン</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <input
        type="text"
        placeholder="ユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>ログイン</button>
      <p>アカウントをお持ちでないですか？ <a href="/tourist-register">アカウント作成はこちら</a></p>
    </div>
  );
};

export default TouristLoginPage;
