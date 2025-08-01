import { useState, useRef, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constant';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className='absolute top-0 left-0 w-full px-8 py-2 bg-gradient-to-b z-[60] flex flex-col md:flex-row justify-between items-center overflow-hidden bg-black'>
      <img className="w-28" src={LOGO} alt="logo" />
      
      {user && (
        <div className='flex items-center space-x-4 relative'>
          {showGptSearch && (
            <div>
              <span className="text-xl hidden md:inline">🌐</span>
              <select className="rounded-lg bg-purple-800 border-none py-2" onChange={handleLanguageChange}>
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
                ))}
              </select>
            </div>
          )}

          <button className='px-2 py-2 bg-purple-800 rounded-lg mx-2' onClick={handleGptSearchClick}>
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <img
              className='md:w-10 rounded-lg cursor-pointer'
              alt='userIcon'
              src='https://occ-0-2483-3646.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229'
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-36 bg-purple-800 text-black rounded-md shadow-lg z-50">
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 font-semibold "
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
