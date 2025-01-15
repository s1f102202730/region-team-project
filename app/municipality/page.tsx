'use client'
import { useState } from 'react';
import { Box, Button, Input, useToast, VStack, Text, Icon, Flex } from '@chakra-ui/react';
import { FiUpload } from 'react-icons/fi';

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

      const embeddingResponse = await fetch('/api/embedding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
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
    <Flex justify="center" align="center" minH="100vh" bg="blue.100" p={4}>
      <Box
        w="full"
        maxW="400px"
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="xl"
        bg="white"
      >
        <form onSubmit={handleSubmit}>
          <VStack spacing={6}>
            <Text fontSize="lg" fontWeight="bold" color="blue.500" textAlign="center">
              Upload Your CSV File
            </Text>
            <Box
              w="full"
              p={4}
              borderWidth={2}
              borderStyle="dashed"
              borderColor="blue.300"
              borderRadius="md"
              textAlign="center"
              bg="blue.50"
              cursor="pointer"
              _hover={{ bg: "blue.100" }}
            >
              <label htmlFor="file-upload">
                <Icon as={FiUpload} boxSize={8} color="blue.500" />
                <Text mt={2} color="blue.500">
                  {file ? file.name : "Click to select a file"}
                </Text>
                <Input
                  id="file-upload"
                  type="file"
                  name="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  display="none"
                />
              </label>
            </Box>
            <Button
              type="submit"
              colorScheme="blue"
              w="full"
              size="lg"
              isDisabled={!file}
            >
              Upload File
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}
