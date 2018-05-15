## npm and node
1. npm comes with node
2. `npm init` => `package.json` file is used to share the needed packages info
```
decDependencies: {"webpack":...},
dependencies: {"jQuery":...}
```

install packages with npm
```
npm install webpack --save-dev
npm install jquery --save
npm uninstall jquery --save

psudo npm install live-server --global
```

## webpack -- bundle
1. basic property: entry point, output, plug-ins and loaders

`webpack.config.js` file

```javascript
const path=require('path');

module.exports = {
    entry: ['./src/js/index.js'],
    output: {
        path:path.resolve(__dirname,'dist'),   // need an absolute path
        filename:'./js/bundle.js'
    },
};
```
**Note:** output need an absolute path

2. To access webpack through command line
```
npm install webpack-cli --save-dev  // webpack command line interface
```
```javascript
"scripts": {
    "dev": "webpack --mode development",
    "build": "webpack --mode production",
}
```


3. webpack dev-server: real server and auto reload
```
npm install webpack-dev-server --save-dev
```
```javascript
devServer:{
        contentBase:'./dist'
    },
```
```javascript
"scripts": {
    "dev": ...
    "build":...
    "start": "webpack-dev-server --mode development --open"
  },
```
```
npm run start
```
**Note:** webpack-dev-server will bundle the file and directly inject it into the index.html in dist folder, you don't need a real bundle.js file. If you want to see the file: `npm run dev` or `npm run build`.


4. plug-ins -- allow us to do complex processing of input files
```
npm install html-webpack-plugin --save-dev
```

copy the html file from src folder to dist folder
```javascript
const path=require('path');
const HTMLWebpackPlugin=require('html-webpack-plugin');

module.exports = {
    ...
    ...

    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
```

### babel  -- a javascipt compiler
1. 
```
npm install babel-core babel-preset-env babel-loader --save-dev
```
`babel-loader` is for webpack to load babel

2. loaders in webpack -- allow us to import and process different files, such as compile sass to css..
```javascript
module.exports = {
    ...
    ...
    ...
    module: {
        rules:[
            {
                test:/\.js$/,   //find all js file, exclude those in node_modules
                exclude:/node_modules/,
                use: {
                    loader:"babel-loader"
                }
            }
        ]
    }
};
```

3. `.babelrc` file -- set the target running environment
```javascript
{
    "presets": [
        ["env",{
            "targets":{
                "browser":[
                    "last 5 versions",
                    "ie >= 8"
                ]
            }
        }]
    ]
}
```

4. polyfill -- directly go to the final code
```
npm install babel-polyfill --save
```
```javascript
module.exports = {
    entry: ['babel-polyfill','./src/js/index.js'],
    ...
};
```


5. summarize step 
1) npm install babel-core babel-preset-env babel-loader --save-dev, add loader in webpack.config

2) .babelrc

3) npm install babel-polyfill --save and add to entry 'entry: ['babel-polyfill','./src/js/index.js']'


## app architecture - MVC
<img src="https://github.com/zhaaaa7/javascript/blob/master/project/recipe/recipe-structure.png" alt="recipe app architecture" width="700px">


## notes
1. uppercase name for model module file
2. different kinds of import
```javascript
import str from './models/Search';   

import {add as a, multi, id} from './views/searchView';  
 
import * as searchView from './views/searchView'; 

```
3. api: http://food2fork.com/about/api

### axios 
1. `npm install axios --save`
2. `import axios from 'axios';`
3. axios automatically returns json, not like fetch which needs transform
```javascript
 async function getRecipe(query){
     const proxy='https://cors-anywhere.herokuapp.com/';
     const key="e64b877f1d43f34d7612ffca67cbb98e";
     try{
          const res=await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`);
          const recipes=res.data.recipes;
     } catch (error){
            ...
     }
}
```

**Note:** await pause the funtion and the funtion keeps on running as long as the promise resolves


### Search class
```javascript
export default class Search {
    constructor(query){
        this.query=query;
    }

    async getResultes() {
        try {
            const res=await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result=res.data.recipes;
        }catch(error){
            console.log(error);
        }
        
    }
}
```
```javascript
const search=new Search('pizza');
search.getResultes();
```


### app state
1. all data defined in our app in a given moment is saved in one central object
2. 
```javascript
//global state -- Search object, current recipe, shopping list, liked recipe
const state={};
```

3. 
```javascript
state.search=new Search(query);
```
**Note**: use `await` to wait for the async function `state.search.getResultes()` to resolve (return undefined). It pauses the function and ensure the `this.result` to receive data
```javascript
await state.search.getResultes();

console.log(state.search.result);
```
### base.js
1. element object to save all html string

### seachView.js
1. getInput -- return the input value
2. renderResults -- show all retrieved recipes on UI
3. template string `...`, add variable to html attribute `#${..}`, append new list item `insertAdjacentHTML('beforeend',markup);`

```javascript
const renderRecipe  = recipe => {
    const markup=`
                    <li>
                        <a class="results__link" href="#${recipe.recipe_id}">
                            <figure class="results__fig">
                                <img src="${recipe.image_url}" alt="Test">
                            </figure>
                            <div class="results__data">
                                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                                <p class="results__author">${recipe.publisher}</p>
                            </div>
                        </a>
                    </li>
                `;
    elements.seachResLidt.insertAdjacentHTML('beforeend',markup);
};
```
```javascript
searchView.renderResult(state.search.result);
```
4. clear result
```
.value='';
.innerHTML='';
```
5. limit recipe title to <17
```javascript
// pasta with tomato and spinach
// ['pasta','with','tomato','and','spinach']
// acc: 0
// acc: 5
// acc: 9
// acc: 15

export const limitRecipeTitle =(title, limit=17)=>{
    const newTitle=[];
    if(title.length > limit){
        title.split(' ').reduce((acc,cur)=>{
            if(acc+cur.length<=limit){
                newTitle.push(cur);  //if the total length < 17, push the next word
            }
            return acc+cur.length;
        },0);
        
        return `${newTitle.join(' ')} ...`;
    }
    
    return title;  // if the title is short, return the original title
};
```
6. highlight the selected/active recipe

```javascript
export const highlightedSelector=id=>{
    const resultsArr=Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el=>{
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};
```
in index.js: 
```
if(state.search){
            searchView.highlightedSelector(id);
}
```

**Note**: check if there is search there


### spinner
1. spinner is inserted as the first child of the `parent` element
```javascript
export const renderLoader = parent => {
    const loader=`
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin',loader);
};
```
```javascript
renderLoader(elements.seachRes);
```


### pagination
1.
```javascript
export const renderResult = (recipes,page=1,resPerpage=10) => {
    //render results of current page
    const start=(page-1)*resPerpage; //0 10 20
    const end=page*resPerpage;   //10 20 30
    
    recipes.slice(start,end).forEach(renderRecipe);  //recipes.forEach(relement=>renderRecipe(element));
};
```
2. HTML data-* attribute
```javascript
const createButton = (page, type)=>`
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1 : page+1}>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
    <span>Page ${type === 'prev' ? page-1 : page+1}</span>
    </button>
`;
```

3. closest -- get the closest element that matches the selector
```javascript
elements.seachResPages.addEventListener('click',e=>{
    const btn=e.target.closest('.btn-inline');   // get the closest button, so clicking on the text or h2 or svg
    if(btn){
        const goToPage=parseInt(btn.dataset.goto,10); //a string
        searchView.clearResults();
        searchView.renderResult(state.search.result,goToPage);
    }
});
```
**Note**:  use `.dataset` to extract the data-* attribute, it is a string



### Recipe.js -- get detailed info of each recipe based on `id`
1. Recipe class
```javascript
export default class Recipe {
    constructor(id){
        this.id=id;
    }

    async getRecipe(){
        try {
            const res=await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
            // all the value we need
            this.title=res.data.recipe.title;
            this.publisher=res.data.recipe.publisher;
            this.img=res.data.recipe.image_url;
            this.url=res.data.recipe.source_url;
            this.ingredients=res.data.recipe.ingredients;            
        }catch(error){
            console.log(error);
            alert('Something went wrong');
        }
    }
 ```

2. testing with Recipe class
```javascript
const r=new Recipe(47746);
r.getRecipe();
console.log(r);
```

3. updateServings()

### recipe control
1. read data from page URL `href="#${recipe.recipe_id}` in renderRecipe() so you can use the hashchange event
```javascript
const controlRecipe=async ()=>{
    const id=window.location.hash.;
    console.log(id); //#47746
 }
 
// if the hash changes
window.addEventListener('hashchange',controlRecipe);
```    

2. instanciate a Recipe
```javascript
state.recipe=new Recipe(id);
```

3. add same event handler to different event

'load' event : to retain the data when page reloads

```javascript
// window.addEventListener('hashchange',controlRecipe);
// window.addEventListener('load',controlRecipe);
['hashchange','load'].forEach(event=>window.addEventListener(event,controlRecipe));
```

4. pareIngredients() 
```javascript
...
// 1. uniform units
....
unitsLong.forEach((unit,index)=>{
    ingredient=ingredient.replace(unit, units[index]);
});

// 2. remove parentheses with RegEx
ingredient=ingredient.replace(/ *\([^)]*\) */g, ' ');

// 3. parse each ingredient to count unit ingredients
const arrIngredient=ingredient.split(' ');

//find the index of the unit, if any
const unitIndex=arrIngredient.findIndex(el2=>units.includes(el2));
```
**Note**: `arrIngredient.findIndex(el2=>unitShort.includes(el2));` a solution to find the unkown item 

5. eval('...') -- evaluate the string and execute it
```javascript
if(arrCount.length===1){
    count=eval(arrIngredient[0].replace('-','+')); // 4-1/2 -> "4+1/2" => 4.5
}else{
    count=eval(arrIngredient.slice(0,unitIndex).join('+'));  // "4+1/2" => 4.5
}
```

6. the new ingredient object is now 
```javascript
const newIngredients=this.ingredients.map(el=>{

    ......
    objIngredient={
            count: 1,
            unit: '',
            ingredient: ingredient
        };
    }

    return objIngredient;
});

this.ingredients=newIngredients;
 ```


### recipeView.js
1. renderRecipe()
render ingredients' list
```javascript
${recipe.ingredients.map(el=>createIngredient(el)).join('')}
```
2. Franctional package ----- 2.5 => 2 1/2
```
npm install fractional --save
```
```javascript
import {Fraction} from 'fractional';

..

const formatCount=count=>{
    if(count){    
        const newCount=Math.round(count*10000)/10000; // deal with the long floating
        const [int,dec]=newCount.toString().split('.').map(el=>parseInt(el,10)); //destructuring the float number

        if(!dec){
            return newCount;
        }

        if(int===0){
            //0.6
            const fr =new Fraction(newCount);
            return `${fr.numerator}/${fr.denominator}`;
        }else{
            //1.6
            const fr =new Fraction(newCount-int);
            //0.6
            return `${int} ${fr.numerator}/${fr.denominator}`;
        }

    }
    return '?';
};
```

### update the serving
1. in Recipe.js
```javascript
updateServings(type){
        //servings
        const newServings = type ==='dec' ? this.servings-1 : this.servings+1;

        //ingredients
        this.ingredients.forEach(ing=>{
            ing.count=ing.count*(newServings/this.servings);
        });
     
        this.servings=newServings;
    }
```
2. in recipeView.js
```javascript
export const updateServingsAndIngredients=recipe=>{
    document.querySelector('.recipe__info-data--people').textContent=recipe.servings;

    const countElements=Array.from(document.querySelectorAll('.recipe__count'));
    countElements.forEach((el,index)=>{
        el.textContent=formatCount(recipe.ingredients[index].count);
    });
};
```
3. add event listener to Recipe area
```javacript
elements.recipe.addEventListener('click',e=>{
    //decrease the serving
    if(e.target.matches('.btn-decrease, .btn-decrease *')){ // btn-increase * : all descendants of btn-increase
        if(state.recipe.servings>1){
            //update the serving in Recipe 
            state.recipe.updateServings('dec');
            //update the serving on UI
            recipeView.updateServingsAndIngredients(state.recipe);
        }   
    //increase the serving     
    }else if(e.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc');
        recipeView.updateServingsAndIngredients(state.recipe);
    }
    
});
```

**Note**: `Array.from(document.querySelectorAll('.recipe__count'));` to convert Nodelist to array

### lists (shooping list)
1. set id for each list item

2. findIndex(), splice()
```javascript
//[1,2,3] -> spice(1,1)-> [1,3]
deleteItem(id){      
    const index=this.items.findIndex(el=>el.id===id); //find the el that matches the passes id
    this.items.splice(index,1); 
}
````
**Note**: splice(start,numberToDelete) --> find the deleted one, return it , mutate the original array
3. find()
```javascript
updateCount(id, newCount){
    this.items.find(el=>el.id===id).count=newCount;
}
```


### likes
1. isLiked() -- find the id in Liked list
```javascript
isLiked(id){
    return this.likes.findIndex(el=>el.id===id) !== -1;
}
````

2. toggle like button -- setAttribute of the svg for the heart
```javascript
export const toggleLikeBun= isliked =>{
    const iconString=isliked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${iconString}`);
};
```

in recipeView.js -- retain the isLiked state
```javascript
...
<button class="recipe__love">
    <svg class="header__likes">
        <use href="img/icons.svg#icon-heart${isLiked?'':'-outlined'}"></use>
    </svg>
</button>

.....
```
3. toggle the like menu
```javascript
export const toggleLikeMenu= numLikes =>{
    elements.likesMenu.style.visibility= numLikes>0 ? 'visible' : 'hidden' ; 
};
```

4. delete like item in list
```javascript
export const deleteLike = id =>{
    const el=document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if(el){
        el.parentElement.removeChild(el);
    }
};
```
**Note**: ```querySelector(`.likes__link[href*="${id}"]`)```, attribute selector


### web localStorage api -- data persist through page loads
1. basics
```javascript
localStorage.setItem('key','value');
localStorage.getItem('key');
localStorage.length;
```
2. persist likes 
```javascript
persistData(){
    localStorage.setItem('like',JSON.stringify(this.likes));
}

readStorage(){
    const storage=JSON.parse(localStorage.getItem('like'));

    if(storage){
        this.likes=storage;
    }
}
```

**Note**: `JSON.parse('[]')` will return null
