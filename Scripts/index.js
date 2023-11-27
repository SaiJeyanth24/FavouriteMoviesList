const addMovieModal=document.querySelector('nav button');
const backDrop=addMovieModal.parentElement.previousElementSibling;
const formModal=document.querySelector('.form');
const addMovieList=formModal.lastElementChild.lastElementChild;
const cancelMovieList=addMovieList.previousElementSibling;
const movieTitle=document.getElementById('movie-title');
const imageURL=document.getElementById('image-url');
const rating=document.getElementById('rating');
const ul=document.querySelector('.items');
const defaultText=document.querySelector('.list p');
const confirmModal=formModal.nextElementSibling;
const confirmYes=confirmModal.querySelector('.--add');
const confirmNo=confirmYes.previousElementSibling;

let count=0;

let runningItemNode='';
let runningItemObj='';
// let updateFlag=false;

const updatedMovieListener = () =>{
    console.log(runningItemNode);
    const updatedMovie = {
        name: movieTitle.value,
        url: imageURL.value,
        rated: rating.value,
    }
    count--;
    // updateFlag=true;
    runningItemNode.remove();
    displayMovieList(updatedMovie);
    removeMovieModal();
}

const removeConfirmModal = () =>{
    backDrop.classList.remove('visible');
    confirmModal.classList.remove('visible');
}

const deleteItem = (item) =>{
    backDrop.classList.add('visible');
    confirmModal.classList.add('visible');
    runningItemNode=item;
}

const editItem = (movieData,node) =>{
    movieTitle.value=movieData.name;
    imageURL.value=movieData.url;
    rating.value=movieData.rated;
    runningItemNode=node;
    addMovieList.removeEventListener('click',addMovieListener);
    addMovieList.addEventListener('click',updatedMovieListener);
    backDrop.classList.add('visible');
    formModal.classList.add('visible');
}

const removeListItem = () =>{
    runningItemNode.remove();
    runningItemNode='';
    removeConfirmModal();
    count--;
    if(count===0)
    defaultText.style.display='block';
}

const displayMovieList = (movie) =>{
    count++;
    const newBreak=document.createElement('br');
    const newLi=document.createElement('li');
    const newImg=document.createElement('img');
    const newPara=document.createElement('p');
    const newRating=document.createElement('span');
    const newDiv=document.createElement('div');
    const newEdit=document.createElement('span');
    const newDelete=document.createElement('span');

    newLi.classList.add('modal');
    newImg.src=movie.url;
    newImg.alt=movie.name;

    newPara.textContent=movie.name;
    newPara.id='movie-name';

    newRating.textContent=`⭐ ${movie.rated}/5`;
    newRating.id='user-rating';

    newDiv.id='change';

    newEdit.textContent='✎';
    newDelete.textContent='🗙';

    newEdit.id='edit-logo';
    newDelete.id='delete-logo';

    newDiv.append(newEdit,newDelete);

    newLi.append(newImg,newPara,newBreak,newRating,newDiv);

    ul.append(newLi);

    newEdit.addEventListener('click',() =>{
        editItem(movie,newLi);
    });
    newDelete.addEventListener('click',() =>{
        deleteItem(newLi);
    });

    // if(updateFlag)
    // runningItemNode.replace(newLi);
}


const addMovieModalListener = () =>{
    backDrop.classList.add('visible');
    formModal.classList.add('visible');
    addMovieList.removeEventListener('click',updatedMovieListener);
    addMovieList.addEventListener('click',addMovieListener);
}

const removeMovieModal = () =>{
    backDrop.classList.remove('visible');
    formModal.classList.remove('visible');
}


const addMovieListener = () =>{
    if(movieTitle.value==='')
    alert('Please enter movie title!');
    else if(rating.value<1||rating.value>5)
    alert('please enter valid rating (between 1 to 5)!');
    else
    {
        const movie = {
            name: movieTitle.value,
            url: imageURL.value,
            rated: rating.value
        }
        movieTitle.value='';
        imageURL.value='';
        rating.value='';
        displayMovieList(movie);
        removeMovieModal();
        defaultText.style.display='none';
    }
    
}

addMovieModal.addEventListener('click',addMovieModalListener);
cancelMovieList.addEventListener('click',removeMovieModal);
addMovieList.addEventListener('click',addMovieListener);
confirmNo.addEventListener('click',removeConfirmModal);
confirmYes.addEventListener('click',removeListItem);