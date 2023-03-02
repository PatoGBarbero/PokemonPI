import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LandingPage from './componets/landingPage';
import Home from './componets/Home';
import CreatePokemon from './componets/CreatePokemon'
import Detail from './componets/Detail'




function App() {
  return (
   
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path= '/' element= {<LandingPage/>}/>
        <Route path= '/home' element= {<Home/>}/>
        <Route path= '/detail/:id' element= {<Detail/>}/>
        <Route path= '/create' element= {<CreatePokemon/>}/>
     </Routes>
      
    </div>
    </BrowserRouter>
  );
}

 export default App;
