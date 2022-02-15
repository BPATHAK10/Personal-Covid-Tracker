import ContactsDAO from "../dao/contactsDAO.js"
import UserDAO from "../dao/userDAO.js"
import pool from "../db.js"

export default class ContactsController {
  static async apiPostContact(req, res, next) {
    // console.log(req.body)

    try {
      const contactInfo = {
       "relation_type" : req.body.relation,
       "relation_through" : req.body.relatedThrough,
       "status" : req.body.status,  
       "name" : req.body.name,
       "dateOfInfection" : new Date(req.body.dateOfInfection),
       "vaccinationStatus" : req.body.vaccinationStatus,
       "mobile_number" :req.body.mobileNumber,
       "_userId" : req.body.owner,
       "covidVariant" : req.body.covidVariant,
       "country" : req.body.country,
       "province" : req.body.province,
       "city" : req.body.city,
       "district" : req.body.district,
       "ward" : req.body.ward,
       "doseName" : req.body.doseName,
       "vaccination_date" : new Date(req.body.vaccinationDate),
       "vaccination_center" : req.body.vaccinationCenter,
      }

      
      // console.log(contactInfo)

    //   const ContactResponse = await ContactsDAO.addContact(
    //     userInfo,
    //     relation,
    //     relatedThrough,
    //     status,
    //     name,
    //     vaccinationStatus,
    //     dateOfInfection,
    //     mobileNumber,
    //   )
      
    //   // console.log(ContactResponse.ops[0])

    //   res.json(ContactResponse.ops[0])

    // first insert into CovidDetails table
    const CovidDetailsResponse = await pool.query('INSERT INTO "CovidDetails" (status,variant,infection_date) VALUES ($1,$2,$3) RETURNING *;',
     [contactInfo.status, contactInfo.covidVariant, contactInfo.dateOfInfection])
    
    // console.log(CovidDetailsResponse.rows[0])

    // then insert into Address table
    const AddressDetailsResponse = await pool.query('INSERT INTO "Address" (country,province,district,city,ward) VALUES ($1,$2,$3,$4,$5) RETURNING *;',
      [contactInfo.country, contactInfo.province, contactInfo.district, contactInfo.city, contactInfo.ward])

    // console.log(AddressDetailsResponse.rows[0])

    // then insert into VannineDetails table
    const vaccinationStatusResponse = await pool.query('INSERT INTO "VaccineDetails" (dose_name,vaccination_date,vaccination_center) VALUES ($1,$2,$3) RETURNING *;',
      [contactInfo.doseName, contactInfo.vaccination_date, contactInfo.vaccination_center])

    // console.log(vaccinationStatusResponse.rows[0])

    const newContact = await pool.query(
      'INSERT INTO "Person" (name,email,relation_type,relation_through,mobile_number,_addressid,_covidid,_vaccineid,_userid) VALUES($1, $2, $3, $4, $5, $6, $7,$8,$9) RETURNING *;',
      [contactInfo.name, contactInfo.email, contactInfo.relation_type, contactInfo.relation_through, contactInfo.mobile_number, AddressDetailsResponse.rows[0]._id, CovidDetailsResponse.rows[0]._id, vaccinationStatusResponse.rows[0]._id, contactInfo._userId]);
    
    res.json({
      "person": newContact.rows[0],
      "covid": CovidDetailsResponse.rows[0],
      "address": AddressDetailsResponse.rows[0],
      "vaccine": vaccinationStatusResponse.rows[0]
    });
    // res.json({"success":true})
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateContact(req, res, next) {
    try {
        // const updatedContact = req.body.updatedContact

        // console.log(updatedContact)
      const contactInfo = {
       "relation_type" : req.body.relation,
       "relation_through" : req.body.relatedThrough,
       "status" : req.body.status,  
       "name" : req.body.name,
       "dateOfInfection" : new Date(req.body.dateOfInfection),
       "vaccinationStatus" : req.body.vaccinationStatus,
       "mobile_number" :req.body.mobileNumber,
       "owner" : req.body.owner,
       "covidVariant" : req.body.covidVariant,
       "country" : req.body.country,
       "province" : req.body.province,
       "city" : req.body.city,
       "district" : req.body.district,
       "ward" : req.body.ward,
       "doseName" : req.body.doseName,
       "vaccination_date" : new Date(req.body.vaccinationDate),
       "vaccination_center" : req.body.vaccinationCenter,
       "address_id" : req.body.address_id,
       "covid_id" : req.body.covid_id,
        "vaccine_id" : req.body.vaccine_id,
       "_id" : req.body._id,
      }

      console.log(contactInfo)

        // const {
        //   relation,
        //   relatedThrough,
        //   name,
        //   status,
        //   dateOfInfection,
        //   mobileNumber,
        //   vaccinationStatus,
        //   owner,
        //   _id
        // } = req.body

        // const relation = req.body.relation
        // const status = req.body.status
        // const name = req.body.name
        // const date = req.body.date
        // const vaccinationStatus = req.body.vaccinationStatus
  
        // const userInfo = {
        //   _id: req.body.owner
        // }  
      //   const ContactResponse = await ContactsDAO.updateContact(
      //     owner,
      //     _id,
      //     relation,
      //     relatedThrough,
      //     status,
      //     name,
      //     vaccinationStatus,
      //     mobileNumber,
      //     dateOfInfection
      //   )


      // var { error } = ContactResponse
      // if (error) {
      //   res.status(400).json({ error })
      // }

      // if (ContactResponse.modifiedCount === 0) {
      //   throw new Error(
      //     "unable to update review - user may not be original poster",
      //   )
      // }
      // // console.log(ContactResponse)

      // res.json(ContactResponse.value)

      // first update CovidDetails table
      const CovidDetailsResponse = await pool.query('UPDATE "CovidDetails" SET status=$1,variant=$2,infection_date=$3 WHERE _id=$4 RETURNING *;',
        [contactInfo.status, contactInfo.covidVariant, contactInfo.dateOfInfection, contactInfo.covid_id])

      // console.log(CovidDetailsResponse.rows[0])

      // then update Address table
      const AddressDetailsResponse = await pool.query('UPDATE "Address" SET country=$1,province=$2,district=$3,city=$4,ward=$5 WHERE _id=$6 RETURNING *;',
        [contactInfo.country, contactInfo.province, contactInfo.district, contactInfo.city, contactInfo.ward, contactInfo.address_id])

      // console.log(AddressDetailsResponse.rows[0])

      // then update VaccineDetails table
      const vaccinationStatusResponse = await pool.query('UPDATE "VaccineDetails" SET dose_name=$1,vaccination_date=$2,vaccination_center=$3 WHERE _id=$4 RETURNING *;',
        [contactInfo.doseName, contactInfo.vaccination_date, contactInfo.vaccination_center, contactInfo.vaccine_id])

      // console.log(vaccinationStatusResponse.rows[0])

      // then update Person table
      const updatedContact = await pool.query(
        'UPDATE "Person" SET name=$1,email=$2,relation_type=$3,relation_through=$4,mobile_number=$5,_addressid=$6,_covidid=$7,_vaccineid=$8 WHERE _id=$10 AND _userid =$9 RETURNING *;',
        [contactInfo.name, contactInfo.email, contactInfo.relation_type, contactInfo.relation_through, contactInfo.mobile_number, AddressDetailsResponse.rows[0]._id, CovidDetailsResponse.rows[0]._id, vaccinationStatusResponse.rows[0]._id, contactInfo.owner, contactInfo._id])

      // console.log(updatedContact.rows[0])

      res.json({
        "person": updatedContact.rows[0],
        "covid": CovidDetailsResponse.rows[0],
        "address": AddressDetailsResponse.rows[0],
        "vaccine": vaccinationStatusResponse.rows[0]
      })
      
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetContacts(req, res, next){
    try {
      let id = req.params.id || {}
      // console.log(id)

      // let userContacts  = await UserDAO.getUserContactsByID(id)
      // if (!userContacts) {
      //   res.status(404).json({ error: "Not found" })
      //   return
      // }
      // // console.log(JSON.stringify(userContacts))
      // res.json(userContacts)

      const userContacts = await pool.query('SELECT * FROM "Person" WHERE "_userid"=$1;', [id])
      console.log(userContacts.rows)

      const allContactDetails = await Promise.all(userContacts.rows.map(async function (contact) {
        // console.log(contact._covidid,contact._addressid,contact._vaccineid)
        const covidDetails = await pool.query('SELECT * FROM "CovidDetails" WHERE "_id"=$1;', [contact._covidid])
        const addressDetails = await pool.query('SELECT * FROM "Address" WHERE "_id"=$1;', [contact._addressid])
        const vaccineDetails = await pool.query('SELECT * FROM "VaccineDetails" WHERE "_id"=$1;', [contact._vaccineid])

        // console.log(covidDetails.rows[0], addressDetails.rows[0], vaccineDetails.rows[0])

        return {
          "person": contact,
          "covid": covidDetails.rows[0],
          "address": addressDetails.rows[0],
          "vaccine": vaccineDetails.rows[0]
        }
      }));

      // const covidDetails = await pool.query('SELECT * FROM "CovidDetails" WHERE "_id"=$1;', [use])

      if(allContactDetails.length === 0){
        res.status(404).json({ error: "Not found" })
        return
      }
      // console.log(allContactDetails["person"].relation_through)
      res.json(allContactDetails)

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


      // const ContactResponse = await ContactsDAO.deleteContact(contactId)

      // console.log("contact delete response", ContactResponse)

      const deleteContact = await pool.query('SELECT * FROM "Person" WHERE "_id"=$1;', [contactId])
      // console.log(deleteContact)

      // delete from covid , address and vaccine tables
      await pool.query('DELETE FROM "CovidDetails" WHERE "_id"=$1;', [deleteContact.rows[0]._covidid])
      await pool.query('DELETE FROM "Address" WHERE "_id"=$1;', [deleteContact.rows[0]._addressid])
      await pool.query('DELETE FROM "VaccineDetails" WHERE "_id"=$1;', [deleteContact.rows[0]._vaccineid])

      // delete from person table
      const deleteResponse = await pool.query('DELETE FROM "Person" WHERE "_id"=$1;', [contactId])

      res.json({ status: "success" })
    } 
    catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

}