$('#all-pets').on('click',(event) => {
    event.preventDefault();
    fetch('/api/pets', {method: 'GET'})
    .then ((res) => res.json())
    .then((data) => { dbData(data) });
})

$('#all-owners').on('click',(event) => {
    event.preventDefault();
    fetch('/api/owner', {method: 'GET'})
    .then ((res) => res.json())
    .then((data) => { dbData(data) });
})

$('#add-pet').submit((event)=> {
    event.preventDefault();
    let owner_id = $('#new-pet-owner').val();
    let type = $('#new-pet-type').val();
    let name = $('#new-pet-name').val();
    let age= $('#new-pet-age').val();
    let colors = $('#new-pet-colors').val();
    let newPet = {owner_id, type, name, age, colors}
    fetch('/api/pets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(newPet),
    })
    .then((response) => response.json())
    .then((data) => console.log('Succes:', data));
})

$('#add-owner').submit((event)=> {
    event.preventDefault();
    let name = $('#new-owner-name').val();
    let address = $('#new-owner-address').val();
    let phone_number = $('#new-owner-phoneNumber').val();
    let married = $('#new-owner-married').val();
    let newOwner = {name, address, phone_number, married}
    fetch('/api/owner', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(newOwner),
    })
    .then((response) => response.json())
    .then((data) => console.log('Succes:', data));
})



function dbData (information) {
    console.log(information)
}



// {'Osiris', '000 Duat Cir', '010-101-0101', '555-555-5555', true}
// {8, 'Dog', 'Ammit', 3397, 'Tan/Green'}
// { owner_id: 4, type: 'Wolf', name: 'Fenrir', age: 3322, colors: 'Black and Red'}