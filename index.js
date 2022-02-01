
const express = require('express')
const app = express()

const path = require('path')

// const fs = require('fs')

// fs.readFile('text.txt', (error,datos) => {
//     if (error){
//       console.log(error)
//     }else{
//       console.log(datos.toString())
//     }
//   })



app.get('/', (request, response) => {
    
    //response.send('Hola desde mi primer API')
    response.sendFile(path.join(__dirname, '/text.txt'))
})

app.listen(8080, () => {
    console.log('Server listening')
})

//Hacer un endpoint que al llamarlo nos regrese el contenido del archivo text.txt 
// GET  /file
