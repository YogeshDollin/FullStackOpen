import axios from 'axios';
import { NonSensitivieDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3003/api/diaries';

const getDiaries = () => {
    return axios.get<NonSensitivieDiaryEntry[]>(baseUrl)
        .then(res => res.data);
};

export default {getDiaries};