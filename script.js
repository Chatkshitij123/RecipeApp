const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
//function to get recipes
//then accept itin fetch recipes function with the query variable
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    //ab yeh data return kar rha hoga promise return which we use it in our promise function
    //convert the data it into json format
    const response = await data.json();
    recipeContainer.innerHTML = "";
    // console.log(response.meals[0]);
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src = "${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>

        `
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);
        //adding event listener to recipe button
        button.addEventListener('click', () => {
            openRecipePopup(meal);
        })
        recipeContainer.appendChild(recipeDiv);
        // console.log(meal);
        //pehle recipe div create hua and add hua and aise hi dusra by the use of appendChild()
    });
    //we use await - what it does - it wait for the whole process to complete then give out the whole data
    //response gives us the array we run forEach loop to get each meal one by one
}
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    //we use trim function to remove all the linear spaces
    const searchInput = searchBox.value.trim();
    //yeh input ham search input wale function ko dedenge
    fetchRecipes(searchInput);
    // console.log("Button Clicked");
})