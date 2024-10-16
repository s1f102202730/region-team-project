import React, { useState, useEffect } from 'react';
import { Box, Input, Button, VStack, HStack, Text } from '@chakra-ui/react';
import { ask } from '../../../lib/api';

type Message = {
  text: string;
  sender: 'user' | 'ai';
};

const ChatBox: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<number>(1); // 会話フローを管理するステップ
  const [hobby, setHobby] = useState<string>(""); // 趣味や興味
  const [age, setAge] = useState<string>(""); // 年齢
  const [location, setLocation] = useState<string>(""); // 場所
  const [activity, setActivity] = useState<string>(""); // やりたいこと

  // 初回にAIから質問を投げかける
  useEffect(() => {
    const initialMessage = {
      text: "こんにちは！まず、あなたの趣味や興味を教えてください。",
      sender: 'ai' as const,
    };
    setMessages([initialMessage]);
  }, []);

  const handleSend = async () => {
    if (message.trim()) {
      const newMessages: Message[] = [
        ...messages, 
        { text: message, sender: 'user' },
      ];
      setMessages(newMessages);

      let prompt = '';

      // ステップごとのプロンプト作成
      switch(step) {
        case 1:
          // 趣味や興味に関する質問
          prompt = `ユーザーの回答から趣味や興味を抽出し、次の質問を生成してください。人間同士の会話のような自然な口調にしてください。\n\nユーザー入力: "${message}"`;
          break;
        case 2:
          // 年齢に関する質問
          setHobby(message); // 趣味や興味を保存
          prompt = `ユーザーは「${hobby}」に興味があります。次に年齢を質問し、年齢を抽出してください。人間同士の会話のような自然な口調にしてください。\n\nユーザー入力: "${message}"`;
          break;
        case 3:
          // 場所に関する質問
          setAge(message); // 年齢を保存
          prompt = `ユーザーは${age}歳です。次に旅行したい場所（地名や地方）を質問し、場所を抽出してください。人間同士の会話のような自然な口調にしてください。\n\nユーザー入力: "${message}"`;
          break;
        case 4:
          // やりたいことに関する質問
          setLocation(message); // 場所を保存
          prompt = `ユーザーは「${location}」に行きたいです。次に旅行中にやりたいことを質問し、やりたいことを抽出してください。人間同士の会話のような自然な口調にしてください。\n\nユーザー入力: "${message}"`;
          break;
        case 5:
          // 旅行プランの提案
          setActivity(message); // やりたいことを保存
          prompt = `ユーザーは「${activity}」をやりたいと考えています。これまでの情報（趣味: ${hobby}, 年齢: ${age}, 場所: ${location}, やりたいこと: ${activity}）を基に旅行プランを提案してください。`;
          break;
        default:
          prompt = `旅行プランの提案が完了しました。`;
          break;
      }

      const response = await ask(prompt);

      if (response) {
        setMessages(prevMessages => [
          ...prevMessages, 
          { text: response, sender: 'ai' }
        ]);

        // 次のステップに進む
        setStep(step + 1);
        setMessage(""); // メッセージ送信後にクリア
      }
    }
  };

  return (
    <Box
      width="100vw" // 画面全体の幅に
      height="100vh" // 画面全体の高さに
      bg="white" // ベースカラーを白に
      padding="20px"
      boxShadow="xl"
      display="flex"
      flexDirection="column"
    >
      <VStack
        spacing={4}
        height="80vh" // メッセージリストの高さを画面の80%に
        overflowY="scroll"
        bg="gray.50" // メッセージエリアの背景色をライトグレーに
        padding="10px"
        borderRadius="md"
        boxShadow="base"
        marginBottom="10px"
        flex="1"
      >
        {messages.map((msg, index) => (
          <HStack key={index} justify={msg.sender === 'user' ? 'flex-end' : 'flex-start'} width="100%">
            <Box 
              padding="10px"
              borderRadius="md"
              bg={msg.sender === 'user' ? 'blue.100' : 'gray.200'} // ユーザー側のメッセージは青、AI側はグレーに
              color={msg.sender === 'user' ? 'blue.700' : 'gray.700'} // 差し色に青を利用
              maxWidth="70%" // メッセージの最大幅を調整
            >
              <Text>{msg.text}</Text>
            </Box>
          </HStack>
        ))}
      </VStack>
      <HStack spacing={2} width="100%">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="メッセージを入力..."
          flex="1"
          bg="white" // 入力欄の背景色を白に
          borderColor="blue.300" // 枠線を青に
          _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.6)' }} // フォーカス時の青
        />
        <Button onClick={handleSend} colorScheme="blue">
          送信
        </Button>
      </HStack>
    </Box>
  );
};

export default ChatBox;
