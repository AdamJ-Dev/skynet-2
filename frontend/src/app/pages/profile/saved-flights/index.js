import { useEffect, useMemo, useState } from 'react';
import { getNoSavedFlightsMessage } from '../../../../config/pages/selectors';
import FlightsTable from '../../../components/flights-table';
import { useProfileContext } from '../../../context/profile/hook';
import useFetch from '../../../hooks/useFetch';
import { getWeatherUrlsMap } from '../../../utility/journey/parseFlights';
import styles from './index.module.css';

const SavedFlights = () => {
  const { userFlights } = useProfileContext();
  const {
    loading: weatherLoading,
    data: weatherData,
    getMany: getManyWeather,
  } = useFetch();

  const [airports, setAirports] = useState([]);

  const defaultWeatherWap = useMemo(() => {
    return airports.reduce(
      (weatherMap, airport) => ({ ...weatherMap, [airport]: [] }),
      {}
    );
  }, [airports]);

  const populatedWeatherMap = useMemo(() => {
    if (weatherData) {
      return airports.reduce(
        (weatherMap, airport, position) => ({
          ...weatherMap,
          [airport]: weatherData[position],
        }),
        {}
      );
    }
    return null;
  }, [weatherData, airports]);

  useEffect(() => {
    if (userFlights.length) {
      const urlsMap = getWeatherUrlsMap(userFlights);
      const airports = Object.keys(urlsMap);
      const urls = Object.values(urlsMap);
      setAirports(airports);
      getManyWeather(urls);
    }
  }, [userFlights]);

  return userFlights.length ? (
    <>
      {!!airports.length && (
        <div className={styles.tableContainer}>
          <FlightsTable
            flights={userFlights}
            actions={{ deletable: true }}
            weatherMap={populatedWeatherMap || defaultWeatherWap}
            weatherLoading={weatherLoading}
          />
        </div>
      )}
    </>
  ) : (
    getNoSavedFlightsMessage()
  );
};

export default SavedFlights;
