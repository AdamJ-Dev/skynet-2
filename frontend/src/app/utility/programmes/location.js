import { hasLength } from "../../../lib/array/length";

export const getLocation = (programme) => {
  return programme.locations[0]; // much to my chagrin; at least it's abstracted away...
};

export const hasLocation = (programme) => {
  return hasLength(programme.locations); // related;
};
