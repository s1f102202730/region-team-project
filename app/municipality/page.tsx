'use client';
import { useState } from 'react';
import { Box, Button, Input, useToast, VStack } from '@chakra-ui/react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const toast = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to upload.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }

      toast({
        title: result.message || "Success",
        description: "Data uploaded successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      console.log('result.data:', result.data);

      // ベクトル化リクエスト
      const embeddingResponse = await fetch('/api/embedding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data), // アップロード結果のデータ
      });

      const embeddingResult = await embeddingResponse.json();
      if (embeddingResult.error) {
        throw new Error(embeddingResult.error);
      }

      toast({
        title: "Embedding successful",
        description: "Data has been successfully vectorized.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: unknown) {
      let errorMessage = "An error occurred during processing.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Input
            type="file"
            name="file"
            accept=".csv"
            onChange={handleFileChange}
            border="1px solid gray"
            borderRadius="md"
            p={2}
          />
          <Button
            type="submit"
            colorScheme="teal"
          >
            Upload CSV
          </Button>
        </VStack>
      </form>
    </Box>
  );
}