import React from 'react';
import axios from 'axios';

const DeleteTrack = ({ trackId }) => {
    const deleteTrack = () => {
        axios.delete(`http://localhost:5003/deleteTrack/${trackId}`)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <button onClick={deleteTrack}>Delete Track</button>
    );
};

export default DeleteTrack;