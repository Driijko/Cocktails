// Import libraries
const express = require('express');
const cors = require('cors');
const axios = require('axios');

// Express Initialize
const app = express();
// Express Uses CORS
app.use(cors());

// Set up our server
app.listen(process.env.PORT || 8000,()=> {
  console.log('listen port 8000');
})

// For now we just hard code the set of cocktail names we will include for our app.
const drinkNames = [
  'bloody mary',
  'cosmopolitan',
  'daiquiri',
  'dark and stormy',
  'mai tai',
  'manhattan',
  'margarita',
  'martini',
  'mint julep',
  'mojito',
  'moscow mule',
  'negroni',
  'old fashioned',
  'pina colada',
  'whiskey sour',
  'white russian'
]

// This is the data structure we will eventually use to send to our front end, but for now we'll keep it empty.
const data = [];

app.get('/cocktailList', async (req, res)=> {
  
  // Step 0: Iterate through each type of cocktail
  for (let i = 0 ; i < drinkNames.length ; i++) {

    // Let's first make sure our local data structure is set up correctly to receive the data it needs.
    data[i] = {
      name: drinkNames[i],
      ingredients: []
    }

    // Step 1: Make a bunch of API calls, one for each cocktail
    const drinkData = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${data[i].name}`);

    // Step 2: Iterate through each ingredient
    // In the database, each ingredient is listed as a property of the form 'strIngredient1', 'strIngredient2', etc
    // There is a max of 15 ingredients per drink.
    for(let j = 1 ; j < 16 ; j++ ) {

      // Step 3: Parse data
      // For a given type of drink, there can be multiple versions.
      // The 'drinks' property is an array, 
      // each element of which contains a given version of a type of drink, like margaritas.
      // We always grab the first version as a "default" version, hence using the index '0' below.
      let currentIngredient = drinkData.data.drinks[0][`strIngredient${j}`];

      // Step 4: Update our local data structure.
      // If a given drink has less than 15 ingredients, there will be a series of null 'strIngredient' properties.
      // Once we reach a 'null' ingredient, we break from the loop. 
      // Otherwise, we add it to our data object.
      if (currentIngredient !== null) {
        data[i].ingredients.push(currentIngredient); 
      }
      else break;
    }
  }

  // Step 5: Send our data to our front-end.
  res.send(data);

});