export const getProviderError = (contextType) => {
  return `${contextType}: use of context without wrapping provider.`;
};
