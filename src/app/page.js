'use client';
import React from "react";
import SearchBar from "./components/searchBar";
import Items from "./components/items";
import styles from "./styles/home.module.scss";
import "./styles/global.scss";
import LoginRegisterButtons from "./components/loginBar";
import { useState, useEffect } from "react";
import Side from "./components/side";
import axios from "axios";
import Link from "next/link";
// import SearchBar2 from "./searchBar2";
// import { ResultsContext } from './ResultsContext';

export default function Home() {
    const [state, setState] = useState("tracks");
    const [sharedState, setSharedState] = useState();

    return (
        <div className={styles.myDiv}>
            <div className={styles.navbar}>
                <h1 className={styles.myH1}>Music App</h1>
                <p>Music database</p>
                {/* <SearchBar /> */}
            </div>
            <div className={styles.loginBar}>
                <LoginRegisterButtons />
            </div>
            <div className={styles.addT}>
                <Link href="/addTrack" className={styles.btn}>Add Track</Link>
            </div>
            <div>
            </div>
            <div>
                <button onClick={() => setState(state === "artist" ? "tracks" : "artist")} className={styles.btn}>
                    {state === "artist" ? "Tracks" : "Artists"}
                </button>
                {state === "tracks" ? (
                    <Items className={styles.fullWidth} sharedState={sharedState} setSharedState={setSharedState} />
                    // <p>ok</p>
                ) : (
                    <div className={styles.main}>
                        <Side sharedState={sharedState} setSharedState={setSharedState}/>
                    </div>
                )}
                {state === "artist" ? (
                    <div className={styles.main}>
                        {/* <Side /> */}
                    </div>
                ) : null}
            </div>
        </div>
    );
}