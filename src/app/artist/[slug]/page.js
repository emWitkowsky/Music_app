'use client';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './artist.module.scss';
import Link from 'next/link';
import '../../styles/global.scss';




export default function Page({ params }) {
    const [artist, setArtist] = useState(null);
    const [catImage, setCatImage] = useState(null);

    // useEffect(() => {
    //     if (params.slug) {
    //         axios.get(`http://localhost:5003/track/${params.slug}`)
    //             .then(response => {
    //                 setArtist(response.data);
    //                 // console.log(response.data)
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching track:', error);
    //         });
    //     }
    // }, [params.slug]);

    useEffect(() => {
        if (params.slug) {
            axios.get(`http://localhost:5003/track/${params.slug}`)
                .then(response => {
                    setArtist(response.data);
                })
                .catch(error => {
                    console.error('Error fetching track:', error);
            });
        }

        axios.get('https://api.thecatapi.com/v1/images/search')
            .then(response => {
                setCatImage(response.data[0].url);
            })
            .catch(error => {
                console.error('Error fetching cat image:', error);
            });
    }, [params.slug]);

    if (!artist) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className={styles.artistPage}>
            <div>
                <div>
                    {catImage && <img src={catImage} alt="Cat" className={styles.cat}/>}
                    <h1>Artist: {decodeURIComponent(params.slug)}</h1>
                </div>
            </div>
            <div className={styles.btn2}>
                <Link href="/" className={styles.link}>Go to Home Page</Link>
            </div>
        </div>
    );
}