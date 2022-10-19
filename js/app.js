const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones =( phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent ='';
    // display 10 phones only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length>10) {
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }
    // display no phone found
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')
    }
    console.log(displayPhones);
    phones.forEach(phone => {
        console.log(phone.slug);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top w-50 h-50 mx-auto" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <button type="button" onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModalLabel">
            Show Details
            </button>

            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })
    // stop spinner or loader
    toggleSpinner(false)
}

const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('seach-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}
// handle search btn click

document.getElementById('btn-search').addEventListener('click', function(){
    // start loader
   processSearch(10);
})

// search input field enter key handler
document.getElementById('seach-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      // code for enter
      processSearch(10);
    }
});


const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}
// load shoe all
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch()
})

const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    displayPhonesDetails(data.data);
}
const displayPhonesDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('showModal');
    modalTitle.innerText = phone.name;
    const loadPhoneDetails = document.getElementById('phone-details');
    loadPhoneDetails.innerHTML = `
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate: 'No Release Date For You'}</p>
        <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage Information'}</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth: 'No Bluetooth Information'}

    `;

}

loadPhones("samsung")