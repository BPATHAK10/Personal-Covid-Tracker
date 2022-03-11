import * as actionType from './actionTypes';


const relationsReducer = (relations = [], action) => {
    switch (action.type) {
      case actionType.FETCH_ALL_RELATIONS:
        return action.payload;
      case actionType.ADD_RELATION:
        return [...relations, action.payload];
      default:
        return relations;
    }
};

export default relationsReducer