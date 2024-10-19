import { createContext, useReducer } from "react";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
const FakeAuthContext = createContext();
const intialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logOut":
      return { ...state, user: null, isAuthenticated: false };
  }
}
function FakeAuthContextProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    intialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logOut() {
    dispatch({ type: "logOut" });
  }
  return (
    <FakeAuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logOut,
      }}
    >
      {children}
    </FakeAuthContext.Provider>
  );
}

export { FakeAuthContextProvider, FakeAuthContext };
