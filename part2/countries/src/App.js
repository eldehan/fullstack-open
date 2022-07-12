import { useState, useEffect } from "react";
import axios from "axios";

const Search = ({ searchInput, handleSearchInput }) => {
  return (
    <div>
      find countries
      <input value={searchInput} onChange={handleSearchInput} />
    </div>
  );
};

const Results = ({ countries }) => {
  if (Array.isArray(countries)) {
    if (countries.length > 1) {
      return (
        <div>
          {countries.map((country) => (
            <p key={country.name.official}>{country.name.common}</p>
          ))}
        </div>
      );
    } else if (countries.length === 1) {
      let country = countries[0];
      let languages = Object.values(country.languages);

      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>capital {country.capital[0]}</p>
          <p>area {country.area}</p>
          <h3>Languages:</h3>
          {languages.map((language) => (
            <p key={language}>{language}</p>
          ))}
        </div>
      );
    }
  } else {
    return <div></div>;
  }
};

const App = () => {
  const [searchInput, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  const handleSearchInput = (event) => {
    setSearch(event.target.value);
  };

  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      let results = response.data.filter((country) => {
        return country.name.common.includes(searchInput);
      });

      if (results.length > 10) {
        setCountries("Too many matches, specify another filter");
      } else {
        setCountries(results);
      }
    });
  };

  useEffect(hook, [searchInput]);

  return (
    <>
      <Search searchInput={searchInput} handleSearchInput={handleSearchInput} />
      <Results countries={countries} />
    </>
  );
};

export default App;
