const posts=[
    { title:'Post One', body: 'This is post one', createdAt: new Date().getTime()},
    { title:'Post Two', body: 'This is post two', createdAt: new Date().getTime()}
];

function getPosts(){
   setTimeout(() => {
    let output='';
    posts.forEach((post, index) =>{
        output += `<li>${post.title}</li>`;
    });
    document.body.innerHTML = output;
   },1000 )
}

function createPost(post){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push({...post, createdAt: new Date().getTime()});

           const error = false;
           if(!error){
            resolve();
           }else{
            reject('Error: Something went wrong');
           }
        },2000);
});
}

function create4thPost(post, callback){
    setTimeout(() =>{
        posts.push(post);
        callback();
    },2000);
}

function deletePost(){
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            if(posts.length>0){
                const lastelement = posts.pop()
                resolve (lastelement);
            }else{
                reject('Array is empty now');
            }
        },1000);
     });
}

createPost({ title:'Post Three', body: 'This is post three', createdAt: new Date().getTime()})
createPost({ title:'Post Four', body:'This is post four'},getPosts)
.then(() => {
    getPosts()
    deletePost().then(()=>{
    getPosts()
    deletePost().then(()=>{
        getPosts();
        deletePost().then(() => {
            getPosts();
            deletePost().then(() => {
                getPosts();
                deletePost().then(() => {})
                .catch((err) => {
                    console.log('Inside catch block', err)
                })
            })
        })
    })
})
})
.catch(err => console.log(err))
