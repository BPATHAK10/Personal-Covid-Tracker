import ContactsDAO from "../dao/contactsDAO.js"

export default class ContactsController {
  static async apiPostContact(req, res, next) {

    try {
      const relation = req.body.relation
      const status = req.body.status
      const name = req.body.name
      const date = req.body.date
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
        date,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateContact(req, res, next) {
    try {
        const contact_id = req.body.contact_id
        const relation = req.body.relation
        const status = req.body.status
        const name = req.body.name
        const date = req.body.date
        const vaccinationStatus = req.body.vaccinationStatus
  
        const userInfo = {
          _id: req.body.owner
        }  
        const ContactResponse = await ContactsDAO.updateContact(
          userInfo,
          contact_id,
          relation,
          status,
          name,
          vaccinationStatus,
          date,
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

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteContact(req, res, next) {
    try {
      const contactId = req.body.contact_id
      const owner = req.body.owner

      const ContactResponse = await ContactsDAO.deleteContact(
        contactId,
        owner
      )


      res.json({ status: "success" })
    } 
    catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

}