// app/components/CitySelect.tsx
import { useEffect, useState } from 'react';
import { Select } from '@chakra-ui/react';

interface City {
  code: string;
  name: string;
}

export default function CitySelect({ onCitySelect }: { onCitySelect: (cityCode: string) => void }) {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      const res = await fetch('/api/cities');
      const data = await res.json();
      setCities(data);
    };
    fetchCities();
  }, []);

  return (
    <Select placeholder="Select city" onChange={(e) => onCitySelect(e.target.value)}>
      {cities.map((city) => (
        <option key={city.code} value={city.code}>
          {city.name}
        </option>
      ))}
    </Select>
  );
}
