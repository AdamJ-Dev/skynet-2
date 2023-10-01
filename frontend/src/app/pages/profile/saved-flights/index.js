import { useEffect, useMemo } from 'react';
import FlightsTable from '../../../components/flights-table';
import useFetch from '../../../hooks/use-fetch';
import { getWeatherUrlsMap } from '../../../utility/journey/parse-flights';
import { getNoSavedFlightsMessage } from '../../../../config/pages/selectors';
import { hasLength } from '../../../../lib/array/length';
import styles from './index.module.css';

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
