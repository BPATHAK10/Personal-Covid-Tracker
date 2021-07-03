const KEYS = {
    contacts: 'contacts',
    contactId: 'contactId'
}

export const getStatusCollection = () => ([
    { id: '1', title: 'Infected' },
    { id: '2', title: 'Isolation' },
    { id: '3', title: 'Recovered' },
    { id: '4', title: 'Death' },
])

export function insertContact(data) {
    let contacts = getAllContacts();
    data['id'] = generateContactId()
    contacts.push(data)
    localStorage.setItem(KEYS.contacts, JSON.stringify(contacts))
}

export function updateContact(data) {
    let contacts = getAllContacts();
    let recordIndex = contacts.findIndex(x => x.id == data.id);
    contacts[recordIndex] = { ...data }
    localStorage.setItem(KEYS.contacts, JSON.stringify(contacts));
}

export function generateContactId() {
    if (localStorage.getItem(KEYS.contactId) == null)
        localStorage.setItem(KEYS.contactId, '0')
    var id = parseInt(localStorage.getItem(KEYS.contactId))
    localStorage.setItem(KEYS.contactId, (++id).toString())
    return id;
}

export function deleteContactId(data) {
    let contacts = getAllContacts();
    let recordIndex = contacts.findIndex(x => x.id == data.id);
    // contacts[recordIndex] = { ...data }
    localStorage.removeItem(KEYS.contacts[recordIndex]);
}


export function getAllContacts() {
    if (localStorage.getItem(KEYS.contacts) == null)
        localStorage.setItem(KEYS.contacts, JSON.stringify([]))
    let contacts = JSON.parse(localStorage.getItem(KEYS.contacts));
    //map statusID to status title
    let statuss = getStatusCollection();
    return contacts.map(x => ({
        ...x,
        status: statuss[x.statusId - 1].title
    }))
}