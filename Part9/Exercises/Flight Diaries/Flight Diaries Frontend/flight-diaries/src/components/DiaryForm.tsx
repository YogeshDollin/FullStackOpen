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
                    <input type="text" value={date} onChange={e => setDate(e.target.value)}></input>
                </div>
                <div>
                    <label>visibility</label>
                    <input type="text" value={visibility} onChange={(e) => setVisibility(e.target.value)}></input>
                </div>
                <div>
                    <label>weather</label>
                    <input type="text" value={weather} onChange={({target}) => setWeather(target.value)}></input>
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