import logo from './logo.svg';
import './App.css';

import { Routes ,Route } from 'react-router-dom';
import { BrowserRouter as Router} from "react-router-dom";
import Login from './Login';
import Home from './Home';
import Signup from './Signup';





function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="*" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;


// update(ref(db, "meet/"),{
//   messages:messages,
// }