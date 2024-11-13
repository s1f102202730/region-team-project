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

      toast({
        title: result.message || "Error",
        description: result.error || "Data uploaded successfully",
        status: result.error ? "error" : "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading the file.",
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
