import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { useEffect } from 'react';
import { LOGO } from '../utils/constant';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth).then(() => {})
    .catch((error) => {
       navigate("/error");
    });
  }

   useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                
                const {uid, email, displayName}= user;
                dispatch(addUser({uid: uid, email: email, displayName: displayName}));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
            });
            return () => unsubscribe();

    },[]);

    const handleGptSearchClick = () => {
      
    }



  return (
    <div className='absolute top-0 left-0 w-full px-8 py-2 bg-gradient-to-b from-black z-[60] flex justify-between items-center overflow-hidden'>
        <img className = "w-28" src={LOGO} alt="logo"/>
        {user && <div className='flex p-5'>
          <button className='px-2 bg-purple-800 rounded-lg mx-2' 
            onClick={handleGptSearchClick}>
            GPT Search
          </button>
          <img 
            className='w-8 h-8 rounded-lg'
            alt='userIcon' 
            src='https://occ-0-2483-3646.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229'
          />
          <button onClick={handleSignOut} className='font-bold text-blue-900 relative z-50'>Sign Out</button>
        </div>}
    </div>
  )
}

export default Header