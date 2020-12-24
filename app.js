const users = document.querySelector('.users')
const sortByAge = document.querySelector('.sortByAge')
const sortByName = document.querySelector('.sortByName')
const searchInput = document.querySelector('.search-input')

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

  const sortByInputText = (arr, text) => {
      return arr.filter(({name}) => `${name.first}${name.last}`.toLowerCase().includes(text.toLowerCase()))
  }

  const showFilteredUsers = () => {
      let filteredUsers = [...allUsers]

      if(searchInput.value !== '') filteredUsers = sortByInputText(filteredUsers, searchInput.value)


      renderUsers(filteredUsers)
  }
  document.addEventListener("DOMContentLoaded", function() {
    initApp();
    sortByAge.addEventListener('click', showFilteredUsers);
    sortByName.addEventListener('click', showFilteredUsers);
    searchInput.addEventListener('input', showFilteredUsers);
    // filterGender.addEventListener('click', showFilteredUsers);
  })