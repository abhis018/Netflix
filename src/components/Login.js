import { useRef, useState } from 'react'
import Header from './Header';
import { checkValidData } from '../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constant';
import { BACK_URL } from '../utils/constant';


const Login = () => {
    const [isSignInForm, setSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const  toggleSignInForm = () => {
        setSignInForm(!isSignInForm);
    }

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null)

    const handleButtonClick = () => {
        const message = checkValidData(email.current.value, password.current.value);
    
        setErrorMessage(message);

        if(message) return;

        if(!isSignInForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name.current.value,
                    photoURL: {USER_AVATAR},
                    }).then(() => {
                         const {uid, email, displayName,photoURL}= auth.currentUser;
                            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
                    }).catch((error) => {
                        setErrorMessage(error.message);
                    });
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
        <div className="hidden sm:block">
            <img className="absolute w-full h-full object-cover" src={BACK_URL} alt='background'/>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className='absolute inset-0 mx-auto my-20 p-6 sm:p-10 md:p-12 w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 max-w-[500px] bg-black text-white rounded-lg bg-opacity-80'>
            <h1 className='font-bold text-2xl sm:text-3xl py-4'>
                {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignInForm && (<input ref={name} type='text' placeholder='Full Name' className='py-2 px-3 m-2 w-full bg-gray-700 rounded'/>)}
            <input ref={email} type='text' placeholder='Email Address' className='py-2 px-3 m-2 w-full bg-gray-700 rounded'/>
            <input ref={password} type='password' placeholder='Password' className='py-2 px-3 m-2 w-full bg-gray-700 rounded'/>
            {errorMessage && <p className='text-red-500 text-sm mx-2'>{errorMessage}</p>}
            <button className='py-2 m-2 bg-red-700 w-full rounded-lg hover:bg-red-600 transition' onClick={handleButtonClick}>
                {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p  className="ccursor-pointer text-sm text-gray-300 hover:underline mt-2 text-center" onClick={toggleSignInForm}>{isSignInForm ? "New to the Netflix? Sign Up" : "Already Registered. Sign In"}</p>
        </form>
    </div>
  )
}

export default Login