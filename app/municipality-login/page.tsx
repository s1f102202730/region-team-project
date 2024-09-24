'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const MunicipalityLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // ローカルストレージからアカウント情報を取得
    const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');

    // 入力されたユーザー名、パスワード、ロールが一致するか確認
    const accountExists = accounts.find(
      (account: { username: string; password: string; role: string }) =>
        account.username === username && account.password === password && account.role === 'municipality'
    );

    if (accountExists) {
      // ログイン成功
      setErrorMessage(''); // エラーメッセージをクリア
      router.push('/municipality'); // ログイン後に自治体ページへ遷移
    } else {
      // ログイン失敗
      setErrorMessage('ユーザー名またはパスワードが正しくありません。');
    }
  };

  return (
    <div>
      <h1>自治体ログイン</h1>
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
    </div>
  );
};

export default MunicipalityLoginPage;
