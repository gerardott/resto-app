import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { auth, createUserProfileDocument, createRestaurant } from './services/firebase';
import './App.css';
import Main from './pages/Main';
import LoginPage from './pages/LoginPage';
import { CurrentUserContext, RestaurantContext } from './services/Contexts';

function App() {
  const [currentUser, setCurrentUser] = useState<any>();
  const [restaurant, setRestaurant] = useState<any>();
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);

  React.useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        console.log(userAuth.toJSON());
        const userRef = await createUserProfileDocument(userAuth, null);

        userRef.onSnapshot(snapShot => {
          const data = snapShot.data();
          setCurrentUser({uid: snapShot.id, ...data});
        });
        setShouldRedirect(false);
        
        const restoRef = await createRestaurant(userAuth.uid);
        restoRef.onSnapshot(snapshot => {
          setRestaurant({id: snapshot.id, ...snapshot.data()});
        })
      }
      else {
        setShouldRedirect(true);
        setCurrentUser(userAuth);
      }
    });
    return () => {
      unsubscribeFromAuth();
    }
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <RestaurantContext.Provider value={restaurant}>
        <Router>
          <Switch>
            <Route exact path="/signup" name="SignUp" component={LoginPage} />
            {shouldRedirect && <Redirect to="/signup" />}
            <Route exact path="/" name="Main" render={() => <Main />} />
          </Switch>
        </Router>
      </RestaurantContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
