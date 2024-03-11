import { Routes, Route } from 'react-router-dom';
import Main from '../src/pages/Main'; 
import Login from '../src/pages/Login'; 
import Signup from './pages/Signup';
import BooksList from './components/BooksList';
import UserDash from './pages/UserDash';
import UserProfile from './components/UserProfile';

function App() {
  const routes = [
    {
      path: '/',
      element: <Main />
    },
    {
      path:'/login',
      element: <Main child={<Login />} />
    },
    {
      path:'/signup',
      element: <Main child={<Signup/>} />
    },
    {
      path:'/books',
      element: <Main child={<BooksList/>} />
    },
    {
      path:'/user',
      element: <UserDash/>
    },
    {
      path:'/profile',
      element:<UserDash child={<UserProfile />}/>
    },
    {
      path:'/books-available',
      element:<UserDash child={<BooksList/>}/>
    }
  ];
  
  return (
    <div className="App">
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
