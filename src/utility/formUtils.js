export const getModifiedFields = (original, current) => {
  const modified = {};

  Object.keys(current).forEach((key) => {
    if (current[key] !== original[key]) {
      modified[key] = current[key];
    }
  });

  return modified;
};
