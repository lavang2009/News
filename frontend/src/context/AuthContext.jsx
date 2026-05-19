import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { api } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [ready, setReady] = useState(false);

  const reload = async () => {
    const data = await api.get('/auth/me');
    setUser(data.user);
    setBookmarks(data.bookmarks || []);
    return data;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          await reload();
        } else {
          setUser(null);
          setBookmarks([]);
        }
      } catch {
        setUser(null);
        setBookmarks([]);
      } finally {
        setReady(true);
      }
    });

    const handleBookmarks = () => {
      if (auth.currentUser) {
        reload().catch(() => {});
      }
    };

    window.addEventListener('hmong:bookmarks-changed', handleBookmarks);
    return () => {
      unsubscribe();
      window.removeEventListener('hmong:bookmarks-changed', handleBookmarks);
    };
  }, []);

  const login = async ({ email, password }) => {
    const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
    if (credential.user?.displayName) {
      await updateProfile(credential.user, {
        displayName: credential.user.displayName
      });
    }
    await reload();
    return credential;
  };

  const register = async ({ name, email, password }) => {
    const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    await updateProfile(credential.user, {
      displayName: name.trim(),
      photoURL: '/images/default-avatar.svg'
    });
    await api.patch('/auth/profile', {
      name: name.trim(),
      avatar: '/images/default-avatar.svg'
    });
    await reload();
    return credential;
  };

  const googleLogin = async () => {
    const credential = await signInWithPopup(auth, googleProvider);
    await api.patch('/auth/profile', {
      name: credential.user?.displayName || 'Bạn đọc Google',
      avatar: credential.user?.photoURL || '/images/default-avatar.svg'
    }).catch(() => {});
    await reload();
    return credential;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setBookmarks([]);
  };

  const resetPassword = async (email) => {
    const safeEmail = String(email || '').trim();
    if (!safeEmail) throw new Error('Vui lòng nhập email trước khi đặt lại mật khẩu.');
    return sendPasswordResetEmail(auth, safeEmail);
  };

  const value = useMemo(() => ({
    user,
    bookmarks,
    ready,
    login,
    register,
    googleLogin,
    logout,
    resetPassword,
    reload,
    setUser,
    setBookmarks
  }), [user, bookmarks, ready, login, register, googleLogin, logout, resetPassword, reload]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
