const users = document.querySelector('.users')


const url = 'https://randomuser.me/api/?results=30'
let allUsers = []
const currentUsers = []

const getUsers = async () => {
    try {
        const res = await fetch(url);
        const { results } = await res.json();
        allUsers = [...results];
    } catch (error) {
        // mainContent.innerHTML = `<p>Oops! Here is the error ${error}</p>`;
        console.log(error)
    }
}
const renderUsers = (arr) => {
    let user = ''

    arr.forEach(({id ,name, picture, dob, email, cell}) => {
        let currentUser = `<div class="user" id=${id}>
            <img src=${picture.large} alt="user_logo" class="user_logo" />
            <p class="user-name">${name.first} ${name.last}</p>
            <p class="user-age">${dob.age} y.o</p>
            <p class="user-email">${email}</p>
            <p class="user-phone">${cell}</p>
        </div>`
        user += currentUser
    });
    users.innerHTML = user
}

const initApp = async () => {
    await getUsers();
    console.log(allUsers)
    renderUsers(allUsers);
  }

  document.addEventListener("DOMContentLoaded", function() {
    initApp();
    // sortName.addEventListener('click', showFilteredUsers);
    // sortAge.addEventListener('click', showFilteredUsers);
    // searchInput.addEventListener('input', showFilteredUsers);
    // filterGender.addEventListener('click', showFilteredUsers);
  })