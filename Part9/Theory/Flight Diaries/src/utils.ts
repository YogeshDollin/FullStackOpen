import { NewDiaryEntry, Weather, Visibility } from "./types";

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    if(!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object){
        const newEntry: NewDiaryEntry = {
            comment: parseComment(object.comment),
            date: parseDate(object.date),
            weather: parseWeather(object.weather),
            visibility: parseVisibility(object.visibility)
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some of fields are missing');
};

const isString = (text: unknown): text is string  => {
    return typeof text === 'string' || text instanceof String;
};

const parseComment = (comment: unknown): string => {
    if(!comment || !isString(comment)){
        throw new Error('Incorrect or missing commment');
    }
    return comment;
};

const isWeather = (weather: string): weather is Weather => {
    return Object.values(Weather).map(v => v.toString()).includes(weather);
};

const parseWeather = (weather: unknown): Weather => {
    if(!weather || !isString(weather) || !isWeather(weather)){
        throw new Error('Incorrect or missing weather');
    }
    return weather;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)){
        throw new Error('Incorrect or missing date');
    }
    return date;
};

const isVisibility = (visibility: string): visibility is Visibility => {
    return Object.values(Visibility).map(v => v.toString()).includes(visibility);
};
const parseVisibility = (visibility: unknown): Visibility => {
    if(!visibility || !isString(visibility) || !isVisibility(visibility)){
        throw new Error('Incorrect or missing visibility');
    }
    return visibility;
};

export default {toNewDiaryEntry};