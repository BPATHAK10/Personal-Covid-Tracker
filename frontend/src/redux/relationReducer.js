import * as actionType from './actionTypes';


export default (relations = [], action) => {
    switch (action.type) {
      case actionType.FETCH_ALL_RELATIONS:
        return action.payload;
      case actionType.ADD_RELATION:
        return [...relations, action.payload];
      default:
        return relations;
    }
};