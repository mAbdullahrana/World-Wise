import { useContext } from "react";
import { CitiesContext } from "../Contexts/CitiesContext";

function useCitiesContext() {
  const context = useContext(CitiesContext);

  if (!context) throw new Error("Context used outside the providers");
  return context;
}

export { useCitiesContext };
