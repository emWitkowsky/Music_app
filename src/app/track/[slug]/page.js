'use client';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TrackComments from './components/comments';
import PostCommentForm from './components/postComment';
import styles from './track.module.scss';
import ArtistTrack from './components/artistName';
import Link from 'next/link';
import EditTrackForm from './components/change';
import DeleteTrack from './components/del';
import { initialTracks } from '../../components/itemsContext';
import '../../styles/global.scss';
import { Reducer } from '../../components/itemsContext';




export default function Page({ params }) {
    // const router = useRouter();
    // const { name } = router.query;
    const [track, setTrack] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [marker, setMarker] = useState(null);
    // console.log(params.slug);

    useEffect(() => {
        const paramsSlug = decodeURIComponent(params.slug);
        // console.log('params.slug', paramsSlug);
        const trackFromInitialTracks = initialTracks.find(track => track.name === paramsSlug);

        // if (trackFromInitialTracks) {
        //     setTrack(trackFromInitialTracks);
        // }
        // if (params.slug) {
        //     axios.get(`http://localhost:5003/track/${params.slug}`)
        //         .then(response => {
        //             setTrack(response.data[0]);
        //         })
        //         .catch(error => {
        //             console.error('Error fetching track:', error);
        //     });
        // }
        if (trackFromInitialTracks) {
            setTrack(trackFromInitialTracks);
            setMarker('initialTracks');
        } else if (params.slug) {
            axios.get(`http://localhost:5003/track/${params.slug}`)
                .then(response => {
                    setTrack(response.data[0]);
                })
                .catch(error => {
                    console.error('Error fetching track:', error);
            });
        }

        axios.get('https://api.thecatapi.com/v1/images/search')
            .then(response => {
                setImageUrl(response.data[0].url);
            })
            .catch(error => {
                console.error('Error fetching image:', error);
            });
    }, [params.slug]);

    if (!track) {
        return <div>Loading...</div>;
    }
    

    return (
        <div className={styles.trackPage}>
                {imageUrl && <img src={imageUrl} alt="Cat" />}
            <div className={styles.title}>
                <div className={styles.header}>
                    <h1>Track: {decodeURIComponent(params.slug)}</h1>
                    <p>ID: {track.id}</p>
                    <p>Genre: {track.genre}</p>
                    <p>Popular: {track.popular}</p>
                    <p>Artist: {track.artist}</p>
                </div>
                {/* <div>
                    <ArtistTrack trackId={track.id}/>
                </div>
                <div className={styles.btn2}>
                    <Link href={`/artist/${track.artist}`} className={styles.link}>Visit Artist</Link>
                </div> */}
                <div>
                    {marker === 'initialTracks' ? (
                        <Link href={`/artist/${track.artist}`} className={styles.link}>Visit Artist</Link>
                    ) : (
                        <ArtistTrack trackId={track.id}/>
                    )}
                </div>
                <div>
                    <EditTrackForm/>
                </div>
                <div>
                    {marker === 'initialTracks' ? (
                        <button onClick={() => dispatch(deleteTrack(track.name))} className={styles.link}>Delete Track</button>
                    ) : (
                        <DeleteTrack trackId={track.id}/>
                    )}
                </div>
            </div>
            {/* <div>
                <TrackComments trackId={track.id} trakcName={params.slug}/>
            </div> */}
            <div className={styles.btn2}>
                <Link href="/" className={styles.link}>Return to Home Page</Link>
            </div>
        </div>
    );
}