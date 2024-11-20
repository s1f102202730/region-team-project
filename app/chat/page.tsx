"use client"
import React from 'react';
import { Button, VStack } from '@chakra-ui/react';
import ChatBox from './components/chatbox'; // 正しいパスを確認
import { useRouter } from 'next/navigation';

const ChatBoxPage: React.FC = () => {
  const router = useRouter();

  const handleGoBackToTourist = () => {
    router.push('/tourist');
  };

  return (
    <VStack spacing={4} align="center" justify="center" minHeight="100vh">
      <ChatBox />
      <Button colorScheme="blue" onClick={handleGoBackToTourist}>
        観光客用ページに戻る
      </Button>
    </VStack>
  );
};

export default ChatBoxPage;
