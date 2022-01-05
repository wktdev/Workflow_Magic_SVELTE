import Dexie from 'dexie'

let indexedDB = new Dexie('WorkflowMagicUserDB')
import download from 'downloadjs'

indexedDB.version(1).stores({
  workflows: '++id,client_id,content,title',
  clients: '++id,name',
  // contacts:"++id,client_id,content,title",
  contacts:
    '++id,client_id,full_name,first_name,last_name,email,phone_number,additional_information',

  calendar_events:
    '++id,calendarId,start,end,title,location,isPrivate,isAllDay,category,clientId',

  calendar_event_group_id: '++id, title, client_name, client_id',
  user: 'user_id',
})

import {
  importDB,
  exportDB,
  importInto,
  peakImportFile,
} from 'dexie-export-import'

// export async function getAllCalendarEvents() {
//     let result = await indexedDB.calendar_events.toArray();
//     return result // returns an entire array (not individual objects)
// }

export async function getCalendarEventById(id) {
  let result = await indexedDB.calendar_events.get(id)
  console.log(result)
  return result
}

export async function updateCalendarEvent(id, obj) {
  let result = await indexedDB.calendar_events.update(id, obj)

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
  clientId,
) {
  let result = await indexedDB.calendar_events.add({
    clientId:clientId,
    start: startDate,
    end: endDate,
    title: title,
    location: location,
    isPrivate: isPrivate,
    isAllDay: isAllDay,
    category: category,
    calendarId: clientId,  // CalendarId is same as clientId. Needed for full calendar plug in

  })
  return result
}

export async function getAllCalendarEvents() {
  let allCalendarEvents = await indexedDB.calendar_events.toArray()
  return allCalendarEvents
}

export async function getClientCalendarEvents(calendarID) {
  let allCalendarEvents = await indexedDB.calendar_events.toArray()
  console.log(allCalendarEvents)
  // console.log(clientID)
  let correctCalendarEvents = await allCalendarEvents.filter((val) => {
    return val.calendarId === calendarID
  })

  return correctCalendarEvents
}

// export async function getClientCalendarEvents(clientID) {
//   let allCalendarEvents = await indexedDB.calendar_events.toArray()
//   console.log(allCalendarEvents)
//   console.log(clientID)
//   let correctCalendarEvents = await allCalendarEvents.filter((val) => {
//     return val.client_id === clientID
//   })

//   return correctCalendarEvents
// }

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

export async function exportIndexedDB() {
  const blob = await exportDB(indexedDB, { prettyJson: true })
  download(blob, 'WorkflowMagic', 'application/json')
  return blob
}


export async function importIndexedDB(file) {


  await indexedDB.delete().then(()=>{
    
    indexedDB = new Dexie('WorkflowMagicUserDB');
    indexedDB.version(1).stores({
      workflows: '++id,client_id,content,title',
      clients: '++id,name',
      // contacts:"++id,client_id,content,title",
      contacts:
        '++id,client_id,full_name,first_name,last_name,email,phone_number,additional_information',
    
      calendar_events:
        '++id,calendarId,start,end,title,location,isPrivate,isAllDay,category,clientId',
    
      calendar_event_group_id: '++id, title, client_name, client_id',
      user: 'user_id',
    })
  
  }).then(()=>{
    indexedDB.import(file,{ prettyJson: true });
  });

  
  // let db = await indexedDB.import(file,{ prettyJson: true });

  

  return "done"
}



// export async function importIndexedDB(file, callback) {
//   await indexedDB.delete().then(()=>{
    
//     indexedDB = new Dexie('WorkflowMagicUserDB');
//     indexedDB.version(1).stores({
//       workflows: '++id,client_id,content,title',
//       clients: '++id,name',
//       // contacts:"++id,client_id,content,title",
//       contacts:
//         '++id,client_id,full_name,first_name,last_name,email,phone_number,additional_information',
    
//       calendar_events:
//         '++id,calendarId,start,end,title,location,isPrivate,isAllDay,category,clientId',
    
//       calendar_event_group_id: '++id, title, client_name, client_id',
//       user: 'user_id',
//     })
  
//   }).then(()=>{
//     indexedDB.import(file)
//   })
//   // indexedDB = new Dexie('WorkflowMagicUserDB')
//   // let db = await indexedDB.import(file);

//   // return db
// }
