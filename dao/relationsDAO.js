import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let relations

export default class RelationDAO {
    static async injectDB(conn) {
        if(relations){
            return
        }
        try {
            relations = await conn.db(process.env.RESTREVIEWS_NS).collection("relations")
          } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
          }
    }

    static async getRelations(){
        let cursor

        try{
            cursor = await relations.find({})
        }
        catch(e){
            console.error(`Unable to issue find command, ${e}`)
            return { relations:[]}
        }
        try{
            const relationsList = await cursor.toArray()
            return {relationsList}
        }
        catch(e){
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            )
            return {relations: [],}
        }
    }

    static async addRelation(relationName){
        const RelationDoc = {
            relation_name: relationName
        }
        
        return await relations.insertOne(RelationDoc)
    }
    catch (e) {
        console.error(`Unable to post review: ${e}`)
        return { error: e }
    }    
}