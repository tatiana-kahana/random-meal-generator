const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

get_meal_btn.addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(res => {
            createMeal(res.meals[0])
        });
});

const createMeal = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        }
        else {
            break;
        };
    };

    const newInnerHTML = `
    <div class="row  justify-content-center">
        <div class="col-12 col-md-6">
        <img class="img-fluid rounded-lg" src="${meal.strMealThumb}" alt="Meal Image">
        </div>

        <div class="col-12 col-md-4">
        <h4>${meal.strMeal}</h4>
        ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}

        ${meal.strArea ? `<p><strong>Origin:</strong>
            ${meal.strArea}</p>` : ''}

        ${meal.strTags ? `<p><strong>Tags: </strong>
        ${meal.strTags.split(',').join(', ')}</p>` : ''}

        <h5>Ingridients:</h5>
        <ul>
        ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
     </div>   

        <div class="col-10 my-3">
           <h2 class="text-success">Instructions:</h2>
   <div>${meal.strInstructions}</div>
        </div>

${meal.strYoutube ?
            `<div class="col-10 mb-5">
    <h3 class="text-success my-3">For more information view this video:</h3>

    <div class="embed-responsive embed-responsive-16by9">
    <iframe class="embed-responsive-item" 
    src = "https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
    </iframe>
    </div>
    </div>
`: ''}
    
    </div>`;
    meal_container.innerHTML = newInnerHTML
};

// social-panel
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
    social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
    social_panel_container.classList.remove('visible')
});

