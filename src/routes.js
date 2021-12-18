// import Dashboard from './views/Dashboard.svelte';
// import WorkflowCreate  from './views/WorkflowCreate.svelte';
// import Workflows from './views/Workflows.svelte';
// import WorkflowView from './views/WorkflowView.svelte';

import Landing from './views/Landing.svelte';
import Dashboard from './views/Dashboard.svelte';
import Workflows from './views/Workflows.svelte';
import WorkflowEdit from './views/WorkflowEdit.svelte';
import Workflow from './views/Workflow.svelte';
import NotFound from './views/NotFound.svelte';

import CalendarEvents from './views/CalendarEvents.svelte'
import CalendarEventEdit from './views/CalendarEventEdit.svelte'
import sandbox from './views/sandbox.svelte'

export default {
    '/': Landing,
    '/client/:clientId/dashboard' : Dashboard,
    '/client/:clientId/dashboard/workflows' : Workflows,
    '/client/:clientId/dashboard/workflows/:workflow-id/' : Workflow,
    '/client/:clientId/dashboard/workflows/:workflow-id/edit' : WorkflowEdit,
   
    '/client/:clientId/dashboard/calendar-events/' : CalendarEvents,
     '/client/:clientId/dashboard/calendar-events/:calendar-event-id/edit/' : CalendarEventEdit,
    '/sandbox/' : sandbox,
    '*': NotFound
};






