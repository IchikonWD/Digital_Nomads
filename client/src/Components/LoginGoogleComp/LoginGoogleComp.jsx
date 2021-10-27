import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';


const LoginGoogleComp = ({ history }) => {
  const { user, setUser } = useContext(UserContext);
  const [registerInfo, setRegisterInfo] = useState({});
  const [googleResponse, setGoogleResponse] = useState();
  const [responsedData, setResponsedData] = useState({});

  const clientId = process.env.REACT_APP_GOOGLE_CLIENTID;

  useEffect(() => {
    if (googleResponse === 'true') {
      async function fetchData() {
        if (registerInfo.name && registerInfo.email && registerInfo.password) {
          const { name, email, password } = registerInfo;
          try {
            const url = 'http://localhost:5000/api/users/';
            const res = await axios.post(url, {
              name: name,
              email: email,
              password: password,
            });
            if (res.data) {
              setUser({
                isLoggedIn: true,
                name: res.data.name,
                email: res.data.email,
                _id: res.data._id,
                token: res.data.token,
              });
              //Save user to localStorage
              localStorage.setItem(
                'user',
                JSON.stringify({
                  isLoggedIn: true,
                  name: res.data.name,
                  email: res.data.email,
                  _id: res.data._id,
                  token: res.data.token,
                })
              );
              setRegisterInfo({});
              history.push('/');
            }
          } catch (error) {
            console.log(error.response.data.message);
          }
        }
      }
      fetchData()
      setGoogleResponse({})
    }
  }, [googleResponse])

  function randomPass() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 9; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  const responseGoogle = (response) => {
    setResponsedData(response)
    const data = {
      name: response.profileObj.givenName,
      email: response.profileObj.email,
      password: randomPass(),
    };
    setRegisterInfo(data);
    setGoogleResponse("true")
  }

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Sign up with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
      style={{ marginTop: '100px' }}
      isSignedIn={true}
    />
  )
}

export default LoginGoogleComp;