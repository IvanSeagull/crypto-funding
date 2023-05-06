// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "./ProjectManager.sol";

contract ProjectsManager {
    address public immutable i_owner;
    uint private projectsCount = 0;

    mapping(uint => ProjectManager) private projects;

    constructor() {
        i_owner = msg.sender;
    }

    struct ProjectData {
        uint id;
        ProjectManager project;
        string projectName;
    }

    function createProject(
        string memory _projectName,
        string memory _projectDescription
    ) public returns (uint) {
        projects[projectsCount] = new ProjectManager(
            _projectName,
            _projectDescription,
            msg.sender
        );
        projectsCount++;
        return projectsCount - 1;
    }

    function fundProject(uint _projectId) public payable {
        projects[_projectId].fundProject{value: msg.value}(msg.sender);
    }

    function withdrawFunds(uint _projectId) public {
        projects[_projectId].withdrawFunds(msg.sender);
    }

    function getProjectDetails(
        uint _projectId
    ) public view returns (string memory, string memory, uint, address) {
        if (address(projects[_projectId]) == address(0)) {
            revert("Project with this id does not exist");
        }
        return projects[_projectId].getProjectDetails();
    }

    function deleteProject(uint _projectId) public {
        delete projects[_projectId];
    }

    function getAllProjects() public view returns (ProjectData[] memory) {
        ProjectData[] memory _projects = new ProjectData[](projectsCount);
        for (uint i = 0; i < projectsCount; i++) {
            (string memory projectName, , , ) = projects[i].getProjectDetails();
            _projects[i] = ProjectData(i, projects[i], projectName);
        }
        return _projects;
    }
}
