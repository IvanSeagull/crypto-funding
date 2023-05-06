import React from 'react';
import { contractAbi, contractAddress } from '../../../constants/contractDetails';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { ProjectPageProps } from '../../ProjectPage';

const Withdraw: React.FC<ProjectPageProps> = ({ projectId }) => {
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'withdrawFunds',
    args: [projectId],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onError(error) {
      console.log('Error', error);
    },
  });

  const handleClick = () => {
    console.log('click');
    write?.();
  };
  return (
    <>
      <button
        disabled={isLoading}
        onClick={() => handleClick()}
        style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: 4 }}>
        GET MY MONE
      </button>
    </>
  );
};

export default Withdraw;
