import { mod } from '../../../../../lib/obj/mod';
import { matchesQuery } from '../../../../../lib/string/search';
import { getLocation, hasLocation } from '../../../../utility/programmes/location';

export const getSearchMatches = (query, programmes, limit) => {
  const programmesModTitle = mod(programmes, 'title');
  const isTextMatch = (programme) => {
    const titleMatch = matchesQuery(query, programme.title);
    const locationMatch =
      hasLocation(programme) && matchesQuery(query, getLocation(programme).name);
    return titleMatch || locationMatch;
  };
  const textMatches = programmesModTitle.filter(isTextMatch);
  return textMatches.slice(0, limit);
};
