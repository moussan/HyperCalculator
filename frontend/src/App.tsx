import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './redux/store';
import Calculator from './components/Calculator';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './components/ProtectedRoute';
import { supabase } from './services/auth';
import { setSession } from './redux/authSlice';

const Listener: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session));
    });
    return () => listener.subscription.unsubscribe();
  }, [dispatch]);
  return null;
};

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Listener />
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<ProtectedRoute><Calculator /></ProtectedRoute>} />
    </Routes>
  </BrowserRouter>
);

const App: React.FC = () => (
  <Provider store={store}>
    <AppRoutes />
  </Provider>
);

export default App; 