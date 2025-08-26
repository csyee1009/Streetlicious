// ingredient.js
$(document).ready(function () {
    $("#searchBtn").click(function () {
        const ingredient = $("#ingredientInput").val().trim();
        if (!ingredient) {
            alert("Please enter an ingredient!");
            return;
        }

        $("#results").html("<p>Loading...</p>");

        $.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`, function (data) {
            $("#results").empty();
            if (data.meals) {
                data.meals.forEach(meal => {
                    $("#results").append(`
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <h3>${meal.strMeal}</h3>
              <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank">View Details</a>
            </div>
          `);
                });
            } else {
                $("#results").html("<p>No meals found with that ingredient.</p>");
            }
        }).fail(function () {
            $("#results").html("<p style='color:red;'>Failed to fetch data.</p>");
        });
    });
});