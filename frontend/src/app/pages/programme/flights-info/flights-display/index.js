import { getFlightsUrl, getGetWeatherUrl } from '../../../../../config/api/selectors';
import useFetch from '../../../../hooks/useFetch';
import styles from './index.module.css';
import { useJourneyContext } from '../../../../context/journey/hook';
import { useEffect, useState } from 'react';
import { getLoadingMessage } from '../../../../../config/messages/selectors';
import { parseBreadcrumbs } from './utils/parseBreadcrumbs';
import {
  getGetFlightsEnticement,
  getGotFlightsMessage,
  getNoFlightsMessage,
} from '../../../../../config/pages/selectors';
import FlightsTable from '../../../../components/flights-table';
import LoadingText from '../../../../components/loading-text';

const FlightsDisplay = () => {
  const {
    loading: flightsLoading,
    data: flightsData,
    error: flightsError,
    get: getFlights,
    reset: resetFlights,
  } = useFetch();
  const {
    departureAirport,
    arrivalAirport,
    departureDate,
    returnDate,
    arrivalLoading,
    arrivalWeather,
    departureWeather,
    weatherLoading,
    error: journeyContextError,
  } = useJourneyContext();

  const [canGetFlights, setCanGetFlights] = useState(false);
  const [message, setMessage] = useState('');

  const handleGetFlights = async () => {
    resetFlights();
    await getFlights({
      url: getFlightsUrl(departureAirport.airportCode, arrivalAirport.airportCode, departureDate, returnDate),
    });
  };

  useEffect(() => {
    const gotEnoughInfo = !!departureAirport && !!arrivalAirport && !!departureDate;
    setCanGetFlights(gotEnoughInfo);
  }, [departureAirport, arrivalAirport, departureDate]);

  useEffect(() => {
    const getMessage = () => {
      if (journeyContextError) {
        return journeyContextError;
      }
      if (flightsLoading) {
        return getLoadingMessage();
      } else if (flightsError) {
        return flightsError;
      } else if (flightsData) {
        return flightsData.length ? getGotFlightsMessage() : getNoFlightsMessage();
      }
      return '';
    };
    setMessage(getMessage());
  }, [
    departureAirport,
    arrivalAirport,
    departureDate,
    returnDate,
    journeyContextError,
    flightsLoading,
    flightsData,
    flightsError,
    canGetFlights,
  ]);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeading}>
        <button onClick={() => handleGetFlights()} disabled={!canGetFlights}>
          {arrivalLoading || flightsLoading ? (
            <LoadingText text={getGetFlightsEnticement()} vibrant={flightsLoading} />
          ) : (
            getGetFlightsEnticement()
          )}
        </button>
        {message && (
          <>
            &nbsp;-&gt;&nbsp;<span>{message}</span>
          </>
        )}
      </div>
      {!!flightsData?.length && (
        <FlightsTable
          flights={flightsData}
          actions={{ savable: true }}
          weatherMap={{ [arrivalAirport.airportCode]: arrivalWeather, [departureAirport.airportCode]: departureWeather }}
          weatherLoading={weatherLoading}
        />
      )}
    </div>
  );
};

export default FlightsDisplay;
