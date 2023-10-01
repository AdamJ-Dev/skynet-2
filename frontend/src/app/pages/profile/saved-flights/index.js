import { useEffect, useMemo } from 'react';
import FlightsTable from '../../../components/flights-table';
import useFetch from '../../../hooks/useFetch';
import { getWeatherUrlsMap } from '../../../utility/journey/parseFlights';
import { getNoSavedFlightsMessage } from '../../../../config/pages/selectors';
import styles from './index.module.css';
import { hasLength } from '../../../../lib/array/length';

const SavedFlights = ({ flights }) => {
  const {
    loading: weatherLoading,
    data: weatherData,
    getMany: getManyWeather,
  } = useFetch();

  const { airports, weatherUrls } = useMemo(() => {
    const weatherUrlsMap = getWeatherUrlsMap(flights);
    const airports = Object.keys(weatherUrlsMap);
    const weatherUrls = Object.values(weatherUrlsMap);
    return { airports, weatherUrls };
  }, [flights]);

  const weatherMap = useMemo(() => {
    const defaultWeatherList = Array(airports.length).fill([]);
    const weatherList = weatherData || defaultWeatherList;
    return airports.reduce(
      (weatherMap, airport, position) => ({
        ...weatherMap,
        [airport]: weatherList[position],
      }),
      {}
    );
  }, [airports, weatherData]);

  useEffect(() => {
    if (hasLength(weatherUrls)) {
      getManyWeather(weatherUrls);
    }
  }, [weatherUrls, getManyWeather]);

  return (
    <>
      <p>
        <strong>Your saved flights:</strong>
      </p>
      {hasLength(flights) ? (
        <div className={styles.tableContainer}>
          <FlightsTable
            flights={flights}
            actions={{ deletable: true }}
            weatherMap={weatherMap}
            weatherLoading={weatherLoading}
          />
        </div>
      ) : (
        getNoSavedFlightsMessage()
      )}
    </>
  );
};

export default SavedFlights;
