import "./styles.scss";

let circle = document.createElement("div"),
  allParticipants = document.createElement("div"),
  eatsPizza = document.createElement("div");

document.getElementById("load-btn").addEventListener("click", () => {
  allParticipants.className = "all-participants";
  eatsPizza.className = "eats-pizza";
  circle.className = "circle";

  document.body.appendChild(circle);
  document.body.appendChild(allParticipants);
  document.body.appendChild(eatsPizza);

  while (circle.firstChild) {
    circle.removeChild(circle.firstChild);
  }

  allParticipants.innerHTML = ``;
  eatsPizza.innerHTML = ``;

  fetch("https://gp-js-test.herokuapp.com/pizza")
    .then(response => {
      document.getElementById("load-btn").className = `loading`;
      document.getElementById("app").innerHTML = `
        <p>wait...</p>`;
      return response.json();
    })
    .then(data => {
      document.getElementById("app").innerHTML = ``;
      document.getElementById("load-btn").className = ``;
      let partyParticipantsLength = Object.keys(data.party).length,
        partyParticipants = data.party,
        ind = 0,
        allParticipantsText = document.createElement("p");

      allParticipantsText.innerHTML = `All participants ${partyParticipantsLength}:`;
      allParticipants.appendChild(allParticipantsText);

      partyParticipants.forEach(party => {
        let nameParticipant = document.createElement("p");

        nameParticipant.innerHTML = `${party.name}`;
        allParticipants.appendChild(nameParticipant);

        if (party.eatsPizza) {
          ind++;
          let nameEatsPizza = document.createElement("p");
          nameEatsPizza.innerHTML = `${party.name}`;
          eatsPizza.appendChild(nameEatsPizza);
        }
      });

      let eatsPizzaText = document.createElement("p");
      eatsPizzaText.innerHTML = `Pizza eaters ${ind}:`;
      eatsPizza.insertBefore(eatsPizzaText, eatsPizza.firstChild);
      let oneSplit = 360 / ind;
      for (var i = 0; i <= ind; i++) {
        let line = document.createElement("div");
        line.className = `line`;
        line.style.transform = `rotate(${oneSplit * i}deg)`;
        circle.appendChild(line);
      }
    });
});
