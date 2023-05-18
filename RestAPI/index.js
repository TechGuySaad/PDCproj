const express = require('express')
const app = express()
const cors = require('cors');

app.use(express.json()) //ability to process request in json format
app.use(cors());

//mongoose -> MongoDB

const courses = [
    { id: 1, name:'course 1'},
    { id: 2, name:'course 2'},
    { id: 3, name:'course 3'}

   
]

app.get('/',(req,res) =>{

    res.send('Hello world')

})

app.get('/api/courses', (req,res) => {
    console.log('got a req')
    res.send(courses)
})

// /api/courses/1
// id is parameter
// req.params is an object

app.get('/api/courses/:id', (req,res) => {
    // res.send(courses[req.params.id - 1])
    const course = courses.find(c => c.id === parseInt(req.params.id))

    if(!course) res.status(404).send('course with given id was not found')//404
    res.send(course)
    // res.send(req.query)

    // /api/courses/1?sortBy=name ,this is query parameters and is optional
})



// app.post()
// we use post request to create a new course

app.post('/api/courses', (req,res)=>{
    const course = {
        id: courses.length + 1,
        name: req.body.name, //in our request there is a body and it has a name property

    }

    courses.push(course)
    res.send(course)
})


// app.put()update
// app.delete() delete

// PORT -> environment variable

const port = process.env.PORT || 3001;
app.listen(port, ()=>{
    console.log(`the server is listening on port ${port}`)
})
