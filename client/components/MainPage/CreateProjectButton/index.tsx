import React from 'react';
import { contractAbi, contractAddress } from '../../../constants/contractDetails';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';

const CreateProjectButton = () => {
  const addRecentTransaction = useAddRecentTransaction();
  const [projectName, setProjectName] = React.useState('');
  const [projectDescription, setProjectDescription] = React.useState('');

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'createProject',
    args: [projectName, projectDescription],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const handleClick = async () => {
    console.log('click');
    write?.();
  };

  React.useEffect(() => {
    if (data) {
      addRecentTransaction({
        description: `Create Project: ${projectName}`,
        hash: data.hash,
      });
    }
  }, [data]);
  return (
    <div>
      <input
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <textarea
        placeholder="Project Description"
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
      />
      <button
        onClick={() => handleClick()}
        style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: 4 }}>
        CreateProjectButton
      </button>
      <div>Transaction: {JSON.stringify(data)}</div>
      {isLoading && <h1>Loading</h1>}
      {isSuccess && <h1>Success</h1>}
    </div>
  );
};

export default CreateProjectButton;
