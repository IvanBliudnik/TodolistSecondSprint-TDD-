import {FilterValuesType, TodolistType} from '../App'
import {v1} from 'uuid'

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    payload: {
        id: string
    }}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    payload: {
        title: string
    }}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        id: string,
        title: string,
    }}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterValuesType
    }}
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (state = initialState, action: ActionsType):TodolistType[] => {
    //обязательно протипизировать :TodolistType[]
    switch (action.type) //action.type это обьект ключ по которому будет отрабатывать todolistsReducer
    {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id) // логика по удалению тудулиста
        }
        case 'ADD-TODOLIST': {
            const todolistId = v1()
            const newTodolist: TodolistType = {id: todolistId, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
            // логика по добавлению тудулиста
        }
        case 'CHANGE-TODOLIST-TITLE': {
           return state.map(tl => tl.id === action.payload.id ? {...tl, title:action.payload.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER':{
            const todolistID = action.payload.id
            return state.map(tl => tl.id === todolistID ? {...tl, filter: action.payload.filter} : tl)
        }
        default:
            return state
    }
}

export const removeTodolistActionCreator = (id:string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        },
    } as const
}
export const addTodolistActionCreator = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        },
    } as const
}
export const changeTodolistActionCreator = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title
        },
    } as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        },
    } as const
}
