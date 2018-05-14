
import {elements, renderLoader} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value='';
};

export const clearResults = () => {
    elements.seachResLidt.innerHTML='';
    elements.seachResPages.innerHTML='';
};

export const limitRecipeTitle =(title, limit=17)=>{
    const newTitle=[];
    if(title.length > limit){
        title.split(' ').reduce((acc,cur)=>{
            if(acc+cur.length<=limit){
                newTitle.push(cur);
            }

            return acc+cur.length;
        },0);

        return `${newTitle.join(' ')} ...`;
    }
    
    return title;
};

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


// ----------------------pagination---------------------

//button type: prev/next
const createButton = (page, type)=>`
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1 : page+1}>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
    <span>Page ${type === 'prev' ? page-1 : page+1}</span>
    </button>
`;

const renderButton =(page,numResults, resPerpage)=>{
    const pages= Math.ceil(numResults/resPerpage);
    let button;
    console.log(pages,page);
    if(page===1 && pages>1){
        // next button
        button=createButton(page,'next');
    }else if(pages === page && pages>1){
        //previous page
        button=createButton(page,'prev');
    }else {
        button=`${createButton(page,'prev')} ${createButton(page,'next')} `;
    }   

    elements.seachResPages.insertAdjacentHTML('afterbegin',button);
};



export const renderResult = (recipes,page=1,resPerpage=10) => {
    //render results of current page
    const start=(page-1)*resPerpage;
    const end=page*resPerpage;
    
    recipes.slice(start,end).forEach(renderRecipe);  //recipes.forEach(relement=>renderRecipe(element));


    //render pagination button
    renderButton(page,recipes.length,resPerpage);
};


//-------------highlight the selected recipe--------------

export const highlightedSelector=id=>{
    const resultsArr=Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el=>{
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};