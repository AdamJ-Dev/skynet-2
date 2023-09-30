import { useMemo } from 'react';
import { getFlightsTableHeaders } from '../../../config/pages/selectors';
import { formatDuration } from '../../../lib/date/IsoDurations';
import { formatDate } from '../../../lib/date/formatDate';
import { useAuthContext } from '../../context/auth/hook';
import alternatingStyles from '../../styles/alternate.module.css';
import { getLoadingMessage } from '../../../config/messages/selectors';
import { getMassagedFlights } from './utils/getMassagedFlights';
import DeleteFlightButton from './delete-button';
import SaveFlightButton from './save-button';
import styles from './index.module.css';

const FlightsTable = ({ flights, actions, weatherMap, weatherLoading }) => {
  const { savable, deletable } = actions;

  const { user } = useAuthContext();

  const getRowSpanGrowth = (isReturn) => (isReturn ? 2 : 1);

  const massagedFlights = useMemo(
    () => getMassagedFlights(flights, weatherMap),
    [flights, weatherMap]
  );

  return (
    <>
      <table className={styles.flightsTable}>
        <thead>
          <tr>
            {getFlightsTableHeaders().map((header) => (
              <td key={header}>{header}</td>
            ))}
            {savable && user && <td>Save</td>}
            {deletable && user && <td>Remove</td>}
          </tr>
        </thead>
        <tbody>
          {massagedFlights.map((flight, index) => {
            const alternatingBackgrounds = [
              alternatingStyles.background1,
              alternatingStyles.background2,
            ];
            return [
              <tr className={alternatingBackgrounds[index % 2]} key={`outbound-${index}`}>
                <td>{flight.outbound.departureAirport}</td>
                <td>{flight.outbound.arrivalAirport}</td>
                <td>{formatDate(flight.outbound.initialDeparture)}</td>
                <td>{formatDate(flight.outbound.finalArrival)}</td>
                <td>{formatDuration(flight.outbound.timeSpentFlying)}</td>
                <td>{formatDuration(flight.outbound.totalDuration)}</td>
                <td>{flight.outbound.numChanges}</td>
                <td rowSpan={getRowSpanGrowth(flight.isReturn)}>&pound;{flight.price}</td>
                <td>
                  {weatherLoading
                    ? getLoadingMessage()
                    : flight.outbound.weather?.desc || 'N/A'}
                </td>
                {savable && user && (
                  <td
                    rowSpan={getRowSpanGrowth(flight.isReturn)}
                    className={styles.actionBtnContainer}
                  >
                    <SaveFlightButton
                      flight={flights[index]}
                      key={flights[index].flightId}
                    />
                  </td>
                )}
                {deletable && user && (
                  <td
                    rowSpan={getRowSpanGrowth(flight.isReturn)}
                    className={styles.actionBtnContainer}
                  >
                    <DeleteFlightButton
                      flightId={flights[index].flightId}
                      key={flights[index].flightId}
                    />
                  </td>
                )}
              </tr>,
              flight.isReturn && (
                <tr
                  className={alternatingBackgrounds[index % 2]}
                  key={`inbound-${index}`}
                >
                  <td>{flight.inbound.departureAirport}</td>
                  <td>{flight.inbound.arrivalAirport}</td>
                  <td>{formatDate(flight.inbound.initialDeparture)}</td>
                  <td>{formatDate(flight.inbound.finalArrival)}</td>
                  <td>{formatDuration(flight.inbound.timeSpentFlying)}</td>
                  <td>{formatDuration(flight.inbound.totalDuration)}</td>
                  <td>{flight.inbound.numChanges}</td>
                  <td>
                    {weatherLoading
                      ? getLoadingMessage()
                      : flight.inbound.weather?.desc || 'N/A'}
                  </td>
                </tr>
              ),
            ];
          })}
        </tbody>
      </table>
    </>
  );
};

export default FlightsTable;
