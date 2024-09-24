import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  Flex,
  Container,
  Heading,
} from '@chakra-ui/react'
import { ask } from '../../../lib/api'

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  time: string;
};

export default function ChatBox() {
  const [message, setMessage] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSend = async () => {
    if (message.trim()) {
      const newUserMessage: Message = {
        id: messages.length + 1,
        text: message,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prevMessages => [...prevMessages, newUserMessage])
      setMessage("")

      const response = await ask(message)
      if (response) {
        const newAiMessage: Message = {
          id: messages.length + 2,
          text: response,
          sender: 'ai',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(prevMessages => [...prevMessages, newAiMessage])
      }
    }
  }

  return (
    <Flex direction="column" h="100vh" bg="gray.100">
      <Container maxW="container.xl" flex="1" overflowY="auto" py={4}>
        <VStack spacing={4} align="stretch">
          <Heading textAlign="center" color="green.700" mb={4}>Chat</Heading>
          {messages.map((msg) => (
            <Flex key={msg.id} justify={msg.sender === 'user' ? 'flex-end' : 'flex-start'}>
              <Box
                maxW="2xl"
                bg={msg.sender === 'user' ? 'green.500' : 'gray.300'}
                color={msg.sender === 'user' ? 'white' : 'black'}
                borderRadius="lg"
                p={3}
              >
                <Text>{msg.text}</Text>
                <Text fontSize="xs" textAlign="right" mt={1} opacity={0.7}>
                  {msg.time}
                </Text>
              </Box>
            </Flex>
          ))}
          <div ref={messagesEndRef} />
        </VStack>
      </Container>

      <Box bg="white" p={4}>
        <Container maxW="container.xl">
          <HStack spacing={2}>
            <Input
              placeholder="メッセージを入力"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button
              onClick={handleSend}
              colorScheme="green"
            >
              送信
            </Button>
          </HStack>
        </Container>
      </Box>
    </Flex>
  )
}