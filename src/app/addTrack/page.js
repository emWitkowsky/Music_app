'use client'
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { Genre } from '../components/itemsContext';
import { useState } from 'react';
import styles from './addTrack.module.scss';
import '../styles/global.scss';
import Link from 'next/link';

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Song name is required'),
    name: Yup.string()
        .required('Artist name is required'),
    popular: Yup.string()
        .oneOf(['True', 'False'], 'Must be True or False')
        .required('Required'),
    genre: Yup.string()
        .oneOf(Object.values(Genre), 'Invalid genre, insert one of POP/ROCK/RAP')
        .required('Required'),
});

const AddOrEditTrackForm = () => {
    const handleSubmit = async (values, action, { setSubmitting, resetForm }) => {
        try {
            let response;
            if (action === 'update') {
                response = await axios.put('http://localhost:5003/updateTrack', values);
            } else {
                response = await axios.post('http://localhost:5003/addTrack', values);
            }
            console.log(response.data);
            setSubmitting(false);
            resetForm();
        } catch (error) {
            console.error(error);
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.box}>
            <h1>Add or Edit Track</h1>
            <Formik
                initialValues={{ title: '', name: '', popular: '', genre: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, formikBag) => handleSubmit(values, 'add', formikBag)}
            >
                {({ handleSubmit, values, ...formikBag }) => (
                    <Form className={styles.formm}>
                        <label htmlFor="title">Title</label>
                        <Field id="title" name="title" placeholder="Boys Like Toys" />
                        <ErrorMessage name="title" component="div" />

                        <label htmlFor="name">Name</label>
                        <Field id="name" name="name" placeholder="BLANKA" />
                        <ErrorMessage name="name" component="div" />

                        <label htmlFor="popular">Popular</label>
                        <Field id="popular" name="popular" placeholder="True" />
                        <ErrorMessage name="popular" component="div" />

                        <label htmlFor="genre">Genre</label>
                        <Field id="genre" name="genre" placeholder="POP" />
                        <ErrorMessage name="genre" component="div" />

                        <button type="submit">Add</button>
                        <button type="button" onClick={() => handleSubmit(values, 'update', formikBag)}>Update</button>
                    </Form>
                )}
            </Formik>
            <div className={styles.btn2}>
                <Link href="/" className={styles.link}>Return to Home Page</Link>
            </div>
        </div>
    );
};

export default AddOrEditTrackForm;