import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home'
import CityList from './pages/CityList'
import News from './pages/News'
import Index from './pages/Index'
import HouseList from './pages/HouseList'
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />}></Route>
        <Route path='/home' element={<Home/>}>
          <Route path='' element={<Index/>}></Route>
          <Route path='houseList' element={<HouseList/>}></Route>
          <Route path='news' element={<News/>}></Route>
          <Route path='profile' element={<Profile/>}></Route>
        </Route>
        <Route path='/citylist' element={<CityList/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
