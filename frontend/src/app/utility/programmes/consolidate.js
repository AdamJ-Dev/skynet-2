import { deduplicate } from '../../../lib/obj/deduplicate';
import { omitFromAll } from '../../../lib/obj/omit';

export const consolidateProgrammes = (programmes) => {
  const modAirTimes = omitFromAll(programmes, ['since', 'till']);
  const uniques = deduplicate(modAirTimes, 'title');
  return uniques;
};
