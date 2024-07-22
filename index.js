const input = document.querySelector("#input");
const submitBtn = document.querySelector("#submitBtn");

submitBtn.addEventListener("click", function (e) {
  e.preventDefault(); //doesnt lets refresh page
  let inputValue = input.value;

  const displaySection = document.querySelector(".displaySection");
  //create the ul <ul>
  //<li></li>
  //</ul
  const listContainer = document.createElement("ul");
  const listItems = document.createElement("li");

  //now you need to put li in ul which is  inside div

  if (inputValue !== "") {
    displaySection.appendChild(listContainer);
    listContainer.appendChild(listItems);
    listItems.textContent = inputValue;
  }

  //it works!
  //now clear put the input text

  input.value = "";

  //still creating list when thought npt writtern anything
});
