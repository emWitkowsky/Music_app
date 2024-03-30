import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
// import { Genre } from '../itemsContext';
import { useState } from 'react';
import styles from '../track.module.scss';

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Required'),
    name: Yup.string()
        .required('Required'),
    popular: Yup.string()
        .required('Required'),
    genre: Yup.string()
        .required('Required'),
});

const EditTrackForm = () => {
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            let response = await axios.put('http://localhost:5003/updateTrack', values);
            console.log(response.data);
            setSubmitting(false);
            resetForm();
        } catch (error) {
            console.error(error);
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.formm}>
            <h1>Edit Track</h1>
            <Formik
                initialValues={{ title: '', name: '', popular: '', genre: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className={styles.formm2}>
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
                    {/* <button type="button" onClick={() => handleSubmit(values, 'update', formikBag)}>Update</button> */}
                </Form>
            </Formik>
        </div>
    );
};

export default EditTrackForm;