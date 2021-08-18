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
    relatedThrough,
    status,
    name,
    vaccinationStatus,
    dateOfInfection,
    mobileNumber,
  ) {
    try {
      const ContactDoc = { 
          owner: ObjectId(userInfo._id),
          relation: relation,
          relatedThrough: relatedThrough,
          status: status,
          name: name,
          dateOfInfection: dateOfInfection,
          mobileNumber: mobileNumber,
          vaccinationStatus: vaccinationStatus}

      return await contacts.insertOne(ContactDoc)

    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async updateContact(
    owner,
    _id,
    relation,
    relatedThrough,
    status,
    name,
    vaccinationStatus,
    mobileNumber,
    dateOfInfection,
  ) {
    try {
      const updateResponse = await contacts.findOneAndUpdate(
        {owner: ObjectId(owner), _id: ObjectId(_id)},
        { $set: { 
            relation: relation,
            relatedThrough: relatedThrough,
            status: status,
            name: name,
            dateOfInfection: dateOfInfection,
            vaccinationStatus: vaccinationStatus,
            mobileNumber: mobileNumber,
          } },
          {
            returnOriginal: false
          }
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

  static async deleteContact(contactId) {

    try {
      const deleteResponse = await contacts.deleteOne({
        _id: ObjectId(contactId)
      })
        
      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }

}