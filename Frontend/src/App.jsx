import './App.css'
import NotFound from './Pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import List from './Pages/List';
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import EditList from './Pages/EditList';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/list/detail/:id' element={<List />} />
      <Route path='/list/edit/:id' element={<EditList />} />
      <Route path='/addlist' element={<EditList />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App;
