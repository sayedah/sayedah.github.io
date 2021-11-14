// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels



// ********** set date ************
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();
///////////////////////////////////


// ********** close links ************
const navToggle = document.querySelector(".nav-toggle"); 
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function() {
    // linksContainer.classList.toggle("show-links");  //this approach hardcodes the height, so if you delete a link there will be whitespace, if you add a link it wont show because the max height of container is 200px 
    //the approach below ensures that the links container is dynamically adjusted to the amount of links there are 
    const containerHeight = linksContainer.getBoundingClientRect().height; 
    const linksHeight = links.getBoundingClientRect().height; 
    if(containerHeight === 0) {  //when links are closed
        linksContainer.style.height = `${linksHeight}px`; 
    }
    else { //when links are open 
        linksContainer.style.height = 0; 
    }
});
///////////////////////////////////




// ********** fixed navbar ************
const navbar = document.getElementById("nav"); 
const topLink = document.querySelector(".top-link"); 
window.addEventListener("scroll", function() {
    const scrollHeight = window.pageYOffset; 
    const navHeight = navbar.getBoundingClientRect().height; 
    if (scrollHeight > navHeight) {
        navbar.classList.add("fixed-nav"); 
    }
    else {
        navbar.classList.remove("fixed-nav"); 
    }

    if(scrollHeight > 500) {
        topLink.classList.add("show-link"); 
    }
    else {
        topLink.classList.remove("show-link"); 
    }
});
///////////////////////////////////




// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach(function(link) {
    //fixes the default behaviour and aligns the section when smooth scrolling to it
    link.addEventListener("click", function(e) {
        //1. prevent default scroll
        e.preventDefault(); 
        //2. navigate to specific section
        const id = e.currentTarget.getAttribute("href").slice(1); //slice(1) means slice a string starting from the index 1 (so it skips the #)
        const element = document.getElementById(id); //grabs the specific link element based on its id 
        //3. calculate the heights
        const navHeight = navbar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        const fixedNav = navbar.classList.contains("fixed-nav"); //either true or false if navbar is fixed
        let position = element.offsetTop - navHeight; //the top position of the link element 
        
        //have to subtract even more height
        if(!fixedNav) { //navbar is not fixed, we've scrolled past height of navbar
            position = position - navHeight; 
        }
        if(navHeight > 82) {  //82 is a set up for the actual top of the navbar, meaning we've alrdy opened up our links
            position = position+containerHeight;
        }
        window.scrollTo({
            //dont want to scroll left. want to scroll vertically to position
            left:0, 
            top:position,    
        });
        //closes the toggle navbar when we scroll up 
        linksContainer.style.height=0; 
    });
});