import React, { useState } from 'react';
import { Box, Input, Button, VStack, HStack, Text } from '@chakra-ui/react';
import { ask } from '../../../lib/api';

type Message = {
  text: string;
  sender: 'user' | 'ai';
};

const ChatBox: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async () => {
    if (message.trim()) {
      const newMessages: Message[] = [
        ...messages, 
        { text: message, sender: 'user' },
      ];
      setMessages(newMessages);
    
      const response = await ask(message);
      if (response) {
        setMessages(prevMessages => [
          ...prevMessages, 
          { text: response, sender: 'ai' }
        ]);
      }

      setMessage(""); // メッセージ送信後にクリア

    }
  };

  return (
    <Box width="400px" margin="0 auto" border="1px solid #ccc" borderRadius="md" padding="20px" boxShadow="md">
      <VStack spacing={4} height="300px" overflowY="scroll" marginBottom="10px">
        {messages.map((msg, index) => (
          <HStack key={index} justify={msg.sender === 'user' ? 'flex-end' : 'flex-start'} width="100%">
            <Box 
              padding="10px"
              borderRadius="md"
              bg={msg.sender === 'user' ? 'green.100' : 'gray.100'}
            >
              <Text>{msg.text}</Text>
            </Box>
          </HStack>
        ))}
      </VStack>
      <HStack spacing={2}>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="メッセージを入力..."
        />
        <Button onClick={handleSend} colorScheme="blue">
          送信
        </Button>
      </HStack>
    </Box>
  );
};

export default ChatBox;