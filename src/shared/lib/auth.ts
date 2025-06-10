import { store } from '@/app/stores';
import { logout } from '@/entities/auth/model';
import { broadcast } from './broadcasts';
import { BROADCAST_TYPE } from '../types/broadcast';

export const handleUnauthorized = () => {
  store.dispatch(logout());
  broadcast.postMessage({ type: BROADCAST_TYPE.LOGOUT });
  window.location.href = '/login';
}; 

const LOCK_KEY = "refreshing";

export const refreshLock = {
  isLocked: () => localStorage.getItem(LOCK_KEY) === "true",
  lock: () => localStorage.setItem(LOCK_KEY, "true"),
  unlock: () => localStorage.removeItem(LOCK_KEY),
};