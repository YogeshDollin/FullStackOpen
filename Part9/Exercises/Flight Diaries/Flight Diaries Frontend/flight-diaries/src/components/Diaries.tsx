import { NonSensitivieDiaryEntry } from "../types";

const Diaries = ({diaries}: {diaries: NonSensitivieDiaryEntry[]}) => {
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
    );
}

export default Diaries;