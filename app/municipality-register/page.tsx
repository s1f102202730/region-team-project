'use client';

import { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Select, Text, useToast, Flex } from '@chakra-ui/react';
import { getPrefecturesAndMunicipalities } from '@/lib/dataUtils';

const MunicipalityRegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPref, setSelectedPref] = useState('');
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState('');
  const [municipalities, setMunicipalities] = useState<{ name: string; id: string }[]>([]);
  const { prefectureOptions, municipalityOptions } = getPrefecturesAndMunicipalities();
  const toast = useToast();

  // 都道府県が選択されたら市町村を更新
  useEffect(() => {
    if (selectedPref) {
      setMunicipalities(municipalityOptions[selectedPref] || []);
    } else {
      setMunicipalities([]);
    }
  }, [selectedPref]);

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role: 'municipality', municipalityId: selectedMunicipalityId }),
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
            <FormLabel htmlFor="prefecture">都道府県</FormLabel>
            <Select id="prefecture" placeholder="都道府県を選択" value={selectedPref} onChange={(e) => setSelectedPref(e.target.value)}>
              {prefectureOptions.map((pref) => (
                <option key={pref} value={pref}>{pref}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="municipality">市町村</FormLabel>
            <Select
              id="municipality"
              placeholder="市町村を選択"
              value={selectedMunicipalityId}
              onChange={(e) => setSelectedMunicipalityId(e.target.value)}
              disabled={!selectedPref}
            >
              {municipalities.map((municipality) => (
                <option key={municipality.id} value={municipality.id}>{municipality.name}</option>
              ))}
            </Select>
          </FormControl>

          <Button colorScheme="blue" size="lg" onClick={handleRegister}>アカウント作成</Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default MunicipalityRegisterPage;
