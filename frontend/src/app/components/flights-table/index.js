import { getFlightsTableHeaders } from '../../../config/pages/selectors';
import { formatDuration } from '../../../lib/IsoDurations';
import { formatDate } from '../../../lib/formatDate';
import { useAuthContext } from '../../context/auth/hook';
import { useWeatherContext } from '../../context/weather/hook';
import { getMassagedFlights } from './utils/getMassagedFlights';
import DeleteFlightButton from './delete-button';
import SaveFlightButton from './save-button';
import styles from './index.module.css';
import alternatingStyles from '../../styles/alternate.module.css';

const FlightsTable = ({ flights, savable, deletable }) => {
  const { user } = useAuthContext();
  const { weather } = useWeatherContext(); 

  return (
    <>
      <table className={styles.flightsTable}>
        <thead>
          <tr>
            {getFlightsTableHeaders().map((header) => (
              <td>{header}</td>
            ))}
            {savable && user && <td>Save</td>}
            {deletable && user && <td>Remove</td>}
          </tr>
        </thead>
        <tbody>
          {getMassagedFlights(flights, weather).map((flight, index) => {
            const alternatingBackgrounds = [alternatingStyles.background1, alternatingStyles.background2];
            return (
              <>
                <tr className={alternatingBackgrounds[index % 2]} key={`${index}-outbound`}>
                  <td>{flight.outbound.departureAirport}</td>
                  <td>{flight.outbound.arrivalAirport}</td>
                  <td>{formatDate(flight.outbound.initialDeparture)}</td>
                  <td>{formatDate(flight.outbound.finalArrival)}</td>
                  <td>{formatDuration(flight.outbound.timeSpentFlying)}</td>
                  <td>{formatDuration(flight.outbound.totalDuration)}</td>
                  <td>{flight.outbound.numChanges}</td>
                  {flight.isReturn ? (
                    <td rowSpan="2">&pound;{flight.price}</td>
                  ) : (
                    <td>&pound;{flight.price}</td>
                  )}
                  <td>{flight.outbound.weather?.desc || 'N/A'}</td>
                  {savable &&
                    user &&
                    (flight.isReturn ? (
                      <td rowSpan="2" className={styles.saveBtnContainer}>
                        <SaveFlightButton flight={flights[index]}/>
                      </td>
                    ) : (
                      <td className={styles.saveBtnContainer}>
                        <SaveFlightButton flight={flights[index]}/>
                      </td>
                    ))}
                  {deletable && (flight.isReturn ? (
                      <td rowSpan="2" className={styles.saveBtnContainer}>
                        <DeleteFlightButton flightId={flights[index].flightId}/>
                      </td>
                    ) : (
                      <td className={styles.saveBtnContainer}>
                        <DeleteFlightButton flightId={flights[index].flightId}/>
                      </td>
                    ))}
                </tr>
                {flight.isReturn && (
                  <tr className={alternatingBackgrounds[index % 2]} key={`${index}-inbound`}>
                    <td>{flight.inbound.departureAirport}</td>
                    <td>{flight.inbound.arrivalAirport}</td>
                    <td>{formatDate(flight.inbound.initialDeparture)}</td>
                    <td>{formatDate(flight.inbound.finalArrival)}</td>
                    <td>{formatDuration(flight.inbound.timeSpentFlying)}</td>
                    <td>{formatDuration(flight.inbound.totalDuration)}</td>
                    <td>{flight.inbound.numChanges}</td>
                    <td>{flight.inbound.weather?.desc || 'N/A'}</td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default FlightsTable;
