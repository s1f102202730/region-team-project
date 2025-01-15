'use client'

import Link from 'next/link'
import { Box, Text, Button, VStack, HStack, Heading, Highlight } from '@chakra-ui/react'

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" width="64px" height="64px" fill="white">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
)

export default function Component() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bg="blue.100"
    >
      <Text
        fontSize="2xl"
        fontWeight="bold"
        color="white"
        textAlign="center"
        mb="8"
        p="4"
        bg="blue.500"
        borderRadius="md"
        boxShadow="lg"
      >
        
          ログインするアカウントを選択してください

      </Text>
      <HStack spacing="8">
        <VStack>
          <Heading as="h2" size="md" mb="4">
            観光客
          </Heading>
          <Link href="/tourist-login" passHref>
            <Button
              as="div"
              w="128px"
              h="128px"
              bg="blue.500"
              _hover={{ bg: 'blue.700' }}
              borderRadius="md"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <PersonIcon />
            </Button>
          </Link>
        </VStack>
        <VStack>
          <Heading as="h2" size="md" mb="4">
            地域
          </Heading>
          <Link href="/municipality-login" passHref>
            <Button
              as="div"
              w="128px"
              h="128px"
              bg="blue.500"
              _hover={{ bg: 'blue.700' }}
              borderRadius="md"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <PersonIcon />
            </Button>
          </Link>
        </VStack>
      </HStack>
    </Box>
  )
}
