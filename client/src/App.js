import React, { useEffect, useState } from 'react';
import { UserContext } from './Contexts/userContext';
import { DataContext } from './Contexts/dataContext';
import { CityContext } from './Contexts/cityContext';
import Main from '../src/Components/Main';
import Header from '../src/Components/Header';
import Footer from '../src/Components/Footer';

function App() {
  const [user, setUser] = useState({});
  const [city, setCity] = useState({});
  const [data, setData] = useState([]);


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
    const city = localStorage.getItem('city');
    if (city) {
      setCity(JSON.parse(city));
    }
  }, []);

  return (
    <div className='App'>
      <CityContext.Provider value={{ city, setCity }}>
        <UserContext.Provider value={{ user, setUser }}>
          <DataContext.Provider value={{ data, setData }}>
            <Header />
            <Main />
            <Footer />
          </DataContext.Provider>
        </UserContext.Provider>
      </CityContext.Provider>
    </div>
  );
}

export default App;
