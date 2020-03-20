// Import libraries
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// Express Initialize
const app = express();
// Express Uses CORS
app.use(cors());

// Set up our server
const port = 8000;
app.listen(port,()=> {
  console.log('listen port 8000');
})

// Here we set up the data structure that we will eventually send to the front end.
const data = [
  {
    name: "margarita",
    ingredients: []
  }, 
  {
    name: "cosmopolitan",
    ingredients: []
  }
];

app.get('/cocktailList', (req, res)=>{
  // Step 0: Iterate through each type of cocktail
  for (let i = 0 ; i < data.length ; i++) {

    // Step 1: Make a bunch of API calls, one for each cocktail
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${data[i].name}`)

    // Step 2: Receive data
    .then(response => {
      // console.log(response.data.drinks[0].strIngredient1);
      // for(let j = 1 ; j < 16 ; j++ ) {

      //   let currentIngredient = `strIngredient${j}`;

      //   data[i].ingredients[j - 1] = response.data.drinks[0][currentIngredient];
      // }

      // Step 3: Parse data
      data[i].ingredients[0] = response.data.drinks[0].strIngredient1;
      if (!(response.data.drinks[0].strIngredient2 === null)) {
        data[i].ingredients[1] = response.data.drinks[0].strIngredient2;
      }


    })
    .then(() => {
      if (i === data.length - 1) {
        console.log(data);
        res.send(data);
      }
    }
    )
    .catch(error => {
      console.log(error);
    });
  }
})