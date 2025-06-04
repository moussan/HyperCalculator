import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '../services/auth';
import { setSession } from '../redux/authSlice';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const { data, error } = await signIn(email, password);
    if (error) {
      alert(error.message);
    } else {
      dispatch(setSession(data.session));
      navigate('/');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Login</h2>
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
      <button style={{ width: '100%' }} onClick={handleSubmit}>Login</button>
      <p>
        No account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default LoginPage; 