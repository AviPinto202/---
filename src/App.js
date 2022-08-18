import Home from './Pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Navbar from './components/Navbar';
import NotFoundPage from './Pages/404';
import MyPlans from './Pages/MyPlans';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/myplans/:id' element={<MyPlans />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div >



  );
}

export default App;
