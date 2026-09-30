import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser =
      localStorage.getItem("shoply-user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "shoply-user",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem(
        "shoply-user"
      );
    }
  }, [user]);

  const register = (
    name,
    email,
    password
  ) => {
    const users =
      JSON.parse(
        localStorage.getItem(
          "shoply-users"
        )
      ) || [];

    const existingUser =
      users.find(
        (item) =>
          item.email === email
      );

    if (existingUser) {
      return {
        success: false,
        message:
          "Email already exists.",
      };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    localStorage.setItem(
      "shoply-users",
      JSON.stringify([
        ...users,
        newUser,
      ])
    );

    setUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });

    return {
      success: true,
    };
  };

  const login = (
    email,
    password
  ) => {
    const users =
      JSON.parse(
        localStorage.getItem(
          "shoply-users"
        )
      ) || [];

    const existingUser =
      users.find(
        (item) =>
          item.email === email &&
          item.password === password
      );

    if (!existingUser) {
      return {
        success: false,
        message:
          "Invalid email or password.",
      };
    }

    setUser({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    });

    return {
      success: true,
    };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;