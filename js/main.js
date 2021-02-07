findFoodBySearch = (id) => {
    // console.log(id.slice(7));
    
    let IdNum = id.slice(7);
    let ContainerGet = document.getElementById("item");
    ContainerGet.innerHTML = "";
    let mealId = arrayOfAllMeals[IdNum];
    let markup = `
        <img src="${mealId.strMealThumb}" class="img-fluid rounded img-1" alt="">
        <br>
        <br>
        <h3 class="h4 text-light">${mealId.strMeal}</h3>
        <hr class="col-5 mx-auto bg-light">
        <div class="text-left text-white">
            
            <h5 class="text-white h5">Ingredients:</h5>
            <ul id="allIngre" class="ml-4 text-light">
            </ul>

            
        </div>
        <br>
        <br>
        
    `;
    ContainerGet.innerHTML = markup;

    let ulOfInge = document.getElementById("allIngre");
    const nameofIng = "strIngredient1";
    const measureofIng = "strMeasure1";
    for(let i = 1; i<=100 ;i++){
        if(mealId[nameofIng+i] == undefined || mealId[nameofIng+i] == null || mealId[nameofIng+i] ==""){
            break;
        }
        let newIng = `
            <li>
                <p><i class="far fa-hand-point-right text-primary mr-2"></i> ${mealId[measureofIng+i]} ${mealId[nameofIng+i]}</p>
            </li>
        `;
        ulOfInge.innerHTML += newIng;
    }
    // console.log(mealId.strIngredient1);
}
var arrayOfAllMeals = [];
const api = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
var searchButton = document.getElementById("search");
searchButton.addEventListener("click", () => {
    // If search button is clicked, I need to get the value from input bar first
    var inputValue = document.getElementById("foodSearch").value;
    // console.log(inputValue);
    // Now if the value is empty, i should alert to search for something
    if (inputValue.length == 0) {
        alert("Please write something first in the box!!");
    }
    else {
        fetch(api + inputValue)
            .then(res => res.json())
            .then(data => {
                //  console.log(data.meals);
                let allResult = document.getElementById("all-items");
                allResult.innerHTML = "";
                let i = 0;
                const arrayOfMeals = data.meals;
                arrayOfAllMeals = data.meals;
                arrayOfMeals.forEach(meal => {
                    // console.log(meal.strArea);
                    let mealName = meal.strMeal;
                    let imageLink = meal.strMealThumb;
                    let markup = `
                    <div class="searched-item">
                    <img src="${imageLink}" class="img-fluid img-2" alt="">
                        <h6 class="h6 mt-2 text-center font-weight-bolder">${mealName}</h6>
                        <div class="col-6 px-0 mx-auto">
                            <button onclick="findFoodBySearch(this.id)" id="btn-no-${i}" class="btn-sm btn btn-outline-secondary">Details</button>
                        </div>
                    </div>
                    `;
                    i++;
                    allResult.innerHTML += markup;
                });
            })
            .catch((error) => {
                alert("Sorry The Recipe not found! :(")
            })
    }
    document.getElementById("foodSearch").value = "";
});
