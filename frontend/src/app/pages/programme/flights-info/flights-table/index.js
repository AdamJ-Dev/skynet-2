import { getFlightsUrl, getGetWeatherUrl } from '../../../../../config/api/selectors';
import useFetch from '../../../../hooks/useFetch';

import styles from './index.module.css';
import { useJourneyContext } from '../../../../context/journey/hook';
import { useEffect, useState } from 'react';
import { getFlightsInfoMissingMessage, getFlightsReadyMessage } from '../../../../../config/pages/selectors';
import { getGenericErrorMessage, getLoadingMessage } from '../../../../../config/messages/selectors';

const FlightsTable = ({ flightsLoading, flightsData, flightsError, destination }) => {
  const [tableMessage, setTableMessage] = useState(getFlightsInfoMissingMessage());
  const {
    departureAirport,
    arrivalAirport,
    departureDate,
    returnDate,
    error: journeyContextError,
    dispatch,
  } = useJourneyContext();
  const {
    loading: weatherLoading,
    data: weatherData,
    error: weatherError,
    get: getWeather,
  } = useFetch(getGetWeatherUrl({ lat: destination.lat, lon: destination.lon }));
  const { loading: flightsLoading, data: flightsData, error: flightsError, get: getFlights } = useFetch('');

  useEffect(() => {
    getWeather();
  }, []);

  useEffect(() => {
    const determineTableMessage = () => {
      if (journeyContextError) {
        setTableMessage(getGenericErrorMessage());
      } else {
        const gotEnoughInfo = !!departureAirport && !!arrivalAirport && !!departureDate;
        const waitingToGetFlights = !flightsLoading & !flightsData & !flightsError;
        if (!gotEnoughInfo) {
          setTableMessage(getFlightsInfoMissingMessage());
        } else if (gotEnoughInfo && waitingToGetFlights) {
          setTableMessage(getFlightsReadyMessage());
        } else if (flightsLoading) {
          setTableMessage(getLoadingMessage());
        } else if (flightsError) {
          setTableMessage(flightsError);
        }
      }
    };

    determineTableMessage();
  }, [departureAirport, arrivalAirport, departureDate, flightsLoading, flightsData, flightsError]);

  const handleGetFlights = async () => {
    await getFlights({
      url: getFlightsUrl(departureAirport.airportCode, arrivalAirport.airportCode, departureDate, returnDate),
    });
  };

  useEffect(() => {
    console.log(flightsData);
  }, [flightsData]);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.flightsTable}>
        <thead>
          <tr>
            <td>Departure Airport</td>
            <td>Arrival airport</td>
            <td>Departure Time</td>
            <td>Arrival Time</td>
            <td>Duration</td>
            <td>Price</td>
            <td>Number of Changes</td>
            <td>Weather on Arrival</td>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>
            </td>
            <td>Blah</td>
            <td>Blah</td>
            <td>Blah</td>
            <td>Blah</td>
            <td>Blah</td>
            <td>Blah</td>
            <td>
            </td>
          </tr> */}
        </tbody>
      </table>
      {!flightsData && (
        <div className={styles.tableMessage}>
          {tableMessage == getFlightsReadyMessage() ? (
            <button onClick={() => handleGetFlights()}>{tableMessage}</button>
          ) : (
            tableMessage
          )}
        </div>
      )}
    </div>
  );
};

export default FlightsTable;
