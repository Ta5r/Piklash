import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Test from './pages/Test';
// import AddImage from './pages/AddImage'

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<Home />} />  
    <Route  path="/login" element={<Signin />} />  
    <Route  path="/test" element={<Test />} />  
    <Route path="/register" element={<Register />} />  
    <Route path="/profile" element={<Profile />} />  
    {/* <Route path="/add-img" element={<AddImage />} />   */}
    </Routes>
   </BrowserRouter>
  );
}

export default App;
