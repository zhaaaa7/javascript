import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';

import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

import {elements, renderLoader,clearLoader} from './views/base';


//global state---Search object, current recipe, shopping list, sliked recipe
const state={};

// window.state=state;

//-----------------search controller----------------
const controlSearch = async () => {

    // get query from the view
    const query=searchView.getInput();
    
    // new Search object
    if(query){
        state.search=new Search(query);
    }

    // prepare UI
    searchView.clearInput();
    searchView.clearResults();

    renderLoader(elements.seachRes);

    try{
        // do the search
        await state.search.getResultes(); // getResultes is an async function, returns a promise
    
        //render result on UI   
        clearLoader();
        searchView.renderResult(state.search.result);
    }catch(error){
        alert('error during searching');
        clearLoader();
    }  
};

elements.seachForm.addEventListener('submit',e=>{
    e.preventDefault();
    controlSearch();
});


// window.addEventListener('load',e=>{
//     e.preventDefault();
//     controlSearch();
// });


elements.seachResPages.addEventListener('click',e=>{
    const btn=e.target.closest('.btn-inline');   // get the closest button, so clicking on the text or h2 or svg
    if(btn){
        const goToPage=parseInt(btn.dataset.goto,10); //a string
        searchView.clearResults();
        searchView.renderResult(state.search.result,goToPage);
    }
});


//--------------------recipe controller--------------------

const controlRecipe=async ()=>{
    //get id from url
    const id=window.location.hash.replace('#','');
   
    if(id){
        //prepare UI
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //hight the selected recipe
        if(state.search){
            searchView.highlightedSelector(id);
        }

        //create a recipe object
        state.recipe=new Recipe(id);


        //create recipe data
        await state.recipe.getRecipe();
        state.recipe.pareIngredients();

        //calculation servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();

        //render
        clearLoader();
        
        recipeView.renderRecipe(state.recipe,state.likes.isLiked(id));
        
    }
};
// window.addEventListener('hashchange',controlRecipe);
// window.addEventListener('load',controlRecipe);
['hashchange','load'].forEach(event=>window.addEventListener(event,controlRecipe));




// -----------------------list controller---------------------
const controlList=()=>{
    if(!state.list){
        state.list=new List();
    }
    //add each ingredients to the list and UI
    state.recipe.ingredients.forEach(el=>{
        const item=state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
};

//handle delete list item
elements.shopping.addEventListener('click',e=>{
    //find the whole list item, so it cam be deleted
    const id=e.target.closest('.shopping__item').dataset.itemid;
    //delete
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        state.list.deleteItem(id);
        listView.deleteItem(id);
    //edit the count
    }else if(e.target.matches('.shopping__count-value')){
        const val=parseFloat(e.target.value);
        state.list.updateCount(id,val);
    }
});




//----------------------------------like contorller-----------------------

const controlLike=()=>{
    if(!state.likes) state.likes=new Likes();
    const currentID=state.recipe.id;
    
    // if is not liked
    if(!state.likes.isLiked(currentID)){
        // 1. add like to state
        const newLike=state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.publisher,
            state.recipe.img
        );

        // 2. toggle like button
        likesView.toggleLikeBun(true);

        // 3. add like to UI list
        likesView.renderLike(newLike);

    // if is already liked
    }else{
        // 1. removelike to state
        state.likes.deleteLike(currentID);

        // 2. toggle like button
        likesView.toggleLikeBun(false);

        // 3. remove like to UI list
        likesView.deleteLike(currentID);

    }

    likesView.toggleLikeMenu(state.likes.getNumLikes());

    
};

//-----------------------------restore likes from localstorage---------------------
window.addEventListener('load',()=>{
    state.likes=new Likes();

    state.likes.readStorage();

    likesView.toggleLikeMenu(state.likes.getNumLikes());

    state.likes.likes.forEach(like => likesView.renderLike(like));
});


//--------------------------handling click events in recipe component-----------------
elements.recipe.addEventListener('click',e=>{
    //decrease the serving
    if(e.target.matches('.btn-decrease, .btn-decrease *')){ // btn-increase * : all descendants of btn-increase
        if(state.recipe.servings>1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsAndIngredients(state.recipe);
        }   
    //increase the serving     
    }else if(e.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc');
        recipeView.updateServingsAndIngredients(state.recipe);
    // add to shopping cart
    }else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    // add to like
    }else if (e.target.matches(`.recipe__love, .recipe__love *`)){
        //like controller
        controlLike();
    }
    
});




