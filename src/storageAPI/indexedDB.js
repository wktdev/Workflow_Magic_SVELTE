import Dexie from 'dexie';

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



export async function createClient(name) {
    let result = await indexedDB.clients.add({ name: name });
    return result
}

export async function deleteClient(id) {
    let result = await indexedDB.clients.where("id").equals(id).delete();
    return result
}






export async function getAllClients() {
    let result = await indexedDB.clients.toArray();
    return result // returns an entire array (not individual objects)
}

export async function getClientById(id) {
    let result = await indexedDB.clients.get(id);
    return result
}


export async function createWorkflow(clientID, title, content) {
    let result = await indexedDB.workflows.add({ title: title, content: content, client_id: clientID });
    return result
}

export async function getClientWorkflows(clientID) {
    let allWorkflows = await indexedDB.workflows.toArray();
    let correctWorkflows = await allWorkflows.filter((val) => {
        return val.client_id === clientID
    });

    return correctWorkflows
}



export async function deleteWorkflow(id) {
    let result = await indexedDB.workflows.where("id").equals(id).delete();
    return result
}

