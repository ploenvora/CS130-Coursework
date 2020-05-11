
// This variable will always hold the "active" photo element (the div)
let activeCard = null;

// PART 1: Make the showPhoto function work
const showPhoto = (e) => {
    activeCard = e.target;
    console.log(activeCard);
    // When you click the photo, you want to carousel with the photo to show
    document.querySelector('.preview').className = "preview active";
    document.querySelector('.featured_image').style.backgroundImage = activeCard.style.backgroundImage;
};

// document.querySelector('.card').onclick = showPhoto;
// this only does the first card

// this attaches onclick to all of the cards
const cards = document.querySelectorAll('.card');
for (card of cards) {
     card.onclick = showPhoto;
}


// PART 3: Close functionality
const close = () => {
  console.log('Close me');
  document.querySelector('.preview').className = "preview"
    // a. This function should remove the “active” class from the
    //    “.preview_box” element.
    // b. Attach your newly created “close” function to the onclick
    //    event handler of the close button (in the upper right-hand corner).
};

document.querySelector('#close').onclick = close;

// PART 4: Next functionality:
// a. Modify the “next” function (below) so that that it replaces
//    the “.featured_image” background image to the next image in the list.
// b. Attach your newly created “next” function to the onclick event
//    handler of the “.next” button (in the upper right-hand corner).
// c. Also attach your “next” function to the onclick event handler of
//    the “.featured_image” element (so that clicking anywhere on the
//    image will advance it to the next one) — for convenience.
const next = () => {
    // HINTS:
    // 1. update the "activeCard" variable so that it's now the
    //    next card in the list.
    // 2. Then do the same steps as before (in the showPhoto).
    activeCard = activeCard.nextElementSibling;
    document.querySelector('.preview').className = "preview active";
    document.querySelector('.featured_image').style.backgroundImage = activeCard.style.backgroundImage;
    //onsole.log(activeCard.nextElementSibling);
}

document.querySelector('#next').onclick = next;

// PART 5: Previous functionality:
// a. Create a “previous” function that switches out the
//    “.featured_image” background image to the previous image
//    in the list.
// b. Attach your newly created “previous” function to the onclick
//    event handler of the “.prev” button (in the upper right-hand corner).

const prev = () => {
    // HINTS:
    // 1. update the "activeCard" variable so that it's now the
    //    next card in the list.
    // 2. Then do the same steps as before (in the showPhoto).
    activeCard = activeCard.previousElementSibling;
    document.querySelector('.preview').className = "preview active";
    document.querySelector('.featured_image').style.backgroundImage = activeCard.style.backgroundImage;
    //onsole.log(activeCard.nextElementSibling);
}

document.querySelector('#prev').onclick = prev;
