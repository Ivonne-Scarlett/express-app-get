
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

app.use(express.json())  //sin esta línea no se puede leer el body

app.get('/koders', async (request, response) => {
    const data = await fsPromise.readFile('kodemia.json','utf8')
    const db = JSON.parse(data)
    let kodersFound = db.koders

    if (request.query.max_age){
        kodersFound = kodersFound.filter((koder)=>{
            return koder.age <= parseInt(request.query.max_age)
        })
    }
    response.json(kodersFound)
})

app.get('/koders/:id', async (request, response) => {
    const id = request.params.id
    const data = await fsPromise.readFile('kodemia.json','utf8')
    const db = JSON.parse(data)    
    const idFound = db.koders.filter((koder) => {
        return koder.id.toString() === id.toString()
    })
    response.json(idFound)
})


// app.get('/koders/:name', async (request, response) => {
//     const name = request.params.name
//     const data = await fsPromise.readFile('kodemia.json','utf8')
//     const db = JSON.parse(data)
//     const koderFound = db.koders.find((koder) => {
//         return koder.name.toLowerCase() === name.toLowerCase()
//     })
//     response.json(koderFound)
// })


// app.get('/koders/sex/:sex', async (request, response) => {
//     const sex = request.params.sex
//     const data = await fsPromise.readFile('kodemia.json','utf8')
//     const db = JSON.parse(data)
//     // const sexFound = db.koders.map((koder) => {
//     //     return koder.sex.toLowerCase() === sex.toLowerCase()
//     // })    
//     const sexFound = db.koders.filter((koder) => {
//         return koder.sex.toLowerCase() === sex.toLowerCase()
//     })
//     response.json(sexFound)
// })


//Crear un koders
app.post('/koders', async (request, response) => {

    const data = await fsPromise.readFile('kodemia.json', 'utf8')
    const db = JSON.parse(data)

    const newKoderId = db.koders.length + 1
    const newKoderData = {
        id: newKoderId,
        ... request.body
    }

    db.koders.push(newKoderData)

    const dbAsString = JSON.stringify(db, '\n', 2)
    await fsPromise.writeFile('kodemia.json', dbAsString, 'utf8')

    response.json(db.koders)
})


//Borrar algun koder
app.delete('/koders/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    const data = await fsPromise.readFile('kodemia.json','utf8')
    const db = JSON.parse(data)

    const newKodersArray = db.koders.filter((koder) => id !== koder.id)
    db.koders = newKodersArray

    const dbAsString = JSON.stringify(db, '\n', 2)
    await fsPromise.writeFile('kodemia.json',dbAsString, 'utf8')

    response.json(db.koders)
})


//Endpoint para actualizar info de un koder existente
app.patch('/koders/:id', async (request, response) => {
    const id = parseInt(request.params.id)

    if(isNaN(id)){
        response.status(400)
        .json({
            message: 'ID must be a number'
        })
        return        
    }

    const data = await fsPromise.readFile('kodemia.json','utf8')
    const db = JSON.parse(data)

    const koderFoundIndex = db.koders.findIndex((koder) => id === koder.id)

    if (koderFoundIndex < 0){
        response.status(404)
        response.json({ 
            message: 'Koder not found'
        })
        return
    }

    db.koders[koderFoundIndex] = {
        ...db.koders[koderFoundIndex],
        ...request.body
    }

    const dbAsString = JSON.stringify(db, '\n', 2)
    await fsPromise.writeFile('kodemia.json', dbAsString, 'utf8')

    response.json(db.koders[koderFoundIndex])
})






//PARA MENTORS
app.get('/mentors', async (request, response) => {
    const data = await fsPromise.readFile('kodemia.json','utf8')
    const db = JSON.parse(data)
    let mentorsFound = db.mentors   
    response.json(mentorsFound)
})

app.get('/mentors/:id', async (request, response) => {
    const id = request.params.id
    if(isNaN(id)){
        response.status(400)
        .json({
            message: 'ID must be a number'
        })
        return        
    } 
    const data = await fsPromise.readFile('kodemia.json','utf8')
    const db = JSON.parse(data)    
    const idFound = db.mentors.filter((mentor) => {
        return mentor.id.toString() === id.toString()
    })
    response.json(idFound)
})


//Crear un MENTOR
app.post('/mentors', async (request, response) => {
    const data = await fsPromise.readFile('kodemia.json', 'utf8')
    const db = JSON.parse(data)
    const newMentorId = db.mentors.length + 1
    const newMentorData = {
        id: newMentorId,
        ... request.body
    }
    db.mentors.push(newMentorData)
    const dbAsString = JSON.stringify(db, '\n', 2)
    await fsPromise.writeFile('kodemia.json', dbAsString, 'utf8')
    response.json(db.mentors)
})


//Borrar algun Mentor
app.delete('/mentors/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    const data = await fsPromise.readFile('kodemia.json','utf8')
    const db = JSON.parse(data)
    const newMentorsArray = db.mentors.filter((mentor) => id !== mentor.id)
    db.mentors = newMentorsArray
    const dbAsString = JSON.stringify(db, '\n', 2)
    await fsPromise.writeFile('kodemia.json',dbAsString, 'utf8')
    response.json(db.mentors)
})


//Actualizar mentor
app.patch('/mentors/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    if(isNaN(id)){
        response.status(400)
        .json({
            message: 'ID must be a number'
        })
        return        
    }
    const data = await fsPromise.readFile('kodemia.json','utf8')
    const db = JSON.parse(data)
    const mentorFoundIndex = db.mentors.findIndex((mentor) => id === mentor.id)
    if (mentorFoundIndex < 0){
        response.status(404)
        response.json({ 
            message: 'Mentor not found'
        })
        return
    }
    db.mentors[mentorFoundIndex] = {
        ...db.mentors[mentorFoundIndex],
        ...request.body
    }
    const dbAsString = JSON.stringify(db, '\n', 2)
    await fsPromise.writeFile('kodemia.json', dbAsString, 'utf8')
    response.json(db.mentors[mentorFoundIndex])
})

app.listen(8080, () => {
    console.log('Server listening')
})


