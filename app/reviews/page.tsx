// app/review/page.tsx
'use client';

import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Select } from '@chakra-ui/react';
import CitySelect from './components/CitySelect';
import { useSession } from 'next-auth/react';

export default function ReviewPage() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    cityCode: '',
    touristSpotId: '',
    overallSatisfaction: 0,
    infrastructure: 0,
    safety: 0,
    accessibility: 0,
    serviceQuality: 0,
    regionalCharm: 0,
    informationAccess: 0,
    revisitIntent: 0,
  });

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert('Review submitted successfully');
      } else {
        alert('Failed to submit review');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>Select City</FormLabel>
        <CitySelect onCitySelect={(cityCode) => setFormData({ ...formData, cityCode })} />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Tourist Spot</FormLabel>
        <Input
          placeholder="Tourist Spot"
          onChange={(e) => setFormData({ ...formData, touristSpotId: e.target.value })}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Overall Satisfaction</FormLabel>
        <Input
          type="number"
          onChange={(e) => setFormData({ ...formData, overallSatisfaction: Number(e.target.value) })}
        />
      </FormControl>

      {/* その他のレビュー項目の入力欄も同様に設置 */}

      <Button mt={4} onClick={handleSubmit}>
        Submit Review
      </Button>
    </Box>
  );
}
