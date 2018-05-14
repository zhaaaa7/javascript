### npm and node
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
```
"scripts": {
    "dev": "webpack --mode development",
    "build": "webpack --mode production",
}
```


3. webpack dev-server: real server and auto reload
```
npm install webpack-dev-server --save-dev
```
```
devServer:{
        contentBase:'./dist'
    },
```
```
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
```
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
```
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
```
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
```
module.exports = {
    entry: ['babel-polyfill','./src/js/index.js'],
    ...
};
```


5. summarize step 
         1) npm install babel-core babel-preset-env babel-loader --save-dev, add loader in webpack.config
         2) .babelrc
         3) npm install babel-polyfill --save and add to entry 'entry: ['babel-polyfill','./src/js/index.js']'




6. uppercase for model module
7. 
import str from './models/Search';

import {add as a, multi, id} from './views/searchView';

import * as searchView from './views/searchView';

8. axios automatically returns json, not like fetch which needs transform

9. await pause the funtion and the funtion keeps on running as long as the promise resolves

10. testing
const r=new Recipe(47746);
r.getRecipe();
console.log(r);

11. href="#${recipe.recipe_id} so you can use the hashchange event

12. retain the data when page reloads

13. const unitIndex=arrIngredient.findIndex(el2=>unitShort.includes(el2)); find the unkown item
14. this.items.splice(); //find the deleted one, return it , mutate the original array, splice(start,numberToDelete)

15. localStorage.setItem('key','value'), getItem(), length
16. JSON.parse('[]') will return null
