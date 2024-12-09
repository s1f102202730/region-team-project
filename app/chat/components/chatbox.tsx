import React, { useState, useEffect } from 'react';
import { Box, Input, Button, VStack, HStack, Text } from '@chakra-ui/react';
import { ask } from '../../lib/api';

type Message = {
  text: string;
  sender: 'user' | 'ai';
};

const ChatBox: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<number>(1); // 会話フローを管理するステップ
  const [hobby, setHobby] = useState<string>(""); // 趣味や興味
  const [currentLocation, setCurrentLocation] = useState<string>(""); // 今住んでいる場所
  const [duration, setDuration] = useState<string>(""); // 旅行の期間
  const [location, setLocation] = useState<string>(""); // 行きたい場所
  const [activity, setActivity] = useState<string>(""); // やりたいこと

  // 初回にAIから質問を投げかける
  useEffect(() => {
    const initialMessage = {
      text: "こんにちは！旅行の計画をサポートします！まず、あなたの趣味や興味のあるものについて教えてください。",
      sender: 'ai' as const,
    };
    setMessages([initialMessage]);
  }, []);

  async function fetchRecommendations(query: string) {
    const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
    });
    return response.json();
  }

  const handleGeneratePlan = async () => {
    const recommendations = await fetchRecommendations(`${hobby} ${activity}`);
    const prompt = `以下のデータに基づいて旅行プランを提案してください:
    趣味: ${hobby}, やりたいこと: ${activity}, 滞在期間: ${duration}, 現在の場所: ${currentLocation}
    検索結果: ${recommendations.map((rec: { name: string }) => rec.name).join(", ")}`;

    const response = await ask(prompt);

    if (response) {
      setMessages((prev) => [...prev, { text: response, sender: 'ai' }]);
    }
  };

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
          // 趣味や興味を保存し、ユーザーの住んでいる場所を尋ねる
          setHobby(message); // 趣味や興味を保存
          prompt = `ユーザーは「${message}」に興味があります。次に、ユーザーが住んでいる地域はどこかをいう質問のみをしてください。人間同士の会話のように自然な口調でお願いします。\n\nユーザー入力: "${message}"`;
          break;
        case 2:
          // 旅行の期間に関する質問
          setCurrentLocation(message); // 今住んでいる場所を保存
          prompt = `ユーザーは「${currentLocation}」に住んでいます。次に旅行の期間（例: 日帰り、二泊三日）を質問し、期間を抽出してください。人間同士の会話のような自然な口調にしてください。\n\nユーザー入力: "${message}"`;
          break;
        case 3:
          // 行きたい場所に関する質問
          setDuration(message); // 旅行の期間を保存
          prompt = `ユーザーは「${duration}」で旅行したいです。次に行きたい場所（地名や地方）を質問し、場所を抽出してください。人間同士の会話のような自然な口調にしてください。\n\nユーザー入力: "${message}"`;
          break;
        case 4:
          // やりたいことに関する質問
          setLocation(message); // 行きたい場所を保存
          prompt = `ユーザーは「${location}」に行きたいです。次に旅行中にやりたいことを質問し、やりたいことを抽出してください。人間同士の会話のような自然な口調にしてください。\n\nユーザー入力: "${message}"`;
          break;
        case 5:
          // 旅行プランの提案
          setActivity(message); // やりたいことを保存
          prompt = `ユーザーは「${activity}」をやりたいと考えています。これまでの情報（趣味: ${hobby}, 住んでいる地域: ${currentLocation}, 期間: ${duration}, 行きたい場所: ${location}, やりたいこと: ${activity}）を基に旅行プランを提案してください。`;
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