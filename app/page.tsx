"use client"
import React, {useState} from 'react';
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState<String[]>([]);
    const [startOfStory, setStartOfStory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const genres = ['Фантастика', 'Приключения', 'Детектив', 'Фэнтези', 'Драма', 'Сказка'];

    function handleStart(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setShowForm(true);
    }

    function handleGenreClick(genre: string) {
        setSelectedGenres(prevState => {
            if (prevState.includes(genre)) {
                return prevState.filter(g => g !== genre);
            } else {
                return [...prevState, genre];
            }
        });
    }

    async function handleSubmit() {
        if (selectedGenres.length === 0) {
            return;
        }
        setIsLoading(true)
        const response = await fetch('/api/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                genres: selectedGenres,
                start: startOfStory,
            }),
        });

        const data = await response.json();

        if (data.story_id) {
            router.push(`/story/${data.story_id}/`);
        }
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="bg-white flex flex-col items-center p-2 sm:p-0 justify-center w-3/4 sm:w-1/2 h-3/4 rounded-lg">
                {isLoading
                    ? <div>
                        <h1>Загрузка...</h1>
                    </div>
                    : <div className="flex justify-center w-full">
                        {!showForm ? (
                            <div className={""}>
                                <div className="flex flex-col items-center justify-center h-4/5">
                                    <h1 className="text-2xl">Создайте свою историю</h1>
                                    <p className="mt-2">Нажмите на кнопку, чтобы начать</p>
                                </div>
                                <div className={"flex justify-center"}>
                                    <button className="bg-black text-white px-4 py-2 rounded" onClick={handleStart}>НАЧАТЬ
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <h1 className={"uppercase font-bold"}>Начало вашей истории</h1>
                                <textarea
                                    className={"border-2 mx-2 p-1 resize-none"}
                                    value={startOfStory} onChange={(e) => setStartOfStory(e.target.value)}

                                />

                                <br/>

                                <div className={"flex flex-col"}>
                                    <h1 className={"uppercase font-bold"}>Выберите жанры в которых хотите увидеть свою
                                        историю</h1>
                                    {genres.map(genre => (
                                        <div
                                            key={genre}
                                            onClick={() => handleGenreClick(genre)}
                                            className={`p-2 m-2 border-2 cursor-pointer ${selectedGenres.includes(genre) ? 'border-2 border-green-500' : ''}`}
                                        >
                                            {genre}
                                        </div>
                                    ))}
                                </div>

                                <button className="bg-[#53330a] text-white px-4 py-2 rounded" onClick={handleSubmit}>Начнем!</button>
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    );
}