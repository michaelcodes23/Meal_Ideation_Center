console.log("Start writting your app Michael!");
//Outlining the parameters needed to call the API

//url from API for Spanish BETA version below, can only take in q, calories, and from&to parameters (~200K recipes)
//successful test URL below
// https://test-es.edamam.com/search?q=steak&app_id=c1f787ef&app_key=809df3f12124da2008808998cec73ef2&from=0&to=10&calories=1000
// const query = `https://test-es.edamam.com/search`
//English API with 2.3MM+ recipes
const query = `https://api.edamam.com/search`
const results = "";
const apiKey = `&app_key=809df3f12124da2008808998cec73ef2`
const app_id = `&app_id=c1f787ef`
const q = `?q=steak`
const r = `https://www.cookstr.com/Beef-Recipes/Skirt-Steak-and-Hanger-Steak`
const from = `&from=0`
const to = `&to=10`
const cs = `&cuisineType=american`
const calories = `&calories=1000%2B`
//+ = %2B
// calories is labeled as followes: Min+,Min-Max, or Max
//only use q for this project, look into CORS errors afterwards

//Adding an array to automatically add options to the cuisine form 


$(()=>{
            $('.output').hide();
            $('.primeSubmit').hide();
            $('.calories').hide();
            $('.meal').hide();
            $('.cuisine').hide();
    console.log("JQuery is on!")
    let cusURL = ``
    let mealURL = ``
    let calURL = ``
    let qURL =``
    $('#q').on('submit',() => {
    event.preventDefault()
    qURL= `?q=`+$('input[type="text"]').val()
    console.log(qURL)
    $('.formDiv').fadeOut(1000);
    $('.meal').fadeIn(1500);
    
  })
    const cusType = $('.cusType')
    const cuisineType = ['','American','Asian','British','Caribbean','Central Europe','Chinese','Eastern Europe','French','Indian','Italian','Japanese','Kosher','Mediterranean',
                    'Mexican','Middle Eastern','Nordic','South American','South East Asian','Surprise Me!']
        for(let i = 0; i < cuisineType.length; i++){
            const option = $('<option>').text(cuisineType[i]);
            cusType.append(option);
            // console.log(cuisineType[i])
        }

    //Change - binds an event handles to the 'change' JS event, or trigger that event on an element
    
    // console logging the selections from the meal types
    $(document).ready(function(){
        $('#mealDown').on('change',function(){
            let meal = ($('#mealDown option:selected').text()).toLowerCase()
                mealURL = `&mealType=`+meal;
                console.log(mealURL);
                $('.meal').fadeOut(1000);
                $('.cuisine').fadeIn(1500);            
        })
    })
    // console logging the selections from the cuisine types
    $(document).ready(function(){
        $('#cuisineDown').on('change',function(){
            let cuisine = ($('#cuisineDown option:selected').text()).toLowerCase();
            if(cuisine == 'Surprise Me!'){
                cusURL = ''
            $('.cuisine').fadeOut(1000);
            $('.calories').fadeIn(1500);
            $('.primeSubmit').fadeIn(1600);
            }
            else{
            cusURL = `&cuisineType=`+cuisine;
            console.log(cusURL);
                $('.cuisine').fadeOut(1000);
            $('.calories').fadeIn(1500);
            $('.primeSubmit').fadeIn(1600);
            }
           
        })
    })
    //console logging the selected checkbox for desired calories
    $(document).ready(function(){
        $('#checkbox').on('change',function(){
            let cal = String($("input[name='cal']:checked").parent('label').text())
            console.log(cal)
            if(cal == "1000+"){
                calURL = "&calories=1000%2B"
                console.log(calURL)
            }
            else if(cal == "500 to less than 1000"){
                calURL ="&calories=500-999"
                console.log(calURL)
            }
            else if(cal == "Less than 500"){
                calURL ="&calories=500"
                
                console.log(calURL)
            }
            
        })
    })
    const callMyRecipe = () =>{
             // $('.output').fadeIn(2000)
    if(qURL == `` ){
        alert("Please make sure to include a craving and press submit in the first text box, we can't give you options if you don't let us know what you are in the mood for (i.e. chicken, steak, etc.)! :) ")
        $('.formDiv').fadeIn(500);
        $('.primeSubmit').fadeIn(500);
    }
    const newURL = `${query}${qURL}${app_id}${apiKey}${from}${to}${calURL}${mealURL}${cusURL}`
    console.log(newURL);
    $.ajax({
        url: newURL,
        type: "Get"
    }).then(function(data){
        //add for loop to add three separate outputs to the div
        console.log(data.hits.length);
        const arr = []
        for(let i = 0; i < 3; i++){
            const index = Math.round(Math.random()*(data.hits.length - 1));
            if(arr.includes(index)){
                console.log("We already output that recipe!");
                i--;
            }
            else if (i == 0){
            
                arr.push(index);
                console.log("First output's index is " + index);
                // const index = Math.round(Math.random()*data.hits.length);
                const cont = $('.container')
        //creating a recipe title variable
                const title = $('<h3>').addClass("recTitle").text(data.hits[index].recipe.label);
        //creating a calories variable with amount of servings
                const calories = $('<h4>').text("Amount of Calories: " +Math.round(data.hits[index].recipe.calories)+(" (" + data.hits[index].recipe.yield + " servings)"));
        //creating an image variable and giving it a imageRecipe class
                const $img = $('<img>').attr('src', data.hits[index].recipe.image).addClass("imageRecipe")
                console.log($img);
        //creating a variable with a link to the full recipe
                const a = $('<a>',{href:data.hits[index].recipe.url});
                console.log(data.hits[index].recipe.url);
        //creating a recipe h4 tag
                const ingr = $('<h4>').text("Ingredients for " +data.hits[index].recipe.label+ ":").addClass("ingr")
        //appending each item within the ingredientLines class to ingr 
                for(let i = 0; i < data.hits[index].recipe.ingredientLines.length;i++){
                const eachIngr = $('<h5>')
                ingr.append(eachIngr.text(data.hits[index].recipe.ingredientLines[i]));
                }
        //appending all variables to the div container
                $('.Rec1').empty();
                $('.Rec1').append(title);
                $('.Rec1').append(calories);
                // $('.4').empty();
                $('.Rec1').append(a.append($img));
                // $('.7').empty();
                $('.Rec1').append(ingr);
            }
            else if (i == 1){
                console.log("Second output's index is " + index);
                arr.push(index);
                // const index = Math.round(Math.random()*data.hits.length);

                const cont = $('.container')
        //creating a recipe title variable
                const title = $('<h3>').addClass("recTitle").text(data.hits[index].recipe.label);
        //creating a calories variable with amount of servings
                const calories = $('<h4>').text("Amount of Calories: " +Math.round(data.hits[index].recipe.calories)+(" (" + data.hits[index].recipe.yield + " servings)"));
        //creating an image variable and giving it a imageRecipe class
                const $img = $('<img>').attr('src', data.hits[index].recipe.image).addClass("imageRecipe")
                console.log($img);
        //creating a variable with a link to the full recipe
                const a = $('<a>',{href:data.hits[index].recipe.url});
                console.log(data.hits[index].recipe.url);
        //creating a recipe h4 tag
                const ingr = $('<h4>').text("Ingredients for " +data.hits[index].recipe.label+ ":").addClass("ingr")
        //appending each item within the ingredientLines class to ingr 
                for(let i = 0; i < data.hits[index].recipe.ingredientLines.length;i++){
                const eachIngr = $('<h5>')
                ingr.append(eachIngr.text(data.hits[index].recipe.ingredientLines[i]));
                }
        //appending all variables to the div container
                $('.Rec2').empty();
                $('.Rec2').append(title);
                $('.Rec2').append(calories)
                // $('.5').empty();
                $('.Rec2').append(a.append($img));
                // $('.8').empty();
                $('.Rec2').append(ingr);
            }
            else if (i == 2){
                console.log("Third output's index is " + index);
                arr.push(index);
                // const index = Math.round(Math.random()*data.hits.length);
             
                const cont = $('.container')
        //creating a recipe title variable
                const title = $('<h3>').addClass("recTitle").text(data.hits[index].recipe.label);
        //creating a calories variable with amount of servings
                const calories = $('<h4>').text("Amount of Calories: " +Math.round(data.hits[index].recipe.calories)+(" (" + data.hits[index].recipe.yield + " servings)"));
        //creating an image variable and giving it a imageRecipe class
                const $img = $('<img>').attr('src', data.hits[index].recipe.image).addClass("imageRecipe")
                console.log($img);
        //creating a variable with a link to the full recipe
                const a = $('<a>',{href:data.hits[index].recipe.url});
                console.log(data.hits[index].recipe.url);
        //creating a recipe h4 tag
                const ingr = $('<h4>').text("Ingredients for " +data.hits[index].recipe.label+ ":").addClass("ingr")
        //appending each item within the ingredientLines class to ingr 
                for(let i = 0; i < data.hits[index].recipe.ingredientLines.length;i++){
                const eachIngr = $('<h5>')
                ingr.append(eachIngr.text(data.hits[index].recipe.ingredientLines[i]));
                }
        //appending all variables to the div container
                $('.Rec3').empty();
                $('.Rec3').append(title);
                $('.Rec3').append(calories);
                // $('.6').empty();
                $('.Rec3').append(a.append($img));
                // $('.9').empty();
                $('.Rec3').append(ingr);
            }
          
            console.log(arr)
        }
           
            const text = $('<div>').attr("id","bodyElements").addClass("bottom");
            text.append('<h4>').text("To learn about the recipes click on respective the image above!")
            // if($('.output').includes(text)){
            //     console.log("text class and button are already included")
            // }
            // else{
            $('.output').append(text);
            const restButton = $('<button>').addClass("refreshButton").text("Click here to refresh and try a new culinary experience!")
            $(text).append(restButton);
            // }
            $(".refreshButton").on('click', () => {
            $('.output').fadeOut(1000);
            $(text).empty();
            $('.container').fadeIn(2000);
            $('.formDiv').fadeIn(2000);
            $('.primeSubmit').fadeIn(2000);
            $('.calories').fadeIn(2000);
            $('.meal').fadeIn(2000);
            $('.cuisine').fadeIn(2000);
            // $('.container').fadeIn(3000);
            })

            

    }
        //in case of an error with acquiring the data, output the message below
        ,(error) => {
        console.error(error)
        alert(`Apologies, our data source could not find your desired craving. Let's try different options :)`);
        }
        //make sure that recipes do not repeat
    )
    }

    $('#submit').on('click', () => {
        $('.container').hide();
        $('.primeSubmit').hide();
        $('.calories').hide();
        $('.output').show();
        callMyRecipe();
        

    })
    
})


//Test code below
    // const getData = ()=>{
    //     $.ajax({
    //         //calling the API using the outlined variables above
            
    //         url: `${query}${q}${app_id}${apiKey}${from}${to}${calories}${cs}`,
    //         type: "GET"
    //     }).then(function(data) {
    //         //lets me know data was acquired
    //     alert("Retrieved records from the dataset!");
    //     console.log(data);
    //     //Testing my AJAX output
    //     // console.log(data.hits[0].recipe.uri);
    //     console.log(data.hits[2].recipe.url);
    //     console.log(data.hits[2].recipe.image);
    //     console.log(data.hits[2].recipe.label);
    //     //Rounding off calores
    //     console.log(Math.round(data.hits[2].recipe.calories));
    //     console.log("Length of hits is " + data.hits.length);
    //     const index = Math.round(Math.random()*data.hits.length);
    //     console.log(index);
    //     //displaying ingredients one item at a time, otherwise would output array
    //     for(let i = 0; i < data.hits[2].recipe.ingredientLines.length;i++){
    //     console.log(data.hits[2].recipe.ingredientLines[i]);
    //     }
    //     //
    //     const cont = $('.container')
    //     //console.logs all of the items in a row up to 2 separate strings
    //     // console.log(JSON.stringify(data.hits[0].recipe,null,2));
    //     //creating a recipe title variable
    //     const title = $('<h3>').text(data.hits[2].recipe.label);
    //     //creating a calories variable with amount of servings
    //     const calories = $('<h4>').text("Amount of Calories: " +Math.round(data.hits[2].recipe.calories)+(" (" + data.hits[2].recipe.yield + " servings)"));
    //     //creating an image variable and giving it a imageRecipe class
    //     const $img = $('<img>').attr('src', data.hits[2].recipe.image).addClass("imageRecipe")
    //     console.log($img);
    //     //creating a variable with a link to the full recipe
    //     const a = $('<a>',{href:data.hits[2].recipe.url});
    //     console.log(data.hits[2].recipe.url);
    //     //creating a recipe h4 tag
    //     const ingr = $('<h4>').text("Ingredients for " +data.hits[2].recipe.label+ ":")
    //     //appending each item within the ingredientLines class to ingr 
    //     for(let i = 0; i < data.hits[2].recipe.ingredientLines.length;i++){
    //         const eachIngr = $('<h5>')
    //         ingr.append(eachIngr.text(data.hits[2].recipe.ingredientLines[i]));
    //     }

    //     //appending all variables to the div container
    //     $('.1').append(title);
    //     $('.1').append(calories)
    //     $('.4').append(a.append($img));
    //     $('.7').append(ingr);
          

    //     }
    //     //in case of an error with acquiring the data, output the message below
    //     ,(error) => {
    //     console.error(error)
    //     }
    //     )
    // }
    // getData();