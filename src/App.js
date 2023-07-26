import { BrowserRouter } from 'react-router-dom';
import Routers from './routers/Routers';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AuthActions } from './redux/slices/AuthSlice'; 
import { getAllPlaces } from './redux/actions/PlaceActions';
import { getAllBookings } from './redux/actions/BookingActions';
import './App.css';


function App() {
  const dispatch = useDispatch()



  useEffect(() => {
    try {
      dispatch(AuthActions.loginByToken())
      // dispatch(getAllPlaces())
      // dispatch(getAllBookings())
    } catch (error) {
      console.log(error)
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
