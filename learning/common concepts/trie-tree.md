```js
class TrieNode {
    constructor(val) {
        this.value = val;
        this.children = [];
    }
}

class TrieTree {
    constructor() {
        this.root = new TrieNode('');
    }

    insertNode(obj, keyLength) {
        let node = this.root;
        const values = Object.values(obj);
        for (let i in values) {
            if (!node.children[values[i]]) {
                node.children[values[i]] = new TrieNode(values[i]);
                if (i == keyLength - 1) {
                    node.children[values[i]].children = 'end';
                }
            }
            node = node.children[values[i]];


        }
    }
}



const data = [{
    "province": "浙江",
    "city": "杭州",
    "name": "西湖"
}, {
    "province": "四川",
    "city": "成都",
    "name": "锦里"
}, {
    "province": "四川",
    "city": "成都",
    "name": "方所"
}]

const keys = ['province', 'city', 'name']

const tree = new TrieTree();
const res = [];
for (let i of data) {
    tree.insertNode(i, keys.length);
}

console.log(tree);


```
