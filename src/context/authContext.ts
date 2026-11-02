import { createContext, type Dispatch, type SetStateAction } from "react";
import type { IUserData } from "../interfaces/authinterface";

export interface AuthContextProvider {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  userData: IUserData | null;
  setUserData: Dispatch<SetStateAction<IUserData | null>>;
  logout: () => void;
 login: (token: string, user: IUserData) => void;
}

export const AuthContext = createContext<AuthContextProvider | null>(null);