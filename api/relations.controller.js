import RelationDAO from "../dao/relationsDAO.js"
import pool from "../db.js"

export default class RelationsController{
    static async apiGetRelations(req,res,next){
        try{
            // let relations = await RelationDAO.getRelations()
            // if (!relations){
            //     res.status(404).json({error: "Not found"})
            //     return
            // }
            // res.json(relations)

            const relations = await pool.query('SELECT * FROM "Relations"')
            // console.log(relations)

            if(relations.rowCount===0){
                res.status(404).json({error: "Not found"})
                return
            }
            res.json(relations.rows)
        }
        catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error:e})
        }
    }
    static async apiPostRelation(req,res,next){
        try{
            const relation_name = req.body.relation_name
            // console.log(relation_name)
            // const RelationResponse = await RelationDAO.addRelation(relation_name)

            const RelationResponse = await pool.query('INSERT INTO "Relations" (relation_name) VALUES ($1) RETURNING *',[relation_name])
            // console.log(RelationResponse)
            // console.log(RelationResponse.rows[0])

            res.json(RelationResponse.rows[0])
        }
        catch(e){
            res.status(500).json({error: e.message})
        }
    }
}