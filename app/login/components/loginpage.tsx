'use client'
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
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

export default function FormWrapper() {
  interface InputProps {
    email: string;
    password: string;
  }

  const { control, handleSubmit } = useForm<InputProps>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const toast = useToast();

  const onSubmit = async (data: InputProps) => {
    const result = await signIn('user', {
      redirect: false,
      email: data.email,
      password: data.password
    });

    if (result?.error) {
      toast({
        title: "ログイン失敗",
        description: "メールアドレスまたはパスワードが間違っています。",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      location.href = '/';
    }
  };

  return (
    <Flex 
      minH="100vh" 
      align="center" 
      justify="center" 
      bg="gray.100" // 背景色を薄いグレーに設定
    >
      <Box 
        maxW="450px" 
        w="full" 
        p={6} 
        borderWidth={1} 
        borderRadius="lg" 
        boxShadow="md" 
        bg="white"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Text textAlign='center' fontSize='4xl' color='green' as='b'>Log in</Text>
          <Stack spacing={5}>
            <FormControl>
              <FormLabel htmlFor="email">Enter your email here</FormLabel>
              <Input id="email" name="email" type="email" required />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Enter your password here</FormLabel>
              <Input id="password" name="password" type="password" required />
            </FormControl>

            <Button type="submit" colorScheme="red" size="lg">
              Log in
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}
