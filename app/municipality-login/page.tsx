'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
  Flex,
  Link,  // Linkコンポーネントをインポート
} from '@chakra-ui/react';

const MunicipalityLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, municipalityName }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.role === 'municipality') {
          router.push('/municipality');
        } else {
          setErrorMessage('自治体としてログインできません。 (Cannot login as a municipality.)');
        }
      } else {
        throw new Error('ログインに失敗しました。 (Login failed.)');
      }
    } catch (error) {
      toast({
        title: 'ログイン失敗 (Login Failed)',
        description: 'ユーザー名またはパスワードが間違っています。 (Username or password is incorrect.)',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="blue.100">
      <Box maxW="450px" w="full" p={6} borderWidth={1} borderRadius="lg" boxShadow="md" bg="white">
        <Text textAlign="center" fontSize="4xl" color="blue.500" as="b">
          自治体ログイン (Municipality Login)
        </Text>
        <Stack spacing={5} mt={4}>
          <FormControl>
            <FormLabel htmlFor="username">ユーザー名 (Username)</FormLabel>
            <Input
              id="username"
              type="text"
              placeholder="ユーザー名 (Username)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">パスワード (Password)</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="パスワード (Password)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="municipalityName">自治体名 (MunicipalityName)</FormLabel>
            <Input
              id="municipalityName"
              type="municipalityName"
              placeholder="自治体名 (MunicipalityName)"
              value={municipalityName}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>

          {errorMessage && (
            <Text color="red.500" fontSize="sm">
              {errorMessage}
            </Text>
          )}

          <Button colorScheme="blue" size="lg" onClick={handleLogin}>
            ログイン (Login)
          </Button>

          <Text textAlign="center">
            アカウントをお持ちでないですか？ (Don't have an account?) 
            <Link href="/municipality-register" color="blue.500" textDecoration="underline">
              アカウント作成はこちら (Create an account here)
            </Link>
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
};

export default MunicipalityLoginPage;
