export const getLocation = (programme) => {
  return programme.locations[0]; // much to my chagrin; at least it's abstracted away...
};

export const hasLocation = (programme) => {
  return !!programme.locations.length; // related;
};
