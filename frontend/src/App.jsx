import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from './components/LoginPage'
import { HomePage } from './components/HomePage'


function App() {
  const [user, setUser] = useState({
    name: "prachi",
    email: "aman@gmail.com",
    role: "Manager"
  });

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element = { Object.keys(user).length === 0? <LoginPage setUser={setUser}/> :<HomePage user={user} setUser={setUser}/> } />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
