'use client';
import React, { useState } from 'react';
import styles from '../styles/searchBar2.module.scss';

const SearchBar2 = ({ list, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        const filteredList = list.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
        onSearch(filteredList);
    };

    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleChange}
                className={styles.search}
            />
            <button onClick={handleSearch} className={styles.searchButton}>Search</button>
        </div>
    );
};

export default SearchBar2;