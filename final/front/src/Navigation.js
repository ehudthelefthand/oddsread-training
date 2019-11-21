import React from 'react';
import { Link, navigate } from '@reach/router';
import { useUser, useSetUser } from './context';
import { signout } from './api';

function Navigation() {

  const user = useUser();
  const setUser = useSetUser();

  async function handleSignout() {
    try {
      await signout();
      setUser();
      navigate('/signin');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <nav>
      {
        user
          ? <>
            <Link to="/book">All Book | </Link>
            <Link to="/read">Read | </Link>
            <button onClick={() => handleSignout()}>Sign out</button>
          </>
          : <>
            <Link to="/signin">Sign in | </Link>
            <Link to="/signup">Sign up</Link>
          </>
      }
    </nav>
  )
}

export default Navigation;