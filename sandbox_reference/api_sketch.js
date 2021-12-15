Skip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore
 
@wktdev 
wktdev
/
workflow_magic_guest_app
Private
Code
Issues
Pull requests
Actions
Projects
Security
Insights
Settings
workflow_magic_guest_app/src/IndexedDbApp/services/indexDB/index.js /

wktdev save
Latest commit 6931219 on Sep 9, 2020
 History
 0 contributors
416 lines (258 sloc)  9.88 KB
  
import Dexie from 'dexie';
import 'dexie-observable';
import moment from 'moment';
import 'moment-timezone';

var indexedDB = new Dexie("WorkflowMagicUserDB");
indexedDB.version(1).stores({
    workflows: "++id,client_id,content,title",
    clients: "++id,name",
    // contacts:"++id,client_id,content,title",
    contacts: "++id,client_id,full_name,first_name,last_name,email,phone_number,additional_information",

    calendar_events: "++id,start,end,title,description,client_name,client_id,group_id",
    calendar_event_group_id: "++id, title, client_name, client_id",
    user: "user_id"
});


//___________________________________________________BEGIN check if ANY data exists

export async function databaseContainsData() {
    const clients = await indexedDB.clients.toArray();
    const clientsExist = clients[0];

    const workflows = await indexedDB.workflows.toArray();
    const workflowsExist = workflows[0];

    const contacts = await indexedDB.contacts.toArray();
    const contactsExist = contacts[0];

    const calendarEvents = await indexedDB.calendar_events.toArray();
    const calendarEventsExist = calendarEvents[0];

    if (clientsExist || workflowsExist || contactsExist || calendarEventsExist) {
        console.log("Yes the clients exist");
        return true

    } else {
        console.log("No clients exist");
        return false
    }

}

//___________________________________________________END check if any data exists


//___________________________________________________BEGIN Client methods

export async function checkIfClientsExist() {
    const result = await indexedDB.clients.toArray();
    const clientsExist = result[0];

    if (clientsExist) {
        console.log("Yes the clients exist");
        return true

    } else {
        console.log("No clients exist");
        return false
    }

}


export async function createClient(name) {
    let result = await indexedDB.clients.add({ name: name });
    return result
}


export async function getAllClients() {
    let result = await indexedDB.clients.toArray();
    return result // returns an entire array (not individual objects)
}


export async function deleteClient(id) {
    let result = await indexedDB.clients.where("id").equals(id).delete();
    return result
}


export async function updateClient(id, name) {
    let result = await indexedDB.clients.update(id, { name: name })
    return result
}


export async function getClientById(id) {
    let result = await indexedDB.clients.get(id);
    return result
}

//______________________________________________________END Client methods



//___________________________________________________BEGIN Workflow methods


// @Does not check based on client !
export async function checkIfWorkflowsExist() {
    const result = await indexedDB.workflows.toArray();
    const workflowsExist = result[0];

    if (workflowsExist) {
        console.log("Yes workflows exist");

        return true

    } else {
        console.log("No workflows exist");
        return false

    }
}


export async function checkIfWorkflowsOfClientExist(clientID) {

    let allWorkflows = await indexedDB.workflows.toArray();
    let correctWorkflows = await allWorkflows.filter((val) => {
        return val.client_id === clientID
    });

    if (correctWorkflows[0]) {
        return true
    } else {
        return false
    }


}




export async function createWorkflow(clientID, title, content) {
    let result = await indexedDB.workflows.add({ title: title, content: content, client_id: clientID });
    return result
}


export async function deleteWorkflow(id) {
    let result = await indexedDB.workflows.where("id").equals(id).delete();
    return result
}


// export async function getClientWorkflows(clientID) {
//     let allWorkflows = await indexedDB.workflows.toArray();
//     let correctWorkflows = await allWorkflows.filter((val) => {
//         return val.client_id === clientID
//     });

//     return correctWorkflows

// }


export async function getWorkflowById(id) {
    let result = await indexedDB.workflows.get(id);
    return result
}



export async function deleteClientWorkflows(clientId) {

    let result = await indexedDB.workflows.where("client_id").equals(clientId).delete();
    return result

}




export async function updateWorkflow(id, title, content) {
    let result = await indexedDB.workflows.update(id, { title: title, content: content })
    return result
}



//___________________________________________________END Workflow methods




//___________________________________________________BEGIN Contacts methods


// @Does not check based on client !
export async function checkIfContactsExist() {
    const result = await indexedDB.contacts.toArray();
    const contactsExist = result[0];

    if (contactsExist) {
        console.log("Yes workflows exist");

        return true

    } else {
        console.log("No workflows exist");
        return false

    }
}


export async function checkIfContactsOfClientExist(clientID) {

    let allContacts = await indexedDB.contacts.toArray();
    let correctContacts = await allContacts.filter((val) => {
        return val.client_id === clientID
    });

    if (correctContacts[0]) {
        return true
    } else {
        return false
    }


}

// here      contacts:"++id,client_id,full_name,first_name,last_name,email,phone,additional_information",


export async function createContact(clientID, title, firstName, lastName, email, phoneNumber, additionalInformation) {
    let result = await indexedDB.contacts.add({
        title: title,
        additional_information: additionalInformation,
        client_id: clientID,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber
    });
    return result
}


export async function deleteContact(id) {
    let result = await indexedDB.contacts.where("id").equals(id).delete();
    return result
}



export async function getClientContacts(clientID) {
    let allContacts = await indexedDB.contacts.toArray();
    let correctContacts = await allContacts.filter((val) => {
        return val.client_id === clientID
    });

    return correctContacts

}



export async function deleteClientContacts(clientId) {

    let result = await indexedDB.contacts.where("client_id").equals(clientId).delete();
    return result

}




export async function updateContact(id, clientID, title, firstName, lastName, email, phoneNumber, additionalInformation) {
    let result = await indexedDB.contacts.update(id, {
        title: title,
        additional_information: additionalInformation,
        client_id: clientID,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber
    })
    return result
}



//___________________________________________________END Contacts methods




//___________________________________________________BEGIN calendar event methods


export async function createCalendarEvent(event) {


    let result = await indexedDB.calendar_events.add({
        title: event.title,
        description: event.description,
        start: event.start,
        end: event.end,
        client_id: event.clientID,
        user_id: event.userID,
        client_name: event.clientName,
        group_id: event.groupID
    });

    return result
}

//________________START Calendar Events

export async function createCalendarEvents(arrOfEventObjects,clientID,title,description,groupID,lengthOfEvent) {
    let listOfEvents = [...arrOfEventObjects]
    
    console.log(listOfEvents, "Check for list of calendarEvents API")
    let id = 0;
    for (let i = 0; i < listOfEvents.length; i += 1) {
       id = await indexedDB.calendar_events.add({
            title:title || "",
            description: description || "",
            start: listOfEvents[i],
            end: moment(listOfEvents[i]).add(lengthOfEvent, 'minutes').toDate(), // calculate end time
            client_id: clientID || undefined,
            group_id: groupID || undefined
        });

       console.log(listOfEvents[0], "Example of calendarEvents");
       
       console.log(moment(listOfEvents[i]).add(30, 'minutes').toDate(), "END of calendarEvents")
       // console.log(id, "Id of added event")

    }

    return id
}

//_________________END  Calendar Events 



export async function getAllCalendarEvents() {
    let allCalendarEvents = await indexedDB.calendar_events.toArray();
    return allCalendarEvents
}


export async function getClientCalendarEvents(clientID) {
    let allCalendarEvents = await indexedDB.calendar_events.toArray();
    let clientCalendarEvents = await allCalendarEvents.filter((val) => {
        return val.client_id === clientID
    });
    console.log("The client ID is: " + clientID)
    return clientCalendarEvents

}




export async function createCalendarEventGroupID(clientID, title, clientName) {
    let result = await indexedDB.calendar_event_group_id.add({ title: title, client_name: clientName || undefined, client_id: clientID });
    return result
}


export async function deleteCalendarEvent(id) {
    let result = await indexedDB.calendar_events.where("id").equals(id).delete();
      console.log(result,"THe deleted result");
    debugger;
    return result
}




export async function deleteGroupedCalendarEvents(groupID) {
    let result = await indexedDB.calendar_events.where("group_id").equals(groupID).delete();
    console.log(result,"THe group result");
    debugger;
    return result
}


export async function deleteClientCalendarEvents(clientId) {
    let result = await indexedDB.calendar_events.where("client_id").equals(clientId).delete();
    return result

}





// export async function test(id) {
//     let result = indexedDB.calendar_events.where("group_id").equals(id).delete();
//     return result
// }



//___________________________________________________END calendar event methods


export async function exportDB() {
    const blob = await exportDB(indexedDB, { prettyJson: true });
    return blob
}

//__________________________________________________BEGIN URL REST API









//_________________________________________________END

export default indexedDB
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
Loading complete