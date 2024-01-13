import { useEffect, useState } from 'react';
import { NewDiaryEntry, NonSensitivieDiaryEntry } from './types';
import diariesService from './services/diariesService';
import Diaries from './components/Diaries';
import DiaryForm from './components/DiaryForm';

function App() {
  const [diaries, setDiaries] = useState<NonSensitivieDiaryEntry[]>([]);
  const [error, setError] = useState('');
  useEffect(() => {
    diariesService.getDiaries()
      .then(data => setDiaries(data));
  }, [])

  const addEntry = (newDiary: NewDiaryEntry) => {
    diariesService.addEntry(newDiary)
      .then(data => setDiaries(diaries.concat(data)))
      .catch((error: Error) => Notify(error.message));
  }

  const Notify = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 5000);
  }

  return (
    <>
      <p style={{color: 'red'}}>{error}</p>
      <DiaryForm addEntry={addEntry}/>
      <Diaries diaries={diaries}/>
    </>
  )
}

export default App
