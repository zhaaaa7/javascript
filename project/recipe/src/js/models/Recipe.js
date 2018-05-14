import axios from 'axios';
import {key, proxy} from '../config';

export default class Recipe {
    constructor(id){
        this.id=id;
    }

    async getRecipe(){
        try {
            const res=await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
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

    calcTime(){
        const numIng=this.ingredients.length;
        const periods=Math.ceil(numIng/3);
        this.time=periods*15
    }

    calcServings(){
        this.servings=4;
    }

    pareIngredients(){
        const unitsLong=['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
        const unitShort=['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
        const units=[...unitShort,'kg','g'];
        const newIngredients=this.ingredients.map(el=>{
            // 1. uniform units
            let ingredient=el.toLowerCase();
            unitsLong.forEach((unit,index)=>{
                ingredient=ingredient.replace(unit, units[index]);
            });

            // 2. remove parentheses
            ingredient=ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3. parse each ingredient to count unit ingredients
            const arrIngredient=ingredient.split(' ');
            const unitIndex=arrIngredient.findIndex(el2=>units.includes(el2));

            let objIngredient;
            //there is a unit
            if(unitIndex>-1){               
                const arrCount=arrIngredient.slice(0,unitIndex); // 4 1/2 cups=> [4, 1/2]
                let count;
                if(arrCount.length===1){
                    count=eval(arrIngredient[0].replace('-','+')); // 4-1/2
                }else{
                    count=eval(arrIngredient.slice(0,unitIndex).join('+'));  //"4+1/2" => 4.5
                }
                objIngredient={
                    count,
                    unit: arrIngredient[unitIndex],
                    ingredient: arrIngredient.slice(unitIndex+1).join(' ')
                };
            //there is no unit, but find a count number at the beginning
            }else if(parseInt(arrIngredient[0],10)){               
                objIngredient={
                    count: parseInt(arrIngredient[0],10),
                    unit: '',
                    ingredient: arrIngredient.slice(1).join(' ')
                };
            //no unit and no number at the begining
            }else if (unitIndex===-1){                
                objIngredient={
                    count: 1,
                    unit: '',
                    ingredient: ingredient
                };
            }

            return objIngredient;
        });

        this.ingredients=newIngredients;
    }

    updateServings(type){
        //servings
        const newServings = type ==='dec' ? this.servings-1 : this.servings+1;

        //ingredients
        this.ingredients.forEach(ing=>{
            ing.count=ing.count*(newServings/this.servings);
        });

        
        this.servings=newServings;
    }
}