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

import SaveAndLoadIndexedDB from './views/SaveAndLoadIndexedDB.svelte'
import CalendarFull from './views/CalendarFull.svelte'
import CalendarEvents from './views/CalendarEvents.svelte'
import Calendar from './views/Calendar.svelte'
import CalendarEdit from './views/CalendarEdit.svelte'
import CalendarSingleEvent from './views/CalendarSingleEvent.svelte'
import SpeechService from './views/SpeechService.svelte'
import Apps from './views/Apps.svelte'
import Sandbox from './views/Sandbox.svelte'

export default {
    '/': Landing,
    '/client/:clientId/dashboard' : Dashboard,
    '/client/:clientId/dashboard/workflows' : Workflows,
    '/client/:clientId/dashboard/workflows/:workflow-id/' : Workflow,
    '/client/:clientId/dashboard/workflows/:workflow-id/edit' : WorkflowEdit,
    '/client/:clientId/dashboard/calendar/' : Calendar,
    '/client/:clientId/dashboard/calendar/event/:eventId/edit' : CalendarEdit,
    // '/client/:clientId/dashboard/calendar//' : CalendarEvents,
    '/calendar/': CalendarFull,
    '/save-and-load/': SaveAndLoadIndexedDB,
    '/apps/' : Apps,
    '/speech/' : SpeechService, 

    //  '/client/:clientId/dashboard/calendar-events/:calendar-event-id/edit/' : CalendarEventEdit,
    //  '/client/:clientId/dashboard/calendar-events' : CalendarEventEdit,
    '/sandbox/' : Sandbox,
    '*': NotFound
};






