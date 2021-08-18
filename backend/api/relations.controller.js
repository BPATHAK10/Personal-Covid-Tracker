import RelationDAO from "../dao/relationsDAO.js"

export default class RelationsController{
    static async apiGetRelations(req,res,next){
        try{
            let relations = await RelationDAO.getRelations()
            if (!relations){
                res.status(404).json({error: "Not found"})
                return
            }
            res.json(relations)
        }
        catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error:e})
        }
    }
    static async apiPostRelation(req,res,next){
        try{
            const relation_name = req.body.relationName
            const RelationResponse = await RelationDAO.addRelation(relation_name)
            res.json(RelationResponse.ops[0])
        }
        catch(e){
            res.status(500).json({error: e.message})
        }
    }
}