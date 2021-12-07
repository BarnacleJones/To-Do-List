import { createProject, initialProject } from "./projectFactory";
import { initialeventListeners } from "./eventlisteners";

initialeventListeners();
createProject("default");
initialProject();
