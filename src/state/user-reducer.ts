type StateType = {
    age: number
    childrenCount: number
    name:string
}
type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'BlaBla1':

            case 'YO':

        default:
            throw new Error(`I dont understand this action type`);
    }
}