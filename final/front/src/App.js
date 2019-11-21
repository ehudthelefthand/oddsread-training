import React from 'react';
import { Router } from '@reach/router';
import Navigation from './Navigation';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import Books from './Books';
import Reads from './Reads';
import { useUser } from './context';

function App() {

  return (
    <div>
      <Navigation />
      <Router>
        <SigninForm path="/signin" />
        <SignupForm path="/signup" />
        <Auth path="/">
          <Books path="/" default />
          <Reads path="/read" />
        </Auth>
      </Router>
    </div >
  );
}

function Auth({ children }) {
  const user = useUser();
  return (
    <>
      {user && children}
    </>
  );
}

export default App;
