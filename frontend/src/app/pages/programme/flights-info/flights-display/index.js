import { getFlightsUrl, getGetWeatherUrl } from '../../../../../config/api/selectors';
import useFetch from '../../../../hooks/useFetch';
import styles from './index.module.css';
import { useJourneyContext } from '../../../../context/journey/hook';
import { useEffect, useState } from 'react';
import { getLoadingMessage } from '../../../../../config/messages/selectors';
import { parseBreadcrumbs } from './utils/parseBreadcrumbs';
import {
  getGotFlightsMessage,
  getNoFlightsMessage,
} from '../../../../../config/pages/selectors';
import FlightsTable from '../../../../components/flights-table';

const FlightsDisplay = () => {
  const [tableBreadcrumbs, setTableBreadcrumbs] = useState([]);
  const {
    departureAirport,
    arrivalAirport,
    departureDate,
    returnDate,
    error: journeyContextError,
  } = useJourneyContext();
  const { loading: flightsLoading, data: flightsData, error: flightsError, get: getFlights, reset: resetFlights } = useFetch('');
  const [canGetFlights, setCanGetFlights] = useState(false);


  useEffect(() => {
    const gotEnoughInfo = !!departureAirport && !!arrivalAirport && !!departureDate;
    setCanGetFlights(gotEnoughInfo);
  }, [departureAirport, arrivalAirport, departureDate]);

  useEffect(() => {
    const determineTableBreadcrumbs = () => {
      let breadcrumbs = [
        <button onClick={() => handleGetFlights()} disabled={!canGetFlights}>
          GET FLIGHTS
        </button>,
      ];
      if (journeyContextError) {
        breadcrumbs.push(<span>{journeyContextError}</span>);
        return breadcrumbs;
      }

      if (flightsLoading) {
        breadcrumbs.push(<span>{getLoadingMessage()}</span>);
      } else if (flightsError) {
        breadcrumbs.push(<span>{flightsError}</span>);
      } else if (flightsData) {
        breadcrumbs.push(
          <span>{!!flightsData.length ? getGotFlightsMessage() : getNoFlightsMessage()}</span>
        );
      }
      return breadcrumbs;
    };

    setTableBreadcrumbs(determineTableBreadcrumbs());
  }, [
    departureAirport,
    arrivalAirport,
    departureDate,
    returnDate,
    flightsLoading,
    flightsData,
    flightsError,
    canGetFlights,
  ]);

  const handleGetFlights = async () => {
    resetFlights();
    await getFlights({
      url: getFlightsUrl(departureAirport.airportCode, arrivalAirport.airportCode, departureDate, returnDate),
    });
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableBreadcrumbs}>{parseBreadcrumbs(tableBreadcrumbs)}</div>
      {!!flightsData?.length && (
        <FlightsTable flights={flightsData} savable={true} deleteable={false} />
      )}
    </div>
  );
};

export default FlightsDisplay;
