import React from 'react';
import { contractAbi, contractAddress } from '../../constants/contractDetails';
import { useContractRead } from 'wagmi';
import useIsMounted from '../../hooks/useIsMounted';
import Link from 'next/link';

const Projects = () => {
  const { isMounted } = useIsMounted();
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getAllProjects',
    watch: false,
  });

  if (!isMounted) {
    return null;
  }
  if (!data) {
    return <h1>Loading</h1>;
  }
  return (
    <div style={{ padding: 10 }}>
      <h1>Projects:</h1>
      {data.map((project: any) => {
        return (
          <Link key={Number(project.id)} href={`/projects/${project.id}`}>
            <div
              style={{
                border: '1px solid black',
                borderRadius: 8,
                marginBottom: 20,
                maxWidth: '50%',
                padding: 10,
                cursor: 'pointer',
              }}>
              <h1>{project.projectName}</h1>
              <h2>id: #{Number(project.id)}</h2>
              <h3>{project.project}</h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Projects;
