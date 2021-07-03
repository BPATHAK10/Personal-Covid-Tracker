import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let contacts

export default class ContactsDAO {
  static async injectDB(conn) {
    if (contacts) {
      return
    }
    try {
      contacts = await conn.db(process.env.RESTREVIEWS_NS).collection("contacts")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addContact(
    userInfo,
    relation,
    status,
    name,
    vaccinationStatus,
    date,
  ) {
    try {
      const ContactDoc = { 
          owner: ObjectId(userInfo._id),
          relation: relation,
          status: status,
          name: name,
          dateOfInfection: date,
          vaccinationStatus: vaccinationStatus}

      return await contacts.insertOne(ContactDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async updateContact(
    userInfo,
    contact_id,
    relation,
    status,
    name,
    vaccinationStatus,
    date,
  ) {
    try {
      const updateResponse = await contacts.updateOne(
        {owner: ObjectId(userInfo._id), _id: ObjectId(contact_id)},
        { $set: { 
            relation: relation,
            status: status,
            name: name,
            dateOfInfection: date,
            vaccinationStatus: vaccinationStatus
          } },
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

  static async deleteContact(contactId, owner) {

    try {
      const deleteResponse = await contacts.deleteOne({
        _id: ObjectId(contactId),
        owner: owner,
      })
        
      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }

}