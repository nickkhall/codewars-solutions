// This is one of those times I think I didn't have the most efficient algorithm.. xP

function manipulateString(str, arr, measurement) {
  let string = str;

  for (let i = 0; i < arr.length; i++) {
    const match = arr[i];
    const matchRegEx = new RegExp(`${match}`);
    let calc = match.match(/\//g) ? match.replace(/[a-zA-Z]+/g, '').trim() : parseInt(match.match(/\d{1,}/g).join(''));

    if (typeof calc === 'string' && calc.match(/\//g)) {
      calc = calc.split('/')[0] / calc.split('/')[1];
    }

    string = string.replace(matchRegEx, `${match} (${Math.ceil(calc * measurement)}g)`);
  }

  return string;
}

function convertRecipe(recipe){
  const tbspRegEx = new RegExp(/(\S{1,}\stbsp)/, 'g');
  const tspRegEx = new RegExp(/(\S{1,}\stsp)/, 'g');
  const tbspArr = recipe.match(tbspRegEx);
  const tspArr = recipe.match(tspRegEx);

  if (tbspArr) {
    return manipulateString(recipe, tbspArr, 15);
  }

  if (tspArr) {
    return manipulateString(recipe, tspArr, 5);
  }
}

// TESTS
if (convertRecipe("2 tbsp of butter") === "2 tbsp (30g) of butter") {
  console.log(true);
} else {
  console.log(false);
  console.log('YOURS:', convertRecipe("2 tbsp of butter"));
}

if (convertRecipe("Add to the mixing bowl and coat well with 1 tbsp of olive oil & 1/2 tbsp of dried dill") === "Add to the mixing bowl and coat well with 1 tbsp (15g) of olive oil & 1/2 tbsp (8g) of dried dill") {
  console.log(true);
} else {
  console.log(false);
  console.log('YOURS:', convertRecipe("Add to the mixing bowl and coat well with 1 tbsp of olive oil & 1/2 tbsp of dried dill"));
}

if (convertRecipe("drizzle 1/2 tbsp of heroine on your eyelids") === "drizzle 1/2 tbsp (8g) of heroine on your eyelids") {
  console.log(true);
} else {
  console.log(false);
  console.log('YOURS:', convertRecipe("drizzle 1/2 tbsp of heroine on your eyelids"));
}

if (convertRecipe("In another bowl, add 2 tsp of vanilla extract, 3 tsp of baking soda and 1/2 tsp of salt") === "In another bowl, add 2 tsp (10g) of vanilla extract, 3 tsp (15g) of baking soda and 1/2 tsp (3g) of salt") {
  console.log(true);
} else {
  console.log(false);
  console.log('YOURS:', convertRecipe("In another bowl, add 2 tsp of vanilla extract, 3 tsp of baking soda and 1/2 tsp of salt"));
}
