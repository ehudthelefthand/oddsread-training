import React from 'react';
import { navigate } from '@reach/router';

import { signup } from './api';
import { useSetUser } from './context';

function SignupForm() {

  const setUser = useSetUser();

  async function handleSignup({ email, password, confirmPassword }) {
    if (password !== confirmPassword) {
      return alert('password and confirm password is not match');
    }
    try {
      const user = await signup({ email, password });
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
        const password = elem.password.value.trim();
        const confirmPassword = elem.confirmPassword.value.trim();
        handleSignup({ email, password, confirmPassword });
      }}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input id="confirmPassword" type="password" name="confirmPassword" required />
        </div>
        <div>
          <button>submit</button>
        </div>
      </form>
    </div >
  )
}

export default SignupForm