import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from '../services/auth';
import { setSession } from '../redux/authSlice';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const { data, error } = await signUp(email, password);
    if (error) {
      alert(error.message);
    } else {
      dispatch(setSession(data.session));
      navigate('/');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Sign Up</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <button style={{ width: '100%' }} onClick={handleSubmit}>Create account</button>
      <p>
        Have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default SignupPage; 