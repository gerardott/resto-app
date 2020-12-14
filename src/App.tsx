import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { auth, createUserProfileDocument } from './services/firebase';
import './App.css';
import Main from './pages/Main';
import LoginPage from './pages/LoginPage';
import { User } from './models/User';

const initUser: User = {
  uid: null,
  email: null,
  displayName: ''
}

function App() {
  const [currentUser, setCurrentUser] = useState<any>(initUser);
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);

  React.useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log({userAuth});
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth, null);

        userRef.onSnapshot(snapShot => {
          const data = snapShot.data();
          setCurrentUser({uid: snapShot.id, ...data});
        });
        setShouldRedirect(false);
      }
      else {
        setShouldRedirect(true);
      }
      setCurrentUser(userAuth);
    });
    return () => {
      unsubscribeFromAuth();
    }
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/signup" name="SignUp" component={LoginPage} />
        {shouldRedirect && <Redirect to="/signup" />}
        <Route exact path="/" name="Main" render={() => <Main currenUser={currentUser} />} />
      </Switch>
    </Router>
  );
}

export default App;
