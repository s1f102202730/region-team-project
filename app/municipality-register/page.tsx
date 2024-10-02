'use client';

import { useState } from 'react';
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
} from '@chakra-ui/react';

const MunicipalityRegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const toast = useToast();

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
        setSuccessMessage('アカウントが作成されました。ログインページにリダイレクトします。 (Account created. Redirecting to login page...)');
        setTimeout(() => {
          window.location.href = '/municipality-login';
        }, 2000);
      } else {
        setErrorMessage('登録に失敗しました。 (Registration failed.)');
      }
    } catch (error) {
      toast({
        title: '登録失敗 (Registration Failed)',
        description: 'もう一度お試しください。 (Please try again.)',
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
          自治体アカウント作成 (Municipality Account Creation)
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

          {errorMessage && (
            <Text color="red.500" fontSize="sm">
              {errorMessage}
            </Text>
          )}

          <Button colorScheme="blue" size="lg" onClick={handleRegister}>
            アカウント作成 (Create Account)
          </Button>

          {successMessage && (
            <Text color="green.500" fontSize="sm">
              {successMessage}
            </Text>
          )}
        </Stack>
      </Box>
    </Flex>
  );
};

export default MunicipalityRegisterPage;
