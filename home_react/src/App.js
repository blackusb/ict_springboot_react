import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import JoinsForm from './pages/JoinsForm';
import JoinsEdit from './pages/JoinsEdit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/joinsForm" element={<JoinsForm/>}></Route>
          <Route path="/joinsEdit" element={<JoinsEdit/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
