import { BrowserRouter } from 'react-router-dom';
import Routers from './routers/Routers';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AuthActions } from './redux/slices/AuthSlice'; 
import './App.css';
import decode from 'jwt-decode';


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('profile'))?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        try {
          dispatch(AuthActions.logout())
        } catch (error) {
            console.log(error)
        }
      } else {
        try {
          dispatch(AuthActions.loginByToken())
        } catch (error) {
          console.log(error)
        }
      }
    }
  }, [])


  
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <BrowserRouter>
        <Routers/>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
