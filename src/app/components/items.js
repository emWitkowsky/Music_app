'use client';
import React, { useState } from 'react';
import SearchBar from './searchBar';
import styles from '../styles/items.module.scss';
import Link from 'next/link';
import { initialTracks } from './itemsContext';
import { useEffect } from 'react';
import axios from 'axios';
import { Genre } from './itemsContext';
import SearchBar2 from './searchBar2';

export default function Items({ sharedState, setSharedState }) {
    // const [results, setResults] = useState([]);
    const [results, setResults] = useState(initialTracks);
    const [imageUrl, setImageUrl] = useState(null);
    const [sortType, setSortType] = useState(null);
    const [isPopularChecked, setIsPopularChecked] = useState(false);
    const [selectedGenre, setselectedGenre] = useState('');

    const artists = Object.values(Genre);

    // zaciąganie danych z naszego store w pierwszej kolejności następuje w useState
    useEffect(() => {
        axios.get('http://localhost:5003/tracks')
            .then(response => {
                // setResults(response.data);
                const dane = [...initialTracks, ...response.data];
                setResults(dane);
            })
            .catch(error => {
                console.error('Error fetching tracks:', error);
            });
    }, []);

    const handleSearch = (data) => {
        setResults(data);
    };

    useEffect(() => {
        axios.get('https://api.thecatapi.com/v1/images/search')
            .then(response => {
                setImageUrl(response.data[0].url);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const handleCheckboxChange = () => {
        setIsPopularChecked(!isPopularChecked);
    };
    
    const handleDropdownChange = (event) => {
        setselectedGenre(event.target.value);
    };
    
    useEffect(() => {
        let filteredResults = [...results];
    
        if (isPopularChecked) {
            filteredResults = filteredResults.filter(result => result.popular === "True");
        }
    
        if (selectedGenre) {
            filteredResults = filteredResults.filter(result => result.genre === selectedGenre);
        }
    
        setResults(filteredResults);
    }, [isPopularChecked, selectedGenre]);

    const sortAlphabetically = () => {
        const sortedResults = [...results].sort((a, b) => a.name.localeCompare(b.name));
        setResults(sortedResults);
        setSortType('alphabetically');
    };

    const sortByDate = () => {
        const sortedResults = [...results].sort((a, b) => new Date(b.date) - new Date(a.date));
        setResults(sortedResults);
        setSortType('by date');
    };

    const sortByNumber = () => {
        const sortedResults = [...results].sort((a, b) => b.views - a.views);
        setResults(sortedResults);
        setSortType('by number of views');
    };

    return (
        <div className={styles.content}>
            <SearchBar onSearch={handleSearch} />
            <SearchBar2 list={results} onSearch={handleSearch}/>
            <div>
                <input type="checkbox" checked={isPopularChecked} onChange={handleCheckboxChange} className={styles.inp}/>
                <label>Popular</label>
                <select value={selectedGenre} onChange={handleDropdownChange} className={styles.dropdown}>
                    <option value="">Genres</option>
                    {artists.map((artist, index) => (
                        <option key={index} value={artist}>{artist}</option>
                    ))}
                </select>
            </div>
            <div>
                <button onClick={sortAlphabetically} className={styles.btn}>Sort Alphabetically</button>
                <button onClick={sortByDate} className={styles.btn}>Sort by Date</button>
                <button onClick={sortByNumber} className={styles.btn}>Sort by Number of Views</button>
                {sortType && <p className={styles.info}>Sorted {sortType}</p>}
            </div>
            <div className={styles.main}>
                {results.map((result, index) => (
                    <Link key={index} href={`/track/${encodeURIComponent(result.name)}`} className={styles.musicItems}>
                        <div className={styles.itemInside}>
                            <h2 className={styles.header}>{result.name}</h2>
                            <p className={styles.genre}>{result.genre}</p>
                            <img src={imageUrl} alt="Cat" className={styles.image}/>
                        </div>
                        {/* <p>{result.id}</p> */}
                    </Link>
                ))}
            </div>
        </div>
    );
}