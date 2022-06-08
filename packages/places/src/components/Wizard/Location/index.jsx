import React, { useState, useEffect } from 'react';
import './styles/wizard-location.scss';
import { usePlaceProvider } from '../../../context/place';

export function Location() {
  const { placeOptions, setPlaceOptions, setNextDisable } = usePlaceProvider();

  const [street, setStreet] = useState(placeOptions.address.street);
  const [city, setCity] = useState(placeOptions.address.city);
  const [state, setState] = useState(placeOptions.address.state);
  const [zipcode, setZipcode] = useState(placeOptions.address.zipcode);
  const [country, setCountry] = useState(placeOptions.address.country);
  const availableCountries = [
    { code: 'MX', value: 'México' },
    { code: 'CO', value: 'Colombia' },
    { code: 'CL', value: 'Chile' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlaceOptions({
      ...placeOptions,
      address: {
        street,
        city,
        state,
        zipcode,
        country,
      },
    });
    setNextDisable(false);
  };

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((response) => response.json())
      .then((data) => setCountry(data.country_code))
      .catch((error) => error && setCountry(availableCountries[0]));
  }, []);

  useEffect(() => {
    Object.keys(placeOptions.address).forEach((key) => {
      if (placeOptions.address[key] === '') {
        setNextDisable(true);
      }
    });
  }, [placeOptions]);

  return (
    <form className="wizard-location" onSubmit={handleSubmit}>
      <label className="wizard-location__field" htmlFor="street">
        <input
          id="street"
          type="text"
          placeholder="Calle"
          onChange={(e) => setStreet(e.target.value)}
          value={street}
          required
        />
      </label>
      <label className="wizard-location__field" htmlFor="City">
        <input
          id="City"
          type="text"
          placeholder="Ciudad"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          required
        />
      </label>
      <label className="wizard-location__field" htmlFor="state">
        <input
          id="state"
          type="text"
          placeholder="state"
          onChange={(e) => setState(e.target.value)}
          value={state}
          required
        />
      </label>
      <label className="wizard-location__field" htmlFor="zipcode">
        <input
          id="zipcode"
          type="text"
          placeholder="código postal"
          onChange={(e) => setZipcode(e.target.value)}
          value={zipcode}
          required
        />
      </label>
      <label className="wizard-location__field" htmlFor="country">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        >
          {availableCountries.map(({ code, value }) => (
            <option key={code} value={code}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <button className="wizard-location__button" type="submit">
        Está bien
      </button>
    </form>
  );
}

export default Location;
