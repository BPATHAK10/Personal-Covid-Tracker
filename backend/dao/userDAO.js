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

        static async getUserByID(id) {
            try {
                const pipeline = [
                    {
                        $match: {
                            _id: ObjectId(id)
                        }
                    }, 
                    {
                        $lookup: {
                            from: 'contacts',
                            let:{
                                  id: "$_id"
                            },

                        pipeline:[
                        {
                            $match:{
                                $expr:{
                                    $eq:["$owner","$$id"]
                                }
                            }
                        }
                        ],
                    as: 'contacts'
                  }}]
                  
              return await user.aggregate(pipeline).next()
            } catch (e) {
              console.error(`Something went wrong in getUserByID: ${e}`)
              throw e
            }
          }


    static async addUser(userInfo) {

        try {
            const userDoc = { 
                username: userInfo.username,
                password: userInfo.password,
                email: userInfo.email,
            }
            return await user.insertOne(userDoc)
        } 
        catch (e) {
            console.error(`Unable to create user: ${e}`)
            return { error: e }
        }
    }
    
    static async updateUser(userId,userInfo) {
    try {
        const updateResponse = await user.updateOne(
        { _id: ObjectId(userId)},
        { $set: { 
                    username: userInfo.username,
                    password: userInfo.password,
                    email: userInfo.email,
            } },
        )

        return updateResponse
    } catch (e) {
        console.error(`Unable to update user: ${e}`)
        return { error: e }
        }
    }
}
        
