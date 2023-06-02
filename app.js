$(document).ready(function () {
    let searchBtn = $("#search-btn");
    let mealCard = $("#meal-card");
    searchBtn.on("click", function () {
      let el = document.querySelector("#meal").value.trim();
      // if(!el){
      //   alert("Lutfen deyer giriniz")
      //   return
      // }
      let myData = fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${el}`
      );
  
      myData
        .then((response) => response.json())
        .then((data) => {
          //console.log(data)
          let cardMeal = "";
  
          if (data.meals && el) {
            mealCard.addClass(
              "d-flex flex-wrap justify-content-between align-items-center"
            );
            data.meals.forEach((meal) => {
              let { strMeal, strMealThumb, idMeal } = meal;
              cardMeal += ` <div class="card mb-3" style="width: 18rem " id="cardEl" >
   <img
   src="${strMealThumb}" alt="..."
  />
  <div class="card-body"  >
   <h5 class="card-title">${strMeal}</h5>
   <button  id="get-recipe" data-id ="${idMeal}" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Get Recipe</button>
  </div>
  </div>`;
            });
          } else {
            mealCard.removeClass(
              "d-flex flex-wrap justify-content-between align-items-center"
            );
            cardMeal = "Sorry We didn't find any meal";
            //  mealCard.addClass("text-light")
            mealCard.css({
              color: "red",
              "font-size": "1.8rem",
              "font-weight": 600,
            });
          }
          mealCard.html(cardMeal);
        });
    });
  
    //console.log(card)
  
    mealCard.on("click", "#get-recipe", function () {
      console.log($(this).attr("data-id"));
      let m = $(this).attr("data-id");
      let mySecondData = fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${m}`
      );
      mySecondData
        .then((response) => response.json())
        .then((data) => mealRecipeModal(data.meals));
    });
  
    // Modal olusturma
    function mealRecipeModal(meal) {
      meal = meal[0];
      let { strCategory, strInstructions, strMealThumb, strYoutube } = meal;
      let ModalTitle = document.querySelector(".modal-title")
      ModalTitle.innerHTML = `${strCategory}`
      let  modalBody = document.querySelector(".modal-body")
      modalBody.innerHTML = `
     <img src ="${strMealThumb}" style="width:200px;border-radius:50%" class="mb-2">
     <p> ${strInstructions}</p>
     <p><a href="${strYoutube}" style ="text-decoration: none " class="btn btn-outline-danger">How to make this meal</a></p>
  
  
  
  
           `
    }
  });
  