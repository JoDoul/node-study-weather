const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value;
    console.log(location);
    messageOne.textContent = "Loding..."
    messageTwo.textContent = '';
    fetch(`/weather?address=${location}`).then((req) => {
    req.json().then((data) => {
        if(data.error){
            messageOne.textContent = 'render error';
            console.log(data.error)
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.weather;
            console.log(data.location, data.weather);
        }
    })    
})
});