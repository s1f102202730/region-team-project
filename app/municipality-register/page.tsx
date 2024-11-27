'use client';

import { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Select, Text, useToast, Flex } from '@chakra-ui/react';

const MunicipalityRegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [municipalityName, setMunicipalityName] = useState('');
  const toast = useToast();

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role: 'municipality', prefecture }),
      });

      if (response.ok) {
        toast({
          title: 'アカウント作成成功',
          description: 'ログインページにリダイレクトします。',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => (window.location.href = '/municipality-login'), 2000);
      } else {
        toast({ title: '登録失敗', description: 'もう一度お試しください。', status: 'error', duration: 5000, isClosable: true });
      }
    } catch (error) {
      toast({ title: '登録失敗', description: 'もう一度お試しください。', status: 'error', duration: 5000, isClosable: true });
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="blue.100">
      <Box maxW="450px" w="full" p={6} borderWidth={1} borderRadius="lg" boxShadow="md" bg="white">
        <Text textAlign="center" fontSize="4xl" color="blue.500" as="b">自治体アカウント作成</Text>
        <Stack spacing={5} mt={4}>
          <FormControl>
            <FormLabel htmlFor="username">ユーザー名</FormLabel>
            <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">パスワード</FormLabel>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="prefecture">市区町村</FormLabel>
            <Input id="password" type="prefecture" value={municipalityName} onChange={(e) => setMunicipalityName(e.target.value)} required />
          </FormControl>

          <Button colorScheme="blue" size="lg" onClick={handleRegister}>アカウント作成</Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default MunicipalityRegisterPage;
