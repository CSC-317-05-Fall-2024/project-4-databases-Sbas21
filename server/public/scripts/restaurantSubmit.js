const handleSubmit = async (event) => {
    event.preventDefault();   // prevent the default behavior of the form submission (prevents refresh)

    
// extract input value from the form by using their IDs to get the values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const photo = document.getElementById('photo').value;
    
    //console.log({ name, phone, address, photo });
    
    // sending a POST request to the backend to create restaurant entry
    fetch('/api/restaurants', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
        // convert the restaurant data into JSON format 
            {
                name: name,
                phone: phone,
                address: address,
                photo: photo
            }
        ),
    }).then(response => {           // convert response to JSON
        return response.json();
    }).then(data => {
        console.log(data);
        window.location.href = `/restaurants/${data.id}`;      // automatically redirects the user to the details page of the newly created restaurant
    }).catch(error => {
        console.error('Error:', error);
    });
};

document.addEventListener('DOMContentLoaded', () => {   //add event listeners for DOM content

    const form = document.querySelector('.restaurant-form');
    form.addEventListener('submit', handleSubmit);
});