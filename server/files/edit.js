function setMovie(movie) {
  for (const element of document.forms[0].elements) {
    const name = element.id;
    const value = movie[name];

    if (name === "Genres") {
      const options = element.options;
      for (let index = 0; index < options.length; index++) {
        const option = options[index];
        option.selected = value.indexOf(option.value) >= 0;
      }
    } else {
      element.value = value;
    }
  }
}

function getMovie() {
  const movie = {};

  const elements = Array.from(document.forms[0].elements).filter(
    (element) => element.id,
  );

  for (const element of elements) {
    const name = element.id;

    let value;

    if (name === "Genres") {
      value = [];
      const options = element.options;
      for (let index = 0; index < options.length; index++) {
        const option = options[index];
        if (option.selected) {
          value.push(option.value);
        }
      }
    } else if (
      name === "Metascore" ||
      name === "Runtime" ||
      name === "imdbRating"
    ) {
      value = Number(element.value);
    } else if (
      name === "Actors" ||
      name === "Directors" ||
      name === "Writers"
    ) {
      value = element.value.split(",").map((item) => item.trim());
    } else {
      value = element.value;
    }

    movie[name] = value;
  }

  return movie;
}

function putMovie() {
  const movie = getMovie();
  const imdbID = movie.imdbID;

  const xhrPut = new XMLHttpRequest();

  xhrPut.open("PUT", "/movies/" + imdbID);

  xhrPut.setRequestHeader("Content-Type", "application/json");

  xhrPut.onload = function () {
    if (xhrPut.status === 200 || xhrPut.status === 201) {
      location.href = "index.html";
    } else {
      alert("Saving of movie data failed. Status code was " + xhrPut.status);
    }
  };

  xhrPut.send(JSON.stringify(movie));
}

/** Loading and setting the movie data for the movie with the passed imdbID */
const imdbID = new URLSearchParams(window.location.search).get("imdbID");

const xhrGet = new XMLHttpRequest();
xhrGet.open("GET", "/movies/" + imdbID);
xhrGet.onload = function () {
  if (xhrGet.status === 200) {
    setMovie(JSON.parse(xhrGet.responseText));
  } else {
    alert(
      "Loading of movie data failed. Status was " +
      xhrGet.status +
      " - " +
      xhrGet.statusText,
    );
  }
};

xhrGet.send();

