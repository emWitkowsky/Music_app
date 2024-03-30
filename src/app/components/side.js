'use client';
import React, { useState } from 'react';
import SearchBar from './searchBar';
import styles from '../styles/items.module.scss';
import Link from 'next/link';
import { initialTracks } from './itemsContext';
import { useEffect } from 'react';
import axios from 'axios';
import { initialArtists } from './itemsContext';
import SearchBar2 from './searchBar2';



export default function Side({ sharedState, setSharedState }) {
    const [results, setResults] = useState(initialArtists);
    const [sortType, setSortType] = useState(null);
    const [originalResults, setOriginalResults] = useState([]);

    const handleSearch = (data) => {
        setResults(data);
    };

    useEffect(() => {
        axios.get('http://localhost:5003/artists')
            .then(response => {
                const dane = [...initialArtists, ...response.data];
                setResults(dane);
                setOriginalResults(dane);
                setSharedState(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const sortAlphabetically = () => {
        const sortedResults = [...originalResults].sort((a, b) => a.name.localeCompare(b.name));
        setResults(sortedResults);
        setSortType('alphabetically');
    };

    const sortByDate = () => {
        const sortedResults = [...originalResults].sort((a, b) => new Date(b.date) - new Date(a.date));
        setResults(sortedResults);
        setSortType('by date');
    };

    const sortByNumber = () => {
        const sortedResults = [...originalResults].sort((a, b) => b.views - a.views);
        setResults(sortedResults);
        setSortType('by number of views');
    };

    return (
        <div className={styles.content}>
            {/* <SearchBar onSearch={handleSearch} /> */}
            <div>
                <button onClick={sortAlphabetically} className={styles.btn}>Sort Alphabetically</button>
                <button onClick={sortByDate} className={styles.btn}>Sort by Date</button>
                <button onClick={sortByNumber} className={styles.btn}>Sort by Number of Views</button>
                {sortType && <p className={styles.info}>Sorted {sortType}</p>}
            </div>
            <div>
                <SearchBar2 list={results} onSearch={handleSearch} />
            </div>
            <div className={styles.main}>
                {results.map((result, index) => (
                    <Link key={index} href={`/artist/${encodeURIComponent(result.name)}`} className={styles.musicItems}>
                        <div className={styles.itemInside}>
                            <h2>{result.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}