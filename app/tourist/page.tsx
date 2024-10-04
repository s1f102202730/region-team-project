"use client"
import { Text, Button, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function TouristPage() {
  const router = useRouter();

  const handleGoToChat = () => {
    router.push('/chat');
  };

  return (
    <VStack spacing={4} align="center" justify="center" minHeight="100vh">
      <Text fontSize="2xl">観光客用ページ</Text>
      <Button colorScheme="blue" onClick={handleGoToChat}>
        チャットページへ移動
      </Button>
    </VStack>
  );
}
