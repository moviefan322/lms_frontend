export interface AuthState {
    loading: boolean;
    email: string | null;
    name: string | null;
    token: string | null;
    error: string | null;
    success: boolean;
    isLoggedIn: boolean;
    isNewData: boolean;
  }
  