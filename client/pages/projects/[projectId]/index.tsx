import { useRouter } from 'next/router';
import React from 'react';

import ProjectPage from '../../../components/ProjectPage';

const ProjectId = () => {
  const router = useRouter();
  const { projectId } = router.query;

  return (
    <div>
      <ProjectPage projectId={(projectId as string) || ''} />
    </div>
  );
};

export default ProjectId;
