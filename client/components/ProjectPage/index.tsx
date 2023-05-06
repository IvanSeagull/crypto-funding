import React from 'react';
import useIsMounted from '../../hooks/useIsMounted';
import GetProjectData from '../GetProjectData';
import FundProjectButton from '../buttons/FundProjectButton';
import Withdraw from '../buttons/WithdrawButton';

export interface ProjectPageProps {
  projectId: string;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ projectId }) => {
  const { isMounted } = useIsMounted();

  if (!isMounted) return <h1>Loading</h1>;
  return (
    <div>
      <GetProjectData projectId={projectId} />
      <FundProjectButton projectId={projectId} />
      <Withdraw projectId={projectId} />
    </div>
  );
};

export default ProjectPage;
