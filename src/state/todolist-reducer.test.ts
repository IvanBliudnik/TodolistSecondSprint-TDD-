import {v1} from 'uuid'
import {TodolistType} from '../App'
import {
    addTodolistActionCreator,
    changeTodolistActionCreator,
    changeTodolistFilterAC,
    removeTodolistActionCreator,
    todolistsReducer
} from "./todolists-reducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    // 1. Стартовый state
    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    // 2. Действие
    // const action = {
    //     type: 'REMOVE-TODOLIST',
    //     payload: {
    //         id: todolistId1,
    //     },
    // } as const //обязательно для строгой типизации (литеральной!!!)
    // const endState = todolistsReducer(startState, action) по старинке, action только для тестов
    //endState(параметры которые хочем проверить).toBe(ожидаемый результат)


    const endState = todolistsReducer(startState, removeTodolistActionCreator(todolistId1))
    //а правильно через функцию removeTodolistActionCreator и параметр (todolistId1) потому что передали в action

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2)
    //потому что удалили filtrом todolistId1
    //и у нас осталься  под 0 индексом id = todolistId2
})
test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
    // const action = {
    //     type: 'ADD-TODOLIST',
    //     payload: {
    //         title: 'New Todolist',
    //     },
    // } as const //обязательно для строгой типизации (литеральной!!!)
    // const endState = todolistsReducer(startState, action)
    const endState = todolistsReducer(startState, addTodolistActionCreator('New Todolist'))
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New Todolist')
})
test('correct todolist should changed its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = "New Todolist"
    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    // const action = {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     payload: {
    //         id: todolistId2,
    //         title: newTodolistTitle,
    //     },
    // } as const
    const endState = todolistsReducer(startState, changeTodolistActionCreator(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle)
})
test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
    // const action = {
    //     type: 'CHANGE-TODOLIST-FILTER',
    //     payload: {
    //         id: todolistId2,
    //         filter: 'completed',
    //     },
    // } as const
    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, 'completed'))
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})