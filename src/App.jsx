import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider } from "./Contexts/CitiesContext";
import { FakeAuthContextProvider } from "./Contexts/FakeAuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";

import CityList from "./Componets/CityList";
import CountryList from "./Componets/CountryList";
import City from "./Componets/City";
import Form from "./Componets/Form";
import SpinnerFullPage from "./Componets/SpinnerFullPage";

const HomePage = lazy(() => import("./Pages/HomePage"));
const Product = lazy(() => import("./Pages/Product"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const Login = lazy(() => import("./Pages/Login"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));

// import HomePage from "./Pages/HomePage";
// import Product from "./Pages/Product";
// import NotFound from "./Pages/NotFound";
// import Pricing from "./Pages/Pricing";
// import AppLayout from "./Pages/AppLayout";
// import Login from "./Pages/Login";

function App() {
  return (
    <CitiesProvider>
      <FakeAuthContextProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </FakeAuthContextProvider>
    </CitiesProvider>
  );
}

export default App;
