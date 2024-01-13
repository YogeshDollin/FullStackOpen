import { useEffect, useState } from 'react';
import { NonSensitivieDiaryEntry } from './types';
import diariesService from './services/diariesService';

function App() {
  const [diaries, setDiaries] = useState<NonSensitivieDiaryEntry[]>([]);
  useEffect(() => {
    diariesService.getDiaries()
      .then(data => setDiaries(data));
  }, [])

  return (
    <>
      <h1>Diary Entries</h1>
      {diaries.map(diary => (
        <div key={diary.id}>
          <h2>{diary.date}</h2>
          <p>Visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </>
  )
}

export default App
