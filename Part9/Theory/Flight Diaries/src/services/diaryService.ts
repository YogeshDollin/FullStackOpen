import diaries from '../data/entries';
import { DiaryEntry, NonSensitivieDiaryEntry } from '../types';

const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const getNonSensistiveEntries = () : NonSensitivieDiaryEntry[] => {
    return diaries.map(({id, date, weather, visibility}) => ({
        id,
        date,
        weather,
        visibility
    }));
};

const addEntry = () => {
    return null;
};

export default {getEntries, getNonSensistiveEntries, addEntry}