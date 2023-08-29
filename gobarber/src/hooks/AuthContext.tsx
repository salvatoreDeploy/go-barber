import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
import api from "../services/api";
import AsyncStorage from "@react-native-community/async-storage";

interface AuthState {
  token: string;
  user: object;
}

interface SingInCredentials {
  email: string;
  password: string;
}

interface AuthContextState {
  user: object;
  signIn(credentials: SingInCredentials): Promise<void>;
  signOut(): void;
  loading: boolean;
}

interface AuthProviderState {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextState>(
  {} as AuthContextState
);

export function AuthProvider({ children }: AuthProviderState) {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        "@GoBarber:token",
        "@GoBarber:user",
      ]);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }: SingInCredentials) => {
    //console.log("SignIn");

    const response = await api.post("/", { email, password });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ["@GoBarber:token", token],
      ["@GoBarber:user", JSON.stringify(user)],
    ]);

    setData({ token, user });

    //console.log(response.data);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(["@GoBarber:token", "@GoBarber:user"]);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
