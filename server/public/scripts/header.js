//selects the 'header' 'nav' and 'footer' from the DOM
const headerElement = document.querySelector('header');
const navElement = document.querySelector('nav');
const footerElement = document.querySelector('footer');


//populating the header 
headerElement.innerHTML = 
`<img src="/images/kl.jpg" class="banner">
<h1>Kuala Lumpur</h1> `;

//navigation links
navElement.innerHTML = 
`<a href="/">Home</a>
<a href="/attractions">Attractions</a>
<a href="/restaurants">Restaurants</a>
<a href="/new-restaurant">New Restaurant</a>`;

//populating footer links
footerElement.innerHTML = 
`<span id="contact">Contact Info: slim16@sfsu.edu</span>`;
