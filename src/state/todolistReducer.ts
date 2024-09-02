import { TodolistType } from '../App'
import { v1 } from 'uuid'

type ActionsType = {
    type: string
    payload: any
}

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
]

export const todolistReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id) // логика по удалению тудулиста
        }
        case 'ADD-TODOLIST': {
            const todolistId = v1()
            const newTodolist: TodolistType = { id: todolistId, title: action.payload.title, filter: 'all' }
            return [...state, newTodolist]
             // логика по добавлению тудулиста
        }
        default:
            throw new Error("I don't understand this type")
    }
}