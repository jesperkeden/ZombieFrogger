const fetchJokeButton = document.querySelector(".joke");

fetchJokeButton.addEventListener("click", () => {
  const url = "https://api.chucknorris.io/jokes/random";
  const jokeDiv = document.getElementById("fetchjoke");
  console.log("hej");

  jokeDiv.innerHTML = "";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (joke) {
      let value = document.createElement("p");
      value.innerHTML = joke.value;

      let img = document.createElement("img");
      img.src = "assets/chuck.png";

      jokeDiv.appendChild(img);
      jokeDiv.appendChild(value);
    });
});
