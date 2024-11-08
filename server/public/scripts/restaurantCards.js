/* This file should contain definitions for deleteRestaurantCard,
and js to attach it as a handler per card.
*/

document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.grid-container');
    const buttons = container.querySelectorAll('.delete-btn');
    
    for (let button of buttons) {       // loop through each delete button to add event listener
        button.addEventListener("click", (event) => {
            
            // extract the restaurant id from the button's id attribute
            let restaurantId = button.id;
            
            // make a delete request for deleting restaurant from the server side 
            fetch(`/api/restaurants/${restaurantId}`, 
                {
                    method: 'DELETE'    // Specify the HTTP method as DELETE
                }
            ).then(response => {
                return response.json();
            }).then(data => {   
                location.reload();   // reloads the page to reflect  changes after the restaurant has been deleted
            })
            .catch(error => {   //catches any errors 
                console.error('Error:', error);
            });
        });
    }
});