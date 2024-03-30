'use client';
import {createContext, useContext} from "react";
import {useReducer} from "react";

export const MusicContext = createContext(null);
export const DispatchContext = createContext(null);

export function useMusics() {
    return useContext(MusicContext);
}
export function useMusicDispatch() {
    return useContext(DispatchContext);
}

//context provider
export function MusicProvider({children}) {

    const [Musics, dispatch] = useReducer(Reducer, initialTracks);

    return (
        <MusicContext.Provider value={Musics}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </MusicContext.Provider>
    )
}

export const ResultsContext = createContext();

export const Genre = {
    ROCK: "ROCK",
    POP: "POP",
    RAP: "RAP",
}


export const initialTracks = [
    {
        name: "Music from Store1",
        artist: "Taco Hemingway",
        genre: Genre.ROCK,
        id: 1,
        Popular: true,
        date: new Date(2023, 11, 1),
        views: 12492941,
    },
    {
        name: "Emem",
        artist: "Taco Hemingway",
        genre: Genre.POP,
        id: 2,
        Popular: true,
        date: new Date(2022, 11, 1),
        views: 4729420,
    },
    {
        name: "Most nad rzeka",
        artist: "Taco Hemingway",
        genre: Genre.RAP,
        id: 3,
        Popular: true,
        date: new Date(2023, 9, 7),
        views: 9174357372,
    },
]

export const initialArtists = [
    {
        name: "Imagine Dragons",
        id: 1,
        Popular: true,
        date: new Date(2010, 11, 1),
        views: 12492941,
    },
    {
        name: "sanah",
        id: 2,
        Popular: true,
        date: new Date(2013, 11, 1),
        views: 4729420,
    },
    {
        name: "Alan Walker",
        id: 3,
        Popular: true,
        date: new Date(2012, 9, 7),
        views: 9174357372,
    },
    {
        name: "Taco Hemingway",
        id: 4,
        Popular: true,
        date: new Date(2012, 9, 7),
        views: 9174357372,
    },
]

//reducer
export const Reducer = (state, action) => {
    switch (action.type) {
        case "ADD": {
            return [...state,
                {
                    name: action.payload.name,
                    artist: action.payload.artist,
                    genre: action.payload.genre,
                    popular: action.payload.popular,
                    date: action.payload.date,
                    views: action.payload.views,
                }
            ]
        }
        case 'MODIFY': {
            return state.map(music => {
                if (music.name === action.payload.name) {
                    return {
                        ...music,
                        artist: action.payload.artist,
                        genre: action.payload.genre,
                        popular: action.payload.popular,
                        date: action.payload.date,
                        views: action.payload.views,
                    }
                }
                return music;
            });
        }
        case 'DELETE': {
            return state.filter(music => music.name !== action.payload.name);
        }
        case 'SEARCH': {
            const search = action.payload;
            return state.filter(music => music.name.toLowerCase().includes(search.toLowerCase()))
        }
        default:
            return state;
    }
}