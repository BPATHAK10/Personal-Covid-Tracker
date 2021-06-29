import mongodb from "mongodb"

const ObjectId = mongodb.ObjectID

let user

export default class UserDAO {
    static async injectDB(conn){
        if(user){
            return
        }
        try{
            user = await conn.db(process.env.C_TRACKER_NS).collection("user")
        }
        catch(e){
            console.error(
                `Unable to establish a collection handle in userDAO: ${e}`,
            )
        }
    }

    static async getUsers({
        filters=null,
        page=0,
        userPerPage=20,}
        = {}) {
            let query
            if(filters){
                if("name" in filters){
                    query = {$text: {$search: filters["name"]}}
                }else if ("id" in filters){
                    query = {"_id": {$eq: ObjectId(filters["id"])}}
                }
            }

            let cursor
            
            try{
                cursor = await user.find(query) 
            }
            catch(e){
                console.error(`Unable to issue find command, ${e}`)
                return { usersList: [], totalNumUsers: 0}
            }

            const displayCursor = cursor.limit(userPerPage).skip(userPerPage * page)

            try{
                const usersList = await displayCursor.toArray()
                const totalNumUsers = await user.countDocuments(query)

                return {usersList, totalNumUsers}
            }
            catch(e){
                console.error(
                    `Unable to convert cursor to array or problem counting documents, ${e}`
                )
                return {usersList: [], totalNumUsers:0}
            }
        }      

    
    static async addUser(
        userInfo,
        location, 
        currently_infected, 
        organization) {

        try {
            const userDoc = { 
                username: userInfo.username,
                password: userInfo.password,
                email: userInfo.email,
                location: location,
                currently_infected: currently_infected,
                organization: organization
            }
            return await user.insertOne(userDoc)
        } 
        catch (e) {
            console.error(`Unable to create user: ${e}`)
            return { error: e }
        }
    }
    
    static async updateUser(userId,location, currently_infected, organization) {
    try {
        const updateResponse = await user.updateOne(
        { _id: ObjectId(userId)},
        { $set: { 
                    location: location,
                    organization: organization,
                    currently_infected: currently_infected
            } },
        )

        return updateResponse
    } catch (e) {
        console.error(`Unable to update user: ${e}`)
        return { error: e }
        }
    }
        
        //   static async deleteReview(reviewId, userId) {
        
        //     try {
        //       const deleteResponse = await reviews.deleteOne({
        //         _id: ObjectId(reviewId),
        //         user_id: userId,
        //       })
        
        //       return deleteResponse
        //     } catch (e) {
        //       console.error(`Unable to delete review: ${e}`)
        //       return { error: e }
        //     }
        //   }
}
        
