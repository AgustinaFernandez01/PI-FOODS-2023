const types = [
    "vegetarian", // No ingredients may contain meat or meat by-products, such as bones or gelatin.
    "lacto ovo vegetarian", // All ingredients must be vegetarian and none of the ingredients can be or contain egg.
    "vegan", // No ingredients may contain meat or meat by-products, such as bones or gelatin.
    "paleolithic", // Allowed ingredients include meat (especially grass fed), fish, eggs, vegetables, some oils.
    "primal", // Very similar to Paleo, except dairy is allowed - think raw and full fat milk, butter, ghee, etc.
    "lowFodmap", // FODMAP stands for "fermentable oligo-, di-, mono-saccharides and polyols". 
    "gluten free",
    "dairy free",
    "whole 30", // Allowed ingredients include meat, fish/seafood, eggs, vegetables, fresh fruit, coconut oil, olive oil.
  ];
   
  module.exports = {types};