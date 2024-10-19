import { useContext } from "react";
import { FakeAuthContext } from "../Contexts/FakeAuthContext";

function useFakeAuthContext() {
  const value = useContext(FakeAuthContext);
  if (value === undefined)
    throw new Error(
      "Used FakeAuthContext outside of Provider. The context can only be used in children of the Provider"
    );
  return value;
}

export { useFakeAuthContext };
