import './App.css';
import {Route, Routes} from 'react-router-dom';
import HomePage from './Views/Home/HomePage';
import DetailPage from './Views/Detail/DetailPage';
import CreateRecipePage from './Views/Create/CreateRecipePage';
import LandingPage from './Views/Landing/LandingPage';
import ErrorPage from './Views/Error/ErrorPage';



function App() {
  return (
    <div className="App"> 
     <Routes>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/detail/:id' element={<DetailPage/>}/>
      <Route path='/create' element={<CreateRecipePage/>}/>
      <Route path='*' element={<ErrorPage/>}/>
      <Route path='/'element={<LandingPage/>}/> 
     </Routes>
    </div>
  );
}

export default App;