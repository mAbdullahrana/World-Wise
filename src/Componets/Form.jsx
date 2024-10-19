// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useReducer } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import useUrlPosition from "../Hooks/useUrlPosition";
import { useCitiesContext } from "../Hooks/useCitiesContext.jsx";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const flagemojiToPNG = (flag) => {
  // Convert flag emoji to corresponding country code
  const countryCode = [...flag]
    .map((char) =>
      String.fromCharCode(char.codePointAt() - 127397).toLowerCase()
    )
    .join("");

  // Return an image element with the country's flag
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const initialState = {
  cityName: "",
  country: "",
  date: new Date(),
  notes: "",
  emoji: "",
  error: "",
  isLoading: false,
  newCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "cityName":
      return {
        ...state,
        cityName: action.payLoad,
      };
    case "date":
      return {
        ...state,
        date: action.payLoad,
      };
    case "notes":
      return {
        ...state,
        notes: action.payLoad,
      };
    case "fetching":
      return {
        ...state,
        error: "",
        isLoading: true,
      };
    case "fetched":
      return {
        ...state,
        cityName: action.payLoad.city || action.payLoad.locality || "",
        emoji: convertToEmoji(action.payLoad.countryCode),
        country: action.payLoad.countryName,
      };
    case "error":
      return {
        ...state,
        error: action.payLoad,
      };
    case "loaded":
      return {
        ...state,
        isLoading: false,
      };

    default:
      throw new Error("Action Unknown");
  }
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [cityName, setCityName] = useState("");
  // const [country, setCountry] = useState("");
  // const [date, setDate] = useState(new Date());
  // const [notes, setNotes] = useState("");
  const { cityName, country, date, notes, emoji, error, isLoading } = state;
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading: loading } = useCitiesContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCity() {
      if (!lat && !lng) return;
      try {
        dispatch({
          type: "fetching",
        });
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (data.status === 402)
          throw new Error("Something Went Wrong In Fetching GeoCodes😥");
        if (!data.countryCode)
          throw new Error("No city found please click on city to mark it 😉");
        dispatch({
          type: "fetched",
          payLoad: data,
        });
      } catch (err) {
        dispatch({ type: "error", payLoad: err.message });
      } finally {
        dispatch({ type: "loaded" });
      }
    }

    fetchCity();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position: {
        lat,
        lng,
      },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (error) return <Message message={error} />;
  if (!lat && !lng) return <Message message={"Start by clicking on the map"} />;

  if (isLoading) return <Spinner />;

  return (
    <form
      className={`${styles.form} ${loading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) =>
            dispatch({ type: "cityName", payLoad: e.target.value })
          }
          value={cityName}
        />
        <span className={styles.flag}>{flagemojiToPNG(emoji)}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          
          onChange={(e) => dispatch({ type: "date", payLoad: e.target.value })}
          value={date}
        /> */}
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => dispatch({ type: "date", payLoad: date })}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => dispatch({ type: "notes", payLoad: e.target.value })}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
