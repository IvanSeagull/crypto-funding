import React from 'react';
import { useContractRead } from 'wagmi';
import { contractAbi, contractAddress } from '../../constants/contractDetails';
import { ethers } from 'ethers';

interface ProjectPageProps {
  projectId: string;
}

const GetProjectData: React.FC<ProjectPageProps> = ({ projectId }) => {
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getProjectDetails',
    watch: true,
    args: [projectId],
  });
  if (!data) {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      {/* @ts-ignore */}
      <h1>Project Name: {data[0]}</h1>
      {/* @ts-ignore */}
      <h2>Project Description: {data[1]}</h2>
      {/* @ts-ignore */}
      <h4>Project Balance: {ethers.utils.formatUnits(data[2] as string, 'ether')}</h4>
      {/* @ts-ignore */}
      <p>Project owner: {data[3]}</p>
    </div>
  );
};

export default GetProjectData;
