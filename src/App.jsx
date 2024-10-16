import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider } from "./Contexts/CitiesContext";

import HomePage from "./Pages/HomePage";
import Product from "./Pages/Product";
import NotFound from "./Pages/NotFound";
import Pricing from "./Pages/Pricing";
import AppLayout from "./Pages/AppLayout";
import Login from "./Pages/Login";
import CityList from "./Componets/CityList";
import CountryList from "./Componets/CountryList";
import City from "./Componets/City";
import Form from "./Componets/Form";

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
