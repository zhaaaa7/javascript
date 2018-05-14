export default class Likes {
    constructor(){
        this.likes=[];
    }

    addLike(id, title,publisher, img){
        const like={id, title,publisher, img};
        this.likes.push(like);

        //persist the data in localstorage
        this.persistData();

        return like;
    }

    deleteLike(id){
        const index=this.likes.findIndex(el=>el.id===id);
        this.likes.splice(index,1); 

        this.persistData();
    }

    isLiked(id){
        return this.likes.findIndex(el=>el.id===id) !== -1;
    }

    getNumLikes(){
        return this.likes.length;
    }

    persistData(){
        localStorage.setItem('like',JSON.stringify(this.likes));
    }
    
    readStorage(){
        const storage=JSON.parse(localStorage.getItem('like'));

        if(storage){
            this.likes=storage;
        }
    }

}