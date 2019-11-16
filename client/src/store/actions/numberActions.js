export const insertNumber = (number) =>{
    return (dispatch, getState)=>{
        dispatch({type:'INSERT_NUMBER', number})
    }
};

