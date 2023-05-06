const hre = require('hardhat');
const { expect } = require('chai');

describe('ProjectsManager', function () {
  let projectsManager, projectsManagerFactory;
  beforeEach(async function () {
    const [owner] = await hre.ethers.getSigners();

    projectsManagerFactory = await hre.ethers.getContractFactory('ProjectsManager');
    projectsManager = await projectsManagerFactory.deploy();
  });

  it('should be able to create Project and get details', async function () {
    await projectsManager.createProject('test project', 'test project description');
    const project = await projectsManager.getProjectDetails(0);

    expect(project[0]).to.equal('test project');
    expect(project[1]).to.equal('test project description');
  });

  it('should be able to fund Project', async function () {
    await projectsManager.createProject('test project', 'test project description');
    await projectsManager.fundProject(0, { value: 100 });
    const project = await projectsManager.getProjectDetails(0);

    expect(project[2]).to.equal(100);
  });

  it('should be able to withdraw funds', async function () {
    await projectsManager.createProject('test project', 'test project description');
    await projectsManager.fundProject(0, { value: 100 });
    await projectsManager.withdrawFunds(0);
    const project = await projectsManager.getProjectDetails(0);
    expect(project[2]).to.equal(0);
  });

  it('should be able to get all projects', async function () {
    await projectsManager.createProject('test project', 'test project description');
    await projectsManager.createProject('test project2', 'test project2 description');
    await projectsManager.createProject('test project3', 'test project3 description');
    const projects = await projectsManager.getAllProjects();

    expect(projects.length).to.equal(3);
    expect(projects[0].projectName).to.equal('test project');
    expect(projects[1].projectName).to.equal('test project2');
    expect(projects[2].projectName).to.equal('test project3');
  });

  it('should be able to delete project', async function () {
    await projectsManager.createProject('test project', 'test project description');
    await projectsManager.createProject('test project2', 'test project2 description');

    const project = await projectsManager.getProjectDetails(0);
    expect(project[0]).to.equal('test project');

    const project2 = await projectsManager.getProjectDetails(1);
    expect(project2[0]).to.equal('test project2');

    await projectsManager.deleteProject(0);

    await expect(projectsManager.getProjectDetails(0)).to.be.revertedWith(
      'Project with this id does not exist',
    );
  });
});
