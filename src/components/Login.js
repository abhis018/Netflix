import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValidData } from '../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';

const Login = () => {
    const [isSignInForm, setSignInForm] = useState();
    const [errorMessage, setErrorMessage] = useState(null);
    const  toggleSignInForm = () => {
        setSignInForm(!isSignInForm);
    }

    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        const message = checkValidData(email.current.value, password.current.value);
    
        setErrorMessage(message);

        if(message) return;

        if(!isSignInForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage)
            });
        } else{
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage)
                });
        }
    }

  return (
    <div>
        <Header/>
        <div>
            <img className="absolute" src='https://assets.nflxext.com/ffe/siteui/vlv3/05e91faa-6f6d-4325-934e-5418dcc2567b/web/IN-en-20250630-TRIFECTA-perspective_159086b1-425f-435b-bcd5-1ed8039cdef9_large.jpg' alt='background'/>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
            <h1 className='font-bold text-3xl py-4'>
                {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignInForm && (<input type='text' placeholder='Full Name' className='py-2 m-2 w-full bg-gray-700'/>)}
            <input ref={email} type='text' placeholder='Email Address' className='py-2 m-2 w-full bg-gray-700'/>
            <input ref={password} type='password' placeholder='Password' className='py-2 m-2 w-full bg-gray-700'/>
            {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
            <button className='py-2 m-2 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>
                {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p  className="cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to the Netflix? Sign Up" : "Already Registered. Sign In"}</p>
        </form>
    </div>
  )
}

export default Login