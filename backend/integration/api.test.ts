import { expect, test } from 'vitest'


test('Adivnia letra correcta', async() => {
    const {id}=await fetch("http://localhost:8000/create-game",{
        method:"POST",
        body:JSON.stringify({word:"hola"})
    }).then(x=>x.json())
    
    const res=await fetch("http://localhost:8000/guess-letter",{
        method:"POST",
        body:JSON.stringify({gameId:id, letter:'h'.charCodeAt(0)})
    }).then(x=>x.json())

    expect(res).toEqual({type:"correct", encoded:"h###"})
})

test('Adivnia letra incorrecta', async() => {
    const {id}=await fetch("http://localhost:8000/create-game",{
        method:"POST",
        body:JSON.stringify({word:"hola"})
    }).then(x=>x.json())
    
    const res=await fetch("http://localhost:8000/guess-letter",{
        method:"POST",
        body:JSON.stringify({gameId:id, letter:'p'.charCodeAt(0)})
    }).then(x=>x.json())

    expect(res).toEqual({type:"wrong", lives:6})
})