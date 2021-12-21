import Dexie from 'dexie'

var indexedDB = new Dexie('WorkflowMagicUserDB')
indexedDB.version(1).stores({
  workflows: '++id,client_id,content,title',
  clients: '++id,name',
  // contacts:"++id,client_id,content,title",
  contacts:
    '++id,client_id,full_name,first_name,last_name,email,phone_number,additional_information',

  calendar_events:
    '++id,calendar_id,start,end,title,location,isPrivate,isAllDay,category',

  calendar_event_group_id: '++id, title, client_name, client_id',
  user: 'user_id',
})

// export async function getAllCalendarEvents() {
//     let result = await indexedDB.calendar_events.toArray();
//     return result // returns an entire array (not individual objects)
// }


export async function getCalendarEventById(id) {
  let result = await indexedDB.calendar_events.get(id)
  console.log(result)
  return result
}

export async function updateCalendarEvent(id,obj) {
  let result = await indexedDB.calendar_events.update(id,obj)

  return obj
}

export async function createCalendarEvent(
  startDate,
  endDate,
  title,
  location,
  isPrivate,
  isAllDay,
  category,
  calendarId,
) {
  let result = await indexedDB.calendar_events.add({
    start: startDate,
    end: endDate,
    title: title,
    location: location,
    isPrivate: isPrivate,
    isAllDay: isAllDay,
    category: category,
    calendar_id: calendarId,
  })
  return result
}

export async function getAllCalendarEvents() {
  let allCalendarEvents = await indexedDB.calendar_events.toArray()
  return allCalendarEvents
}

export async function getClientCalendarEvents(clientID) {
  let allCalendarEvents = await indexedDB.calendar_events.toArray()
  console.log(allCalendarEvents)
  console.log(clientID)
  let correctCalendarEvents = await allCalendarEvents.filter((val) => {
    return val.client_id === clientID
  })

  return correctCalendarEvents
}

export async function deleteCalendarEvent(id) {
  let result = await indexedDB.calendar_events.where('id').equals(id).delete()
  return result
}

export async function createClient(name) {
  let result = await indexedDB.clients.add({ name: name })
  return result
}

export async function deleteClient(id) {
  let result = await indexedDB.clients.where('id').equals(id).delete()
  return result
}

export async function getAllClients() {
  let result = await indexedDB.clients.toArray()
  return result // returns an entire array (not individual objects)
}

export async function getClientById(id) {
  let result = await indexedDB.clients.get(id)
  console.log(result)
  return result
}

export async function createWorkflow(clientID, title, content) {
  let result = await indexedDB.workflows.add({
    title: title,
    content: content,
    client_id: clientID,
  })
  return result
}

export async function getClientWorkflows(clientID) {
  let allWorkflows = await indexedDB.workflows.toArray()
  let correctWorkflows = await allWorkflows.filter((val) => {
    return val.client_id === clientID
  })
  return correctWorkflows
}

export async function updateWorkflow(id, title, content) {
  let result = await indexedDB.workflows.update(id, {
    title: title,
    content: content,
  })
  return result
}

export async function getWorkflowById(id) {
  let result = await indexedDB.workflows.get(id)
  console.log(result)
  return result
}

export async function deleteWorkflow(id) {
  let result = await indexedDB.workflows.where('id').equals(id).delete()
  return result
}
