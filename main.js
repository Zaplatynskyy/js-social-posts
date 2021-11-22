// Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro javascript in cui:
// - Creiamo il nostro array di oggetti che rappresentano ciascun post.
// Ogni post dovrà avere le informazioni necessarie per stampare la relativa card: nome autore, foto profilo, data, testo del post, immagine (non tutti i post devono avere una immagine), numero di likes.
// Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>) - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed. - Rendiamo il tasto "Mi Piace" cliccabile con incremento del counter dei like
// Formattare le date in formato italiano (gg/mm/aaaa)
// Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
// Al click su un pulsante "Mi Piace" di un post, incrementare il contatore di like al post e cambiare colore al testo del bottone.

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

    const likeButton = document.querySelector(`a[data-postid="${id}"]`);
    likeButton.addEventListener("click",
        function(event) {
            event.preventDefault();
            // console.log('funziona');

            const isLiked = likeButton.classList.contains('like-button--liked');
            // console.log(isLiked);
            // console.log(likeButton);

            let likes = parseInt(document.getElementById(`like-counter-${id}`).innerHTML);
            console.log(likes);

            if(isLiked) {
                // console.log('inserita');
                likeButton.classList.remove('like-button--liked');
                likes--;
            } else {
                // console.log('non inserita');
                likeButton.classList.add('like-button--liked');
                likes++;
            }
            document.getElementById(`like-counter-${id}`).innerHTML = likes;
        }
    );
}


// **********Funzioni

// Funzione per definire e ritornare l'elemento div con classe post con passaggio di parametri variabili
function createPost(id, content, media, likes, created, name, image) {
    // creo l'elemento div esterno con classe post
    const post = document.createElement('div');
    post.classList.add('post');

    // console.log(created);
    const data = new Date(created);
    // console.log(data);
    created = data.getDate() + '-' + (data.getMonth() + 1) + '-' + data.getFullYear()
    console.log(created);
    // creo l'elemento div con classe post__header aggiungendo contenuto html inserendo i dati dell'array oggetti posts 
    const postHeader = document.createElement('div');
    postHeader.classList.add('post__header');
    if(image != null) {
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
        // console.log(name);
        const nameArray = name.split(" ");
        // console.log(nameArray);
        let acronym = '';
        for(let i = 0; i < nameArray.length; i++) {
            acronym += nameArray[i].charAt(0);
        }
        // console.log(acronym);
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

