'use client'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'

export default function FormWrapper() {
  interface InputControlProps {
    name: string;
    type: string;
    control: any;
  }
  
  const InputControl: React.FC<InputControlProps> = ({ name, type, control }) => (
    <input name={name} type={type} {...control} />
  );

  interface InputProps {
    email: string;
    password: string;
  }
  
  // フォーム関連の変数定義
  const {
    control,
    handleSubmit
  } = useForm<InputProps>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // フォーム送信処理
  const onSubmit = async (data: InputProps) => {
    const result = await signIn('user', {
      redirect: false,
      email: data.email,
      password: data.password
    });
  
    if (result?.error) {
      // ログイン失敗時の処理
    } else {
      location.href = '/';
    }
  };

  // GreenButton のプロパティの型を定義
  interface GreenButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
  }
  
  const GreenButton: React.FC<GreenButtonProps> = ({ children, ...props }) => (
    <button style={{ backgroundColor: 'green', color: 'white' }} {...props}>
      {children}
    </button>
  );
  
  return (
    <>
      <form
        className="max-w-[450px] w-full mx-auto border rounded-xl p-4 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-5">
          <div className="font-bold mb-2">メールアドレス</div>
          <div className="flex items-start gap-8">
            <InputControl
              name="email"
              type="email"
              control={control}
            />
          </div>
        </div>

        <div className="mb-5">
          <div className="font-bold mb-2">パスワード</div>
          <div className="flex items-start gap-8">
            <InputControl
              name="password"
              type="password"
              control={control}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <GreenButton
            className="max-w-[250px] py-3 text-sm"
            type="submit"
          >
            ログイン
          </GreenButton>
        </div>
      </form>
    </>
  )
}
