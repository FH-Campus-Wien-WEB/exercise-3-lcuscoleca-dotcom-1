window.onload = function () {
  const xhr = new XMLHttpRequest()

  xhr.onload = function () {
    const mainElement = document.querySelector("main")

    if (xhr.status == 200) {

      // 1. JSON-String in JavaScript-Objekt umwandeln
      const movies = JSON.parse(xhr.responseText)

      // 2. Durch alle Filme gehen
      movies.forEach(function (movie) {

        // 3. HTML-Elemente erstellen

        // Container für einen Film
        const article = document.createElement("article")
        article.id=movie.imdbID; 

        // Titel
        const title = document.createElement("h2")
        title.textContent = movie.Title

        // Poster
        const img = document.createElement("img")
        img.src = movie.Poster
        img.alt = movie.Title

        // Liste für Infos
        const list = document.createElement("ul")

        const genreLi = document.createElement("li");
        genreLi.textContent = "Genres: ";
        movie.Genres.forEach(function (genreName) {
          const genreSpan = document.createElement("span");
          genreSpan.textContent = genreName;
          genreSpan.className = "genre";
          genreLi.appendChild(genreSpan);
        });
        list.appendChild(genreLi);

        // Hilfsfunktion für Listeneinträge
        function addListItem(text) {
          const li = document.createElement("li")
          li.textContent = text
          list.appendChild(li)
        }

        //added edit button

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        // event-listener für den edit button
        editButton.onclick = function () {
          location.href = "edit.html?imdbID=" + movie.imdbID;
        };

        article.appendChild(editButton);

        addListItem("Released: " + movie.Released)
        addListItem("Runtime: " + movie.Runtime + " min")
        addListItem("Directors: " + movie.Directors.join(", "))
        addListItem("Writers: " + movie.Writers.join(", "))
        addListItem("Actors: " + movie.Actors.join(", "))
        addListItem("Metascore: " + movie.Metascore)
        addListItem("IMDb Rating: " + movie.imdbRating)

        // Plot
        const plot = document.createElement("p")
        plot.textContent = movie.Plot

        // 4. Elemente zusammensetzen
        article.appendChild(title)
        article.appendChild(img)
        article.appendChild(list)
        article.appendChild(plot)

        // 5. In die Seite einfügen
        mainElement.appendChild(article)
      })

    } else {
      mainElement.append("Daten konnten nicht geladen werden, Status " + xhr.status + " - " + xhr.statusText)
    }
  }
  
  // Load genres and create buttons
  const genreXhr = new XMLHttpRequest();
  genreXhr.onload = function () {
    if (genreXhr.status == 200) {
      const genres = JSON.parse(genreXhr.responseText);
      const nav = document.querySelector("nav");
      
      // Add "All" button first
      const allButton = document.createElement("button");
      allButton.textContent = "All";
      allButton.onclick = function () {
        loadMovies();
      };
      nav.appendChild(allButton);
      
      // Add genre buttons
      genres.forEach(function (genre) {
        const button = document.createElement("button");
        button.textContent = genre;
        button.onclick = function () {
          loadMovies(genre);
        };
        nav.appendChild(button);
      });
      
      // Click the first button to load all movies
      nav.querySelector("button").click();
    }
  };
  genreXhr.open("GET", "/genres");
  genreXhr.send();
};

function loadMovies(genre) {
  const xhr = new XMLHttpRequest();
  
  xhr.onload = function () {
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = ""; // Clear existing movies
    
    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);
      
      movies.forEach(function (movie) {
        // Container für einen Film
        const article = document.createElement("article");
        article.id = movie.imdbID;
        
        // Titel
        const title = document.createElement("h2");
        title.textContent = movie.Title;
        
        // Poster
        const img = document.createElement("img");
        img.src = movie.Poster;
        img.alt = movie.Title;
        
        // Liste für Infos
        const list = document.createElement("ul");
        
        const genreLi = document.createElement("li");
        genreLi.textContent = "Genres: ";
        movie.Genres.forEach(function (genreName) {
          const genreSpan = document.createElement("span");
          genreSpan.textContent = genreName;
          genreSpan.className = "genre";
          genreLi.appendChild(genreSpan);
        });
        list.appendChild(genreLi);
        
        // Hilfsfunktion für Listeneinträge
        function addListItem(text) {
          const li = document.createElement("li");
          li.textContent = text;
          list.appendChild(li);
        }
        
        // Edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function () {
          location.href = "edit.html?imdbID=" + movie.imdbID;
        };
        article.appendChild(editButton);
        
        addListItem("Released: " + movie.Released);
        addListItem("Runtime: " + movie.Runtime + " min");
        addListItem("Directors: " + movie.Directors.join(", "));
        addListItem("Writers: " + movie.Writers.join(", "));
        addListItem("Actors: " + movie.Actors.join(", "));
        addListItem("Metascore: " + movie.Metascore);
        addListItem("IMDb Rating: " + movie.imdbRating);
        
        // Plot
        const plot = document.createElement("p");
        plot.textContent = movie.Plot;
        
        // Combine elements
        article.appendChild(title);
        article.appendChild(img);
        article.appendChild(list);
        article.appendChild(plot);
        
        // Add to page
        mainElement.appendChild(article);
      });
    } else {
      mainElement.innerHTML = "Daten konnten nicht geladen werden, Status " + xhr.status + " - " + xhr.statusText;
    }
  };
  
  let url = "/movies";
  if (genre) {
    url += "?genre=" + encodeURIComponent(genre);
  }
  xhr.open("GET", url);
  xhr.send();
}
/*window.onload = function () {
const xhr = new XMLHttpRequest();
xhr.onload = function () {
const bodyElement = document.querySelector("body");
if (xhr.status == 200) {
const movies = JSON.parse(xhr.responseText);
for (const movie of movies) {
/* Task 1.3. Add your code from exercise 1 here 
   and include a non-functional 'Edit' button
   to pass this test 
}
} else {
bodyElement.append(
"Daten konnten nicht geladen werden, Status " +
  xhr.status +
  " - " +
  xhr.statusText
);
}
};
xhr.open("GET", "/movies");
xhr.send();
};*/