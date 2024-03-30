import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../track.module.scss';

const ArtistTrack = ({ trackId }) => {
    const [artist, setArtist] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5003/artist/recorded/${trackId}`)
            .then(response => {
                setArtist(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [trackId]);

    if (!artist) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{artist.name}</h2>
            <div className={styles.btn2}>
                <Link href={`/artist/${artist.name}`} className={styles.link}>Visit Artist</Link>
            </div>
        </div>
    );
};

export default ArtistTrack;