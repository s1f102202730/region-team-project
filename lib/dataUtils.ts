// lib/dataUtils.ts
import fs from 'fs';
import path from 'path';
import csvParse from 'csv-parse/lib/sync';

interface Municipality {
  municipalityId: string;
  pref: string;
  municipality: string;
}

// CSVファイルを読み込んで都道府県と市町村を返す
export function getPrefecturesAndMunicipalities() {
  const filePath = path.join(process.cwd(), 'public/filtered_data.csv');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  const records: Municipality[] = csvParse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  // 都道府県ごとに市町村をグループ化
  const prefectureOptions = Array.from(new Set(records.map(record => record.pref)));
  const municipalityOptions = prefectureOptions.reduce((acc, pref) => {
    acc[pref] = records
      .filter(record => record.pref === pref)
      .map(record => ({ name: record.municipality, id: record.municipalityId }));
    return acc;
  }, {} as Record<string, { name: string; id: string }[]>);

  return { prefectureOptions, municipalityOptions };
}
