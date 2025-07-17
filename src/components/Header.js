import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { useEffect } from 'react';

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
        onAuthStateChanged(auth, (user) => {
            if (user) {
                
                const {uid, email, displayName}= user;
                dispatch(addUser({uid: uid, email: email, displayName: displayName}));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
            });
    },[]);


  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img className = "w-44" src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-01/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo"/>
        {user && <div className='flex p-5'>
          <img 
            className='w-8 h-8'
            alt='userIcon' 
            src='https://occ-0-2483-3646.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229'
          />
          <button onClick={handleSignOut} className='font-bold text-blue-900'>Sign Out</button>
        </div>}
    </div>
  )
}

export default Header