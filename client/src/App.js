import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Register from './pages/Register';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<Home />} />  
    <Route  path="/login" element={<Signin />} />  
     <Route path="/register" element={<Register />} />  
    </Routes>
   </BrowserRouter>
  );
}

export default App;
