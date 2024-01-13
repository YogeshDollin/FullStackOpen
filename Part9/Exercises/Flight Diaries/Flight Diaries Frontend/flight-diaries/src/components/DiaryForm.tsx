import { useState } from "react";
import { NewDiaryEntry } from "../types";

const DiaryForm = ({addEntry}: {addEntry: (d: NewDiaryEntry) => void}) => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState<string | undefined>(undefined);

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        addEntry({date, visibility, weather, comment} as NewDiaryEntry);
    };

    return (
        <>
            <h1>Add new entry</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label>date</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)}></input>
                </div>
                <div>
                    <label>visibility</label>
                    <label><input type="radio" value='great' onChange={(e) => setVisibility(e.target.value)}></input>great</label>
                    <label><input type="radio" value='good' onChange={(e) => setVisibility(e.target.value)}></input>good</label>
                    <label><input type="radio" value='ok' onChange={(e) => setVisibility(e.target.value)}></input>ok</label>
                    <label><input type="radio" value='poor' onChange={(e) => setVisibility(e.target.value)}></input>poor</label>
                </div>
                <div>
                    <label>weather</label>
                    <label><input type="radio" value='sunny' onChange={(e) => setWeather(e.target.value)}></input>sunny</label>
                    <label><input type="radio" value='rainy' onChange={(e) => setWeather(e.target.value)}></input>rainy</label>
                    <label><input type="radio" value='cloudy' onChange={(e) => setWeather(e.target.value)}></input>cloudy</label>
                    <label><input type="radio" value='stormy' onChange={(e) => setWeather(e.target.value)}></input>stormy</label>
                    <label><input type="radio" value='windy' onChange={(e) => setWeather(e.target.value)}></input>windy</label>
                </div>
                <div>
                    <label>comment</label>
                    <input type="text" value={comment} onChange={e => setComment(e.target.value)}></input>
                </div>
                <button type="submit">Add</button>
            </form>
        </>
    );
};

export default DiaryForm;