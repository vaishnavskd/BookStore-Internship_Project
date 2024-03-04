import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import UserDash from './pages/UserDash';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/user' element={<UserDash/>}/>
      </Routes>
    </div>
  );
}

export default App;
