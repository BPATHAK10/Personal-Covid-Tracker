import { FETCH_ALL_RELATIONS, ADD_RELATION } from '../redux/actionTypes';
import * as api from '../api/index.js';

export const getAllRelations = () => async (dispatch) => {
    try {
      let { data } = await api.fetchRelations();
  
      // console.log("relations in get all relations::",data)
  
      //refactor data
      data = data.relationsList.map(item=>({
        id: item.relation_name,
        title: item.relation_name
      }))
      data.push({id:"self",title:"self"})
      // console.log("relations in get all relations after refactor::",data)

      
      dispatch({ type: FETCH_ALL_RELATIONS, payload: data });
  
  } catch (error) {
      console.log(error);
  }}
  
  export const createRelation = (relation) => async (dispatch) => {
    try {
      console.log("in add relation", relation)
      let { data } = await api.createRelation(relation);
      
      console.log("in create relation::",data)
  
      dispatch({ type: ADD_RELATION, payload: data });
    } catch (error) {
      console.log(error);
    }
  };