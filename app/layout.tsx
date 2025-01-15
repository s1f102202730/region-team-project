import { ChakraProvider } from '@chakra-ui/react'

export const metadata = {
  title: "旅AI",
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
        {children}
        </ChakraProvider>
        </body>
    </html>
  );
}