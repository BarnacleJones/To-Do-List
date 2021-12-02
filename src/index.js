import { createProject, selectProject } from "./projectFactory";
import { initialeventListeners } from "./eventlisteners";

initialeventListeners();
createProject("default");
