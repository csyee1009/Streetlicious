
document.addEventListener("DOMContentLoaded", function () {
    // Get the list of global and local favorites from localStorage
    let globalFavorites = JSON.parse(localStorage.getItem("favoritesglobal")) || [];
    let localFavorites = JSON.parse(localStorage.getItem("favoriteslocal")) || [];

    // Get the container where we will display the favorite foods
    const favoritesList = document.getElementById("favorites-list");

    // Combine both global and local favorites into a single list
    let favorites = [...globalFavorites, ...localFavorites];

    // If there are no favorite foods
    if (favorites.length === 0) {
        favoritesList.innerHTML = "<p>You have no favorite foods yet.</p>";
    } else {
        // Loop through the favorite foods and create buttons
        favorites.forEach(food => {
            const displayFood = food.replace(/_/g, ' ');
            const foodItem = document.createElement("div");
            foodItem.classList.add("favorite-food-item");

            // Check if the food is global or local and set image source and URL accordingly
            let isGlobal = globalFavorites.includes(food);
            let foodPage = isGlobal ? 'globalfdetail.html' : 'localfdetail.html';
            let foodImagePath = isGlobal ? `assets/img/globalfood/${food}.jpg` : `assets/img/localfood/${food}.jpg`;

            foodItem.innerHTML = `
                    <button class="favorite-food-btn">
                        <div class="food-btn-content">
                            <img src="${foodImagePath}" alt="${food}" class="food-image">
                            <span class="food-name">${displayFood}</span>
                        </div>
                    </button>
                    <button class="delete-btn" id="delete-${food}">DELETE</button>
                `;

            // Append the food item to the list
            favoritesList.appendChild(foodItem);

            // Handle the click event to go to the correct food detail page
            foodItem.querySelector('.favorite-food-btn').addEventListener("click", function () {
                window.location.href = `${foodPage}#${food}`;
            });

            // Handle the delete button click
            foodItem.querySelector('.delete-btn').addEventListener("click", function () {
                // Remove food from the correct favorites array
                if (isGlobal) {
                    globalFavorites = globalFavorites.filter(f => f !== food);
                } else {
                    localFavorites = localFavorites.filter(f => f !== food);
                }

                // Update localStorage with the new favorites array
                localStorage.setItem("favoritesglobal", JSON.stringify(globalFavorites));
                localStorage.setItem("favoriteslocal", JSON.stringify(localFavorites));

                // Remove the food item from the DOM
                foodItem.remove();

                // Show a message if the list is empty
                if (globalFavorites.length === 0 && localFavorites.length === 0) {
                    favoritesList.innerHTML = "<p>You have no favorite foods yet.</p>";
                }
            });
        });
    }
});
