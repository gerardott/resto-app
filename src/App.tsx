import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { auth, createUserProfileDocument } from './services/firebase';
import './App.css';
import Main from './pages/Main';
import LoginPage from './pages/LoginPage';

function App() {
  const [currentUser, setCurrentUser] = useState<any>();
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);

  React.useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth, null);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({id: snapShot.id, ...snapShot.data()});
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
        <Route path="/signup" name="SignUp" component={LoginPage} />
        {shouldRedirect && <Redirect to="/signup" />}
        <Route path="/" name="Main" render={() => <Main />} />
      </Switch>
    </Router>
  );
}

export default App;
