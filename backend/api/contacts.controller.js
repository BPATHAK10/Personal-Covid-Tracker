import ContactsDAO from "../dao/contactsDAO.js"
import UserDAO from "../dao/userDAO.js"

export default class ContactsController {
  static async apiPostContact(req, res, next) {
    // console.log(req.body)

    try {
      const relation = req.body.relation
      const status = req.body.status  
      const name = req.body.name
      const dateOfInfection = req.body.dateOfInfection
      const vaccinationStatus = req.body.vaccinationStatus

      const userInfo = {
        _id: req.body.owner
      }

      const ContactResponse = await ContactsDAO.addContact(
        userInfo,
        relation,
        status,
        name,
        vaccinationStatus,
        dateOfInfection,
      )
      
      // console.log(ContactResponse.ops[0])

      res.json(ContactResponse.ops[0])
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateContact(req, res, next) {
    try {
        // const updatedContact = req.body.updatedContact

        // console.log(updatedContact)

        const {
          relation,
          name,
          status,
          dateOfInfection,
          vaccinationStatus,
          owner,
          _id
        } = req.body

        // const relation = req.body.relation
        // const status = req.body.status
        // const name = req.body.name
        // const date = req.body.date
        // const vaccinationStatus = req.body.vaccinationStatus
  
        // const userInfo = {
        //   _id: req.body.owner
        // }  
        const ContactResponse = await ContactsDAO.updateContact(
          owner,
          _id,
          relation,
          status,
          name,
          vaccinationStatus,
          dateOfInfection
        )


      var { error } = ContactResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (ContactResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review - user may not be original poster",
        )
      }
      // console.log(ContactResponse)

      res.json(ContactResponse.value)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetContacts(req, res, next){
    try {
      let id = req.params.id || {}
      // console.log(id)
      let userContacts  = await UserDAO.getUserContactsByID(id)
      if (!userContacts) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(userContacts)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiDeleteContact(req, res, next) {
    try {
      const contactId = req.params.id
      // const owner = req.body.owner
      // console.log("in deleteContact of contact controller::", contactId)


      const ContactResponse = await ContactsDAO.deleteContact(contactId)

      // console.log("contact delete response", ContactResponse)

      res.json({ status: "success" })
    } 
    catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

}