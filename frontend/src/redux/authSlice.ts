import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session, User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
}

const initialState: AuthState = {
  user: null,
  session: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<Session | null>) {
      state.session = action.payload;
      state.user = action.payload?.user ?? null;
    },
    clearSession(state) {
      state.session = null;
      state.user = null;
    },
  },
});

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer; 