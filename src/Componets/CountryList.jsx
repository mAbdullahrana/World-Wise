import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import Message from "./Message";
import { useCitiesContext } from "../Hooks/useCitiesContext";

function CountryList() {
  const { isLoading, cities } = useCitiesContext();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the Map" />
    );

  const knownCountries = new Set();
  const countries = cities.flatMap(({ country, emoji }) => {
    if (!knownCountries.has(country)) {
      knownCountries.add(country);
      return [{ country, emoji }];
    } else return [];
  });
  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => (
        <CountryItem country={country} key={i} />
      ))}
    </ul>
  );
}

export default CountryList;




