const initState={
    numbers:[
        {id:'1',number:99},
        {id:'2',number:12},
        {id:'3',number:78}
    ]
};

const numberReducer = (state = initState, action)=>{
    switch(action.type){
        case 'INSERT_NUMBER':
            console.log('inserted number',action.number);
            break;
    }
        return state;
}

export default numberReducer;
