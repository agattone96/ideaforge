export const info = (...args: unknown[]): void => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.info(...args);
  }
};

export const error = (...args: unknown[]): void => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(...args);
  }
};
