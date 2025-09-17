import React from "react";
import ProjectDetailsHeader from "./ProjectDetailsHeader/ProjectDetailsHeader";
import RESmart from "./RESmart/RESmart";
import ProjectGoal from "./ProjectGoal/ProjectGoal";

export default function ProjectDetails() {
  return (
    <>
      <ProjectDetailsHeader />
      <RESmart />
      <ProjectGoal/>
    </>
  );
}
