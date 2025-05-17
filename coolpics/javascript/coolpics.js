// document.querySelector('.menu-button').addEventListener('click', function(){
//     const nav = document.querySelector('nav');
//     nav.classList.toggle('show');
//     nav.classList.toggle('hide');
// });

/*By adding an event listener to our menu button, we create a function*/

let button = document.querySelector('.menu-button');
const menu = document.querySelector('.menu');

button.addEventListener('click', toggleMenu);

function toggleMenu() {
    menu.classList.toggle('hide');
};

function handleResize() {
    const menu =document.querySelector('.menu');
    if (window.innerWidth > 1000) {
        menu.classList.remove("hide");
}   else{
    menu.classList.add("hide");

    }
    
}
handleResize();
window.addEventListener("resize", handleResize);

//modal
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close-viewer')


document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', function() {
        
        const modalImg = document.getElementById('modal-img');
        modalImg.src= this.src;
        modal.showModal();
    });
});

// Close modal on Button click
closeBtn.addEventListener('click', function () {
    modal.close();
});

// Close modal when clicking outside the image

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});

document.getElementById('close-viewer').addEventListener('click', function(){
    document.getElementById('modal').close();
});
