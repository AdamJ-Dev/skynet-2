import { matchesQuery } from '../../../../../lib/string/search';
import { consolidateProgrammes } from '../../../../utility/programmes/consolidate';
import { getLocation, hasLocation } from '../../../../utility/programmes/location';

export const getSearchMatches = (query, programmes, limit) => {
  const isTextMatch = (programme) => {
    const titleMatch = matchesQuery(query, programme.title);
    const locationMatch =
      hasLocation(programme) && matchesQuery(query, getLocation(programme).name);
    return titleMatch || locationMatch;
  };
  const textMatches = consolidateProgrammes(programmes).filter(isTextMatch);
  return textMatches.slice(0, limit);
};
