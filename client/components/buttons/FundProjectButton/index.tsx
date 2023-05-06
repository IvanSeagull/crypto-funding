import React from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { contractAbi, contractAddress } from '../../../constants/contractDetails';
import { ethers } from 'ethers';
import { ProjectPageProps } from '../../ProjectPage';

const FundProjectButton: React.FC<ProjectPageProps> = ({ projectId }) => {
  const [value, setValue] = React.useState('0');

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'fundProject',
    args: [projectId],
    overrides: {
      value: ethers.utils.parseEther(value || '0'),
    },
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const handleClick = () => {
    console.log('click');
    write?.();
  };

  return (
    <>
      <input type="number" onChange={(e) => setValue(e.target.value)} value={value} />
      <button
        disabled={isLoading}
        onClick={() => handleClick()}
        style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: 4 }}>
        Fund Project
      </button>
      {isSuccess && <p>Success</p>}
      {isLoading && <p>Loading</p>}
    </>
  );
};

export default FundProjectButton;
