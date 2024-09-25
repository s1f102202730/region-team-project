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
  const [step, setStep] = useState<number>(1);
  const [season, setSeason] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [activity, setActivity] = useState<string>("");
  const [budget, setBudget] = useState<string>("");

  const handleSend = async () => {
    if (message.trim()) {
      const newMessages: Message[] = [...messages, { text: message, sender: 'user' }];
      setMessages(newMessages);
      
      let response = "";

      switch (step) {
        case 1: // 会話の開始
          response = "こんにちは！旅行の計画を立てましょう。最初に、旅行する季節を教えてください。";
          setStep(2);
          break;
        case 2: // 季節を尋ねる
          setSeason(message);
          response = "素晴らしい！次に、旅行したい場所はどこですか？";
          setStep(3);
          break;
        case 3: // 場所を尋ねる
          setLocation(message);
          response = "いい選択です！どんなアクティビティを楽しみたいですか？";
          setStep(4);
          break;
        case 4: // アクティビティを尋ねる
          setActivity(message);
          response = "それでは、予算はどのくらいですか？";
          setStep(5);
          break;
        case 5: // 予算を尋ねる
          setBudget(message);
          
          // APIを呼び出して提案を取得
          response = "提案を作成しています。少々お待ちください...";
          setMessages(prevMessages => [...prevMessages, { text: response, sender: 'ai' }]);
          
          const apiResponse = await ask({
            message: `提案をお願いします！季節: ${season}, 場所: ${location}, アクティビティ: ${activity}, 予算: ${budget}`,
            season,
            time: "",  // 追加で時間の詳細が必要ならここに入力
            weather: "" // 天気の詳細が必要ならここに入力
          });

          // APIのレスポンスを表示
          response = apiResponse || "提案が見つかりませんでした。";
          setStep(6);
          break;
        case 6: // 提案後のフォローアップ
          response = "観光地の提案は以上です。他に質問があればどうぞ。";
          setStep(1);  // 最初に戻る
          break;
        default:
          response = "エラーが発生しました。最初からやり直してください。";
          setStep(1);
          break;
      }

      if (response) {
        setMessages(prevMessages => [...prevMessages, { text: response, sender: 'ai' }]);
      }

      setMessage("");  // メッセージ送信後にクリア
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg="gray.50"
      padding="20px"
    >
      <VStack spacing={4} width="100%" maxW="1200px" height="80vh" overflowY="scroll" bg="white" border="1px solid #ccc" borderRadius="md" boxShadow="md" padding="20px">
        {messages.map((msg, index) => (
          <HStack key={index} justify={msg.sender === 'user' ? 'flex-end' : 'flex-start'} width="100%">
            <Box padding="10px" borderRadius="md" bg={msg.sender === 'user' ? 'green.100' : 'gray.100'}>
              <Text>{msg.text}</Text>
            </Box>
          </HStack>
        ))}
      </VStack>

      <HStack spacing={2} width="100%" maxW="1200px" marginTop="10px">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="メッセージを入力..."
          bg="white"
        />
        <Button onClick={handleSend} colorScheme="green">送信</Button>
      </HStack>
    </Box>
  );
};

export default ChatBox;
