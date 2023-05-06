const hre = require('hardhat');
const { expect } = require('chai');

describe('ProjectManager', function () {
  let projectManager, projectManagerFactory;
  beforeEach(async function () {
    const [owner] = await hre.ethers.getSigners();

    projectManagerFactory = await hre.ethers.getContractFactory('ProjectManager');
    projectManager = await projectManagerFactory.deploy(
      'test project',
      'test project description',
      owner.address,
    );
  });

  it('should be able to create a new project', async function () {
    const balance = await projectManager.getBalance();
    expect(balance).to.equal(0);
  });

  it('fund project', async function () {
    const [owner] = await hre.ethers.getSigners();

    await projectManager.fundProject(owner.address, { value: 100 });
    const newBalance = await projectManager.getBalance();
    expect(newBalance).to.equal(100);
  });

  it('it should withdraw funds', async function () {
    const [owner] = await hre.ethers.getSigners();

    await projectManager.fundProject(owner.address, { value: 100 });
    await projectManager.withdrawFunds(owner.address);
    const newBalance = await projectManager.getBalance();
    expect(newBalance).to.equal(0);
  });
});
