//Require Express
const express = require('express');
//Require CORS
const cors = require('cors');
// Express Initialize
const app = express();
//Express Uses CORS
app.use(cors());


const port = 8000;
app.listen(port,()=> {
  console.log('listen port 8000');
})

//create api
// app.get('/hello_world', (req,res)=>{
//   res.send('Hello World');
// })

const data = [
  {
    name: 'Cosmopolitan',
    ingredients: [
      'juice',
      'alchohol',
      'olives?'
    ]
  },
  {
    name: 'Dark and Stormy',
    ingredients: [
      'lime',
      'ice',
      'ginger beer',
      'dark rum'
    ]
  }, 
  {
    name: "Manhattan",
    ingredients: [
      'something',
      'something else'
    ]
  }
]

app.get('/cocktailList', (req, res)=>{
  res.send(data);
})

// app.get('/cocktailList', (req, res)=>{
//   res.send({
//     name: 'Cosmopolitan',
//     ingredients: [
//       'juice',
//       'alchohol',
//       'olives?'
//     ]});
// })

// app.get('/hello/:id', function (req, res, next) {
//   res.json({msg: 'Hello world, we are CORS-enabled!'});
// });

// app.listen(80, function () {
//   console.log('CORS-enabled web server is listening on port 80');
// });