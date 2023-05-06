import { useContext } from 'react';
import { IsMountedContext } from '../context/IsMountedProvider';

const useIsMounted = () => {
  return useContext(IsMountedContext);
};

export default useIsMounted;
