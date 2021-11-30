// import Dashboard from './views/Dashboard.svelte';
// import WorkflowCreate  from './views/WorkflowCreate.svelte';
// import Workflows from './views/Workflows.svelte';
// import WorkflowView from './views/WorkflowView.svelte';

import Landing from './views/Landing.svelte';
import Dashboard from './views/Dashboard.svelte';
import Workflows from './views/Workflows.svelte';
import WorkflowEdit from './views/WorkflowEdit.svelte';
import WorkflowView from './views/Workflows.svelte';
import NotFound from './views/NotFound.svelte';
import Calendar from './views/Calendar.svelte'

export default {
    '/': Landing,
    '/client/:clientId/dashboard' : Dashboard,
    '/client/:clientId/dashboard/workflows' : Workflows,
    '/client/:clientId/dashboard/workflows/:workflow-id/edit' : WorkflowEdit,
    '/client/:clientId/dashboard/calendar/' : Calendar,
    '*': NotFound
};






