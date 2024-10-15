import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react';

export const metadata = {
  title: "app-routerテストページ",
  description: "Next.jsのApp Routerでコンポーネント管理する",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <ChakraProvider>
          <SessionProvider>{children}</SessionProvider>
        </ChakraProvider>
        </body>
    </html>
  );
}