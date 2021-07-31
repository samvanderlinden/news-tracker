import { createContext } from "react";

export const AuthContext = createContext();

export const dummyAuthValue = {
  user: 'Sam',
  isLoggedIn: false
}