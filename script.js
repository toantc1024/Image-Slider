const carousel = document.querySelector(".carousel"),
    firstImg = carousel.querySelectorAll('img')[0],
    arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, prevPageX, prevScrollLeft, positionDiff;
//getting max scrollable width

const autoSlide = () => {
    if(carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth) return;
    console.log(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;
    if(carousel.scrollLeft > prevScrollLeft) {
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference :-positionDiff;
    }
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3? valDifference : -positionDiff;
}

const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth
    arrowIcons[0].style.display = carousel.scrollLeft == 0? "none":"block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth? "none":"block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        let firstImgWidth = firstImg.clientWidth + 14 // getting rist img and add 14 px margin value;
        //if clicked icon is left, reduce width value from carosuel scroll left else add to it
        carousel.scrollLeft += icon.className.includes("left") ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);

    });
})

const dragging = (e) => {
    if(!isDragStart)    
        return;
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    e.preventDefault();
    carousel.classList.add('dragging');
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragStop = (e) => {
    carousel.classList.remove('dragging');
    // autoSlide();
    isDragStart = false;
}

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mousedown", dragStart); //drag event;
carousel.addEventListener("touchstart", dragStart); //drag event;
carousel.addEventListener("mouseup", dragStop);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);
