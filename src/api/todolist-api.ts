import axios from "axios";

type TodoListType = {
            id: string
            title: string
            addedDate: Date
            order: number
}

type CreateTodoListType = {
    resultCode: number
    fieldsErrors: []
    messages: string[]
    data: {
        item: TodoListType
    }
}
type UpdateTodoListType =  {
    resultCode: number
    fieldsErrors: []
    messages: string[]
    data: {}
}

type DeleteTodoListType = {
    resultCode: number
    fieldsErrors: []
    messages: string[]
    data: {}
}

type ResponseType <T = {}>= {
    //если ничего не передали то T равен пустому объекту
    resultCode: number
    fieldsErrors: []
    messages: string[]
    data: T
}
const instance = axios.create({ //у аксиуса есть метод create он создает тот же аксиус
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true, // настройка возьми куку
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '9a08c01f-a212-42b6-bf00-f90c2da32f6e',
    },
})
export const TodolistApi = {
    getTodolists() {
        return instance.get<TodoListType[]>('todo-lists')
        //обращаемся к объекту axios который будет делать запрос
        //метод get для получения todolists
        //https://social-network.samuraijs.com/api/1.1 базовый адрес затем endpoint
    },
    createTodolist(title: string) {
        return instance.post< ResponseType<{item:TodoListType}> >('todo-lists', {title})
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    getTasks(todoolistId: string){
        return instance.get<ResponseGetTasks>(`todo-lists/${todoolistId}/tasks`)
    },
    createTask(todolistId: string, title: string){
        return instance.post<ResponseCreateTaskType>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete<ResponseDeleteTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title: string){
        return instance.put<ResponseUpdateTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    }
}

type ResponseDeleteTaskType = {
    data: {}
    messages: string[]
    fieldsErrors: string[]
    resultCode: number

}
type ResponseUpdateTaskType = {
    data: TaskType
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}

type ResponseCreateTaskType = {
    data: TaskType
    messages: string[]
    fieldsErrors: any
    resultCode: number
}
type TaskType ={
    description: string
    title: string
    completed: boolean
    status: any
    priority: any
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: any
    addedDate: Date
}

type ResponseGetTasks ={
    items: TaskType[]
    totalCount: any
    error: string
}