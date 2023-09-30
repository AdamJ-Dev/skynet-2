import { ensureUniqueTitles } from './ensureUniqueTitles';

export const getSearchMatches = (query, programmes, limit) => {
  const textMatchingProgrammes = programmes.filter(
    (programme) =>
      programme.title.toLowerCase().includes(query.toLowerCase()) ||
      programme.location?.name.toLowerCase().includes(query.toLowerCase())
  );
  return ensureUniqueTitles(textMatchingProgrammes).slice(0, limit);
};
