import { supabase } from '../core/config';
import { AUTH_STATUS } from '../core/constants';

class AuthService {
  constructor() {
    this.supabase = supabase;
    this.user = null;
    this.status = AUTH_STATUS.LOADING;
    this.listeners = new Set();
    this.initializationComplete = false;

    this.initializationPromise = new Promise((resolve) => {
      this.resolveInitialization = resolve;
    });
  }

  _resolveInitPromiseOnce() {
    if (!this.initializationComplete) {
      this.initializationComplete = true;
      this.resolveInitialization();
    } else {
    }
  }

  async init() {
    this.supabase.auth.onAuthStateChange(
      async (event, session) => await this._onAuthStateChange(event, session)
    );

    return this.initializationPromise;
  }

  async _onAuthStateChange(event, session) {
    if (event === 'INITIAL_SESSION') {
      if (session) {
        await this._fetchAndMergeProfile(session.user);
      } else {
        this._updateAuthState(AUTH_STATUS.UNAUTHENTICATED, null);
      }
      this._resolveInitPromiseOnce();
    } else if (event === 'SIGNED_IN' && session) {
      this._fetchAndMergeProfile(session.user);
      this._resolveInitPromiseOnce();
    } else if (event === 'SIGNED_OUT') {
      this._updateAuthState(AUTH_STATUS.UNAUTHENTICATED, null);
      this._resolveInitPromiseOnce();
    } else if (event === 'USER_UPDATED') {
      if (this.user) {
        this._fetchAndMergeProfile(session.user);
      }
    }
  }

  async _fetchAndMergeProfile(authUser) {
    if (!authUser) {
      this._updateAuthState(AUTH_STATUS.UNAUTHENTICATED, null);
      return;
    }

    try {
      const { data: profileData, error: profileError } = await this.supabase
        .from('users')
        .select('role, username')
        .eq('id', authUser.id)
        .single();

      if (profileError) {
        if (profileError.code === 'PGRST116') {
          const partialUser = { ...authUser, role: 'client' };
          this._updateAuthState(AUTH_STATUS.AUTHENTICATED, partialUser);
          return;
        }
        throw profileError;
      }

      const mergedUser = { ...authUser, ...profileData };
      this._updateAuthState(AUTH_STATUS.AUTHENTICATED, mergedUser);
    } catch (error) {
      this._updateAuthState(AUTH_STATUS.UNAUTHENTICATED, null);
    }
  }

  _updateAuthState(status, user) {
    const oldStatus = this.status;
    const oldUser = this.user;

    if (
      status === oldStatus &&
      user?.id === oldUser?.id &&
      user?.role === oldUser?.role
    ) {
      return;
    }

    this.status = status;
    this.user = user;
    this._notifyListeners();
  }

  _notifyListeners() {
    const authData = { user: this.user, status: this.status };
    this.listeners.forEach((listener) => listener(authData));
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener({ user: this.user, status: this.status });
    return () => {
      this.listeners.delete(listener);
    };
  }

  async login(email, password) {
    const { error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    return { success: true };
  }

  async register(username, email, password) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
          email: email,
          role: 'client',
        },
      },
    });
    if (error) {
      throw error;
    }
    if (!data.session) {
    }
    return { success: true };
  }

  async logout() {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
    }
    return { success: true };
  }

  get currentUser() {
    return this.user;
  }

  get authStatus() {
    return this.status;
  }

  isUserAuthenticated() {
    return this.status === AUTH_STATUS.AUTHENTICATED;
  }

  isAdminOrModerator() {
    const role = this.user?.role;
    return (
      this.isUserAuthenticated() && (role === 'admin' || role === 'moderator')
    );
  }
}

export default AuthService;
