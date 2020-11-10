const userCard = (userInfo) => {
    return `<div class="card mb-3">
      <div class="card-header" id="card1">
        Name : ${userInfo.name}
      </div>
      <div class="card-header" id="card2" style="display:none">
        Username : ${userInfo.username}
      </div>
      <div class="card-header" id="card3" style="display:none">
        Email : ${userInfo.email}
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Adress: ${userInfo.address.street},${userInfo.address.suite},${userInfo.address.city}(${userInfo.address.zipcode})</li>
        <li class="list-group-item">Phone: ${userInfo.phone}</li>
        <li class="list-group-item">Company: ${userInfo.company.name}</li>
        <li class="list-group-item">Website: ${userInfo.website}</li>
      </ul>
    </div>`;
  };
  
  let query = "";
  
  const handleSearchQuery = (event) => {
    query = event.target.value;
  };
  
  const fetchUsers = async (q = query) => {
    try {
      let response = await fetch("https://jsonplaceholder.typicode.com/users");
  
      let users = await response.json();
      console.log(users);
      let row = document.querySelector(".row");
      let user = [];
  
      user = users.filter((res) => res.name === q);
  
      users.forEach((element) => {
        let col = document.createElement("div");
        col.classList.add("col-12", "col-md-6", "col-lg-4");
  
        col.innerHTML = userCard(element);
  
        row.appendChild(col);
      });
    } catch {}
  };
  
  let drowpdownLinks = document.querySelectorAll(".dropdown-menu a");
  
  const card = function () {
    let cardheader = document.querySelectorAll("#card1");
    let cardheader1 = document.querySelectorAll("#card2");
    let cardheader2 = document.querySelectorAll("#card3");
    for (let i = 0; i < cardheader.length; i++) {
      if (cardheader[i].style.display === "none") {
        cardheader[i].style.display = "block";
        cardheader1[i].style.display = "none";
        cardheader2[i].style.display = "none";
      }
    }
  };
  
  const card1 = function () {
    let cardheader = document.querySelectorAll("#card1");
    let cardheader1 = document.querySelectorAll("#card2");
    let cardheader2 = document.querySelectorAll("#card3");
    for (let i = 0; i < cardheader1.length; i++) {
      if (cardheader1[i].style.display === "none") {
        cardheader1[i].style.display = "block";
        cardheader[i].style.display = "none";
        cardheader2[i].style.display = "none";
      }
    }
  };
  
  const card2 = function () {
    let cardheader = document.querySelectorAll("#card1");
    let cardheader1 = document.querySelectorAll("#card2");
    let cardheader2 = document.querySelectorAll("#card3");
    for (let i = 0; i < cardheader2.length; i++) {
      if (cardheader1[i].style.display === "none") {
        cardheader2[i].style.display = "block";
        cardheader1[i].style.display = "none";
        cardheader[i].style.display = "none";
      }
    }
  };
  
  window.onload = () => {
    fetchUsers();
  };