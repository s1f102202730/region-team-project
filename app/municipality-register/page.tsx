'use client';

import { useState } from 'react';

const MunicipalityRegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role: 'municipality' }),
      });

      if (response.ok) {
        setSuccessMessage('アカウントが作成されました。ログインページにリダイレクトします。');
        setTimeout(() => {
          window.location.href = '/municipality-login';
        }, 2000);
      } else {
        const data = await response.json();
        setErrorMessage(data.error || '登録に失敗しました。');
      }
    } catch (error) {
      setErrorMessage('エラーが発生しました。もう一度お試しください。');
    }
  };

  return (
    <div>
      <h1>自治体アカウント作成</h1>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <label htmlFor="username">ユーザー名</label>
      <input
        id="username"
        name="username"
        type="text"
        placeholder="ユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">パスワード</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>アカウント作成</button>
    </div>
  );
};

export default MunicipalityRegisterPage;
