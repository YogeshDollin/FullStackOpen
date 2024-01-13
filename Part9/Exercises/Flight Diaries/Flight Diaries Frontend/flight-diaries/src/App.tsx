import { useEffect, useState } from 'react';
import { NewDiaryEntry, NonSensitivieDiaryEntry } from './types';
import diariesService from './services/diariesService';
import Diaries from './components/Diaries';
import DiaryForm from './components/DiaryForm';

function App() {
  const [diaries, setDiaries] = useState<NonSensitivieDiaryEntry[]>([]);
  useEffect(() => {
    diariesService.getDiaries()
      .then(data => setDiaries(data));
  }, [])

  const addEntry = (newDiary: NewDiaryEntry) => {
    diariesService.addEntry(newDiary)
      .then(data => diaries.concat(data));
  }

  return (
    <>
      <DiaryForm addEntry={addEntry}/>
      <Diaries diaries={diaries}/>
    </>
  )
}

export default App
