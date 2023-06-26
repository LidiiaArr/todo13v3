import React, {useEffect, useState} from 'react'
import axios from "axios";
import {TodolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}
const setting = {
    withCredentials: true,
    headers: {
        'API-KEY': '9a08c01f-a212-42b6-bf00-f90c2da32f6e'
    }
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        TodolistApi.getTodolists()
            .then((res) => {
            setState(res.data.map(td => td))
        }) //инкапсуляция
    }, [])
    return <div>{JSON.stringify(state)}</div>
    // JSON.stringify любой тип данных в строку
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'MurMurMur'
        TodolistApi.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = '187aaf60-5792-4045-93b6-c3bcac428291'
        TodolistApi.deleteTodolist(todoId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
//здесь необходимо указать url параметр - id тудулиста который мы хотим удалить
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId = '1d530c44-8ba6-4f73-b71c-cad77492e972'
        const title = 'MurMur!!Yes'
        TodolistApi.updateTodolist(todoId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}