
import React from 'react';
import { navigate } from '@reach/router';
import { signin } from './api';
import { useSetUser } from './context';

function SigninForm() {

  const setUser = useSetUser();

  async function handleSignin({ email, password }) {
    try {
      const user = await signin({ email, password });
      setUser(user);
      navigate('/');
    } catch (e) {
      alert(e);
    }
  }


  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        const elem = e.target.elements
        const email = elem.email.value;
        const password = elem.password.value;
        handleSignin({ email, password });
      }}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>
        <div>
          <button>submit</button>
        </div>
      </form>
    </div >
  )
}

export default SigninForm