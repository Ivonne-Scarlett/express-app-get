
// const express = require('express')
// const app = express()

// const path = require('path')
// app.get('/', (request, response) => {    
//     //response.send('Hola desde mi primer API')
//     response.sendFile(path.join(__dirname, '/text.txt'))
// })


//Con readfile
// const fs = require('fs')
// app.get('/', (request, response) => {
//     fs.readFile('text.txt', (error, data) =>{
//         if(eror){
//             response.send('No se pudo leer')
//             return
//         }
//         reponse.send(data)
//     })
// })

// //Con promesas (then-catch)
// const fs = require('fs')
// const fsPromises = fs
// app.get('/file', (request,response) =>{
//     fsPromise.readFile('text.txt','utf8')
//         .then((data)=>{
//             response.send(data)
//         })
//         .catch((error)=>{
//             response.send('No se pudo leer')
//         })
// })

//Con async await
// const fs = require('fs')
// const fsPromise = require('fs/promises')
// app.get('/file-async', async (request, response)=>{
//     const data = await fsPromise.readFile('text.txt','utf8')
//     response.send(data)
// })


//Koders
const express = require('express')
const fsPromise = require('fs/promises')
const app = express()

app.get('/koders', async (request, response) => {
    const data = await fsPromise.readFile('kodemia.json','utf8')
    const dataParsed = JSON.parse(data)
    response.json(dataParsed.koders)
})

app.get('/koders/:name', async (request, response) => {
    const name = request.params.name
    const data = await fsPromise.readFile('kodemia.json','utf8')
    const db = JSON.parse(data)
    const koderFound = db.koders.find((koder) => {
        return koder.name.toLowerCase() === name.toLowerCase()
    })
    response.json(koderFound)
})


app.get('/koders/sex/:sex', async (request, response) => {
    const sex = request.params.sex
    const data = await fsPromise.readFile('kodemia.json','utf8')
    const db = JSON.parse(data)
    // const sexFound = db.koders.map((koder) => {
    //     return koder.sex.toLowerCase() === sex.toLowerCase()
    // })    
    const sexFound = db.koders.filter((koder) => {
        return koder.sex.toLowerCase() === sex.toLowerCase()
    })
    response.json(sexFound)
})

app.get('/koders/id/:id', async (request, response) => {
    const id = request.params.id
    const data = await fsPromise.readFile('kodemia.json','utf8')
    const db = JSON.parse(data)    
    const idFound = db.koders.filter((koder) => {
        return koder.id.toString() === id.toString()
    })
    response.json(idFound)
})




app.listen(8080, () => {
    console.log('Server listening')
})

