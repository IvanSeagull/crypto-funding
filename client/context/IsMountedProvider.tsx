import React from 'react';

export const IsMountedContext = React.createContext({
  isMounted: false,
});

const IsMountedProvider = ({ children }: any) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return <IsMountedContext.Provider value={{ isMounted }}>{children}</IsMountedContext.Provider>;
};

export default IsMountedProvider;
