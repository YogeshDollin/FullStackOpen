import axios from 'axios';
import { DiaryEntry, NewDiaryEntry, NonSensitivieDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3003/api/diaries';

const getDiaries = () => {
    return axios.get<NonSensitivieDiaryEntry[]>(baseUrl)
        .then(res => res.data);
};

const addEntry = (newDiary: NewDiaryEntry) => {
    return axios.post<DiaryEntry>(baseUrl, newDiary)
        .then(res => res.data);
}

export default {getDiaries, addEntry};