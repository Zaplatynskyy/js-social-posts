const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

// ciclo for di inserimento post nell'html tanti quanti sono i dati in nostro possesso
for(let i = 0; i < posts.length; i++) {
    const {id, content, media, author, likes, created} = posts[i];
    const {name, image} = author;
    
    // assegno a post il div creato dalla funzione createPost
    const post = createPost(id, content, media, likes, created, name, image);
    
    // infine appendo la struttura post all'interno del nostro container
    const container = document.getElementById('container');
    container.append(post);

    // funzionalità al click del pulsante "mi piace"
    const likeButton = document.querySelector(`a[data-postid="${id}"]`);
    likeButton.addEventListener("click",
        function(event) {
            // rimuovo gli eventi di default dal pulsante in quanto un <a> con href
            event.preventDefault();

            // verifico se il bottone tag di riferimento abbia la classe che definisce l'aver messo mi piace al post e assegno a likes il numero di mi piace al post
            const isLiked = likeButton.classList.contains('like-button--liked');
            let likes = parseInt(document.getElementById(`like-counter-${id}`).innerHTML);

            if(isLiked) {
                // se abbiamo gia messo mi piace alla pagina rimuovo il like rimuovendo la classe e decremento i likes al post di uno ( quello inserito dall'utente stesso )
                likeButton.classList.remove('like-button--liked');
                likes--;
                
            } else {
                // altrimenti se non abbiamo messo mi piace alla pagina aggiungo il like con la classe e aumento i likes al post di uno ( quello inserito dall'utente stesso )
                likeButton.classList.add('like-button--liked');
                likes++;

            }
            // infine stampo i likes al post dopo il click
            document.getElementById(`like-counter-${id}`).innerHTML = likes;
        }
    );
}


// **********Funzioni

// Funzione per definire e ritornare l'elemento div con classe post con passaggio di parametri variabili
function createPost(id, content, media, likes, created, name, image) {
    // modifico il formato della data in un formato italiano (dd/mm/yyyy) 
    const data = new Date(created);
    created = data.getDate() + '-' + (data.getMonth() + 1) + '-' + data.getFullYear();

    // creo l'elemento div esterno con classe post
    const post = document.createElement('div');
    post.classList.add('post');

    // creo l'elemento div con classe post__header aggiungendo contenuto html inserendo i dati dell'array oggetti posts 
    const postHeader = document.createElement('div');
    postHeader.classList.add('post__header');
    
    if(image != null) {
        // se tra i dati del post è presente l'immagine allora inserisco il contenuto con l'immagine
        postHeader.innerHTML = `
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    <img class="profile-pic" src="${image}" alt="${name}">                    
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${name}</div>
                    <div class="post-meta__time">${created}</div>
                </div>                    
            </div>
        `;
    } else {
        // altrimenti se non presente richiamo la funzione per creare l'acronimo in una costante ed inserisco il contenuto
        const acronym = getAcronym(name);
        
        postHeader.innerHTML = `
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    <div class ="profile-pic-default">
                        <span>${acronym}</span>
                    </div>                   
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${name}</div>
                    <div class="post-meta__time">${created}</div>
                </div>                    
            </div>
        `;
    }

    // creo l'elemento div con classe post__text aggiungendo contenuto html inserendo il dato dell'array oggetti posts 
    const postText = document.createElement('div');
    postText.classList.add('post__text');
    postText.innerHTML = `${content}`;

    // creo l'elemento div con classe post__image aggiungendo contenuto html inserendo il dato dell'array oggetti posts 
    const postImage = document.createElement('div');
    postImage.classList.add('post__image');
    postImage.innerHTML = `<img src="${media}" alt="">`;

    // creo l'elemento div con classe post__footer aggiungendo contenuto html inserendo i dati dell'array oggetti posts
    const postFooter = document.createElement('div');
    postFooter.classList.add('post__footer');
    postFooter.innerHTML = `
        <div class="likes js-likes">
            <div class="likes__cta">
                <a class="like-button  js-like-button" href="#" data-postid="${id}">
                    <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                    <span class="like-button__label">Mi Piace</span>
                </a>
            </div>
            <div class="likes__counter">
                Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
            </div>
        </div>
    `;

    // appendo i div creati (con classe post__header, post__text, post__image, post__footer) all'interno del div con classe post, pormando la struttura completa del singolo post del nostro sito
    post.append(postHeader, postText, postImage, postFooter);

    return post;
}

// funzione che mi restituisce l'acronimo di un dato testo
function getAcronym(text) {
    const nameArray = text.split(" ");
    let acronym = '';
    for(let i = 0; i < nameArray.length; i++) {
        acronym += nameArray[i].charAt(0);
    }   

    return acronym;
} 

