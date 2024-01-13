import axios, { AxiosError } from 'axios';
import { DiaryEntry, NewDiaryEntry, NonSensitivieDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3003/api/diaries';

const getDiaries = () => {
    return axios.get<NonSensitivieDiaryEntry[]>(baseUrl)
        .then(res => res.data);
};

const addEntry = (newDiary: NewDiaryEntry) => {
    return axios.post<DiaryEntry>(baseUrl, newDiary)
        .then(res => res.data)
        .catch((err: AxiosError) => {throw new Error(err.message);} );
}

export default {getDiaries, addEntry};