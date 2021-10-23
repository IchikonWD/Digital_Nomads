import React, { useEffect, useState } from 'react';
import { UserContext } from './Contexts/userContext';
import Main from '../src/Components/Main';
import Header from '../src/Components/Header';
import Footer from '../src/Components/Footer';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser({
      isLoggedIn: false,
    });
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <div className='App'>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Main />
        <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
