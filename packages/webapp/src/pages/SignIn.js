/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import axios from 'axios';
import { withFormik, Field, Form} from 'formik';
import '../styles/SignIn.style.css';

function SignIn(props) {
    const {
        isSubmitting,
        isValid
    } = props;
    return(
        <>
        <div className="login-box">
            <h1>Login Here</h1>
            <Form>
                <label>Email</label>
                <Field
                    name="email"
                    type="email"
                    className="email"
                />
                <label>Password</label>
                <Field
                    name="password"
                    type="password"
                    className="password"
                />
                <button
                    disabled={isSubmitting || !isValid}
                    type="submit"
                    className="submit"
                >Submit</button>
            </Form>
                <a href="#">Don't have an account?</a>
        </div>
        </>
    )
}

export default withFormik({
    mapPropsToValues(props) {
        return {
            email: '',
            password: ''
        };
    },
    validate(values) {

    },
     handleSubmit(values, formikBag) {
        formikBag.setSubmitting(false);
        console.log(values);
       axios.post(
        'http://localhost:3000/user/login',
        values
        )
        .then(res => {
             console.log(res);
        })
        .catch(e => {
            console.log(e);
        })
    }
})(SignIn);