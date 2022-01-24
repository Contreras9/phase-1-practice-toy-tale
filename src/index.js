let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


fetch('http://localhost:3000/toys')
.then(resp => resp.json())
.then(toyData => {
  toyData.forEach(toy => {
    displayToy(toy)
  })
})
function displayToy(toy) {
    let div = document.getElementById('toy-collection')
    let newDiv = document.createElement('div')
    div.appendChild(newDiv)
    newDiv.className = 'card'
    let newH2 = document.createElement('h2')
    newDiv.appendChild(newH2)
    newH2.innerHTML = toy.name
    let newImage = document.createElement('img')
    newDiv.appendChild(newImage)
    newImage.src = toy.image
    newImage.className = 'toy-avatar'
    let newp = document.createElement('p')
    newDiv.appendChild(newp)
    newp.innerHTML = toy.likes
    let newButton = document.createElement('button')
    newButton.addEventListener('click', () => {
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: 'PATCH',
        headers:{
         "Content-Type": "application/json",
         Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": ++toy.likes
        })
      })
      .then(resp => resp.json())
      .then(data => {
        newp.innerHTML = data.likes
      })
    })
    newDiv.appendChild(newButton)
    newButton.className = 'like-btn'
    newButton.id = toy.id
    newButton.innerHTML = 'Like'
}
let newForm = document.getElementsByClassName('add-toy-form')[0]
newForm.addEventListener('submit', e => {
  e.preventDefault()
  let formName = document.getElementsByName('name')[0]
  let formImg = document.getElementsByName('image')[0]
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": formName.value,
      "image": formImg.value,
      "likes": 0
    })
  })
  .then(resp => resp.json())
  .then(toy => {
    displayToy(toy)
  })
})