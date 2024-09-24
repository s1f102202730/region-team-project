'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const MunicipalityRegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleRegister = () => {
    // 既存のアカウントを取得
    const existingAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');

    // 新しいアカウントを追加 (ロールを含む)
    const newAccount = { username, password, role: 'municipality' };
    existingAccounts.push(newAccount);

    // ローカルストレージに保存
    localStorage.setItem('accounts', JSON.stringify(existingAccounts));

    // 成功メッセージを設定し、ログインページにリダイレクト
    setSuccessMessage('アカウントが作成されました。ログインページにリダイレクトします。');
    setTimeout(() => {
      router.push('/municipality-login');
    }, 2000); // 2秒後にリダイレクト
  };

  return (
    <div>
      <h1>自治体アカウント作成</h1>
      {successMessage && <p>{successMessage}</p>}
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
      <button onClick={handleRegister}>アカウント作成</button>
    </div>
  );
};

export default MunicipalityRegisterPage;