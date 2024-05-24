  const [movies, setMovies] = useState([
    {
      _id: { $oid: "65ea3766ecc7df78687ec893" },
      Actors: ["Queen Latifah", "LL Cool J", "Timothy Hutton"],
      Description:
        "A film about a shy woman who goes on a luxurious holiday after learning she has a terminal illness.",
      Director: {
        Bio: "Wayne Wang is a Hong Kong-born American film director known for his work on films such as Smoke, The Joy Luck Club, and Last Holiday.",
        Birthday: "January 12, 1949",
        Name: "Wayne Wang",
        TopMovies: ["Last Holiday"],
      },
      Genre: {
        Description:
          "Movies intended to make the audience laugh or experience amusement.",
        Name: "Comedy",
      },
      ImagePath:
        "https://m.media-amazon.com/images/M/MV5BMzY4ZjcxOTItNWQwOC00MmMxLTkzMjYtZmQwMTJiMGY5Y2JlXkEyXkFqcGdeQXVyMTAwMzUyOTc@._V1_.jpg",
      Title: "Last Holiday",
    },
    {
      _id: { $oid: "65ea3766ecc7df78687ec88e" },
      Actors: ["Jodie Foster", "Anthony Hopkins", "Scott Glenn"],
      Description:
        "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
      Director: {
        Bio: "Jonathan Demme was an American film director, producer, and screenwriter. He is best known for directing The Silence of the Lambs, which won him the Academy Award for Best Director.",
        Birthday: "February 22, 1944",
        Death_day: "April 26, 2017",
        Name: "Jonathan Demme",
        TopMovies: ["The Silence of the Lambs"],
      },
      Genre: {
        Description: "Movies focused on criminal activities or investigations.",
        Name: "Crime",
      },
      ImagePath:
        "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
      Title: "Silence of the Lambs",
    },
    {
      _id: { $oid: "65ea3766ecc7df78687ec899" },
      Actors: ["Matthew Broderick", "Jeremy Irons", "James Earl Jones"],
      Description:
        "A musical film about a young lion prince who must reclaim his throne from his evil uncle with the help of his friends.",
      Director: {
        Bio: "Roger Allers is an American film director, screenwriter, and storyboard artist. He is best known for directing The Lion King and Open Season.",
        Name: "Roger Allers",
        TopMovies: ["The Lion King"],
      },
      Genre: {
        Description:
          "Movies created using animation techniques, including traditional hand-drawn animation, computer-generated imagery (CGI), and stop-motion animation.",
        Name: "Animation",
      },
      ImagePath:
        "https://m.media-amazon.com/images/M/MV5BMjIwMjE1Nzc4NV5BMl5BanBnXkFtZTgwNDg4OTA1NzM@._V1_.jpg",
      Title: "The Lion King",
    },
    {
      _id: { $oid: "65ea3766ecc7df78687ec89a" },
      Actors: ["Sean Astin", "Josh Brolin", "Corey Feldman"],
      Description:
        "A film about a group of kids who embark on a treasure hunt to save their homes from foreclosure.",
      Director: {
        Bio: "Richard Donner was an American film director and producer. He is best known for directing The Omen, Superman, and The Goonies.",
        Birthday: "April 24, 1930",
        Death_day: "July 5, 2021",
        Name: "Richard Donner",
        TopMovies: ["The Goonies"],
      },
      Genre: {
        Description:
          "Movies featuring exciting journeys, quests, or explorations.",
        Name: "Adventure",
      },
      ImagePath:
        "https://m.media-amazon.com/images/M/MV5BNTNmZDc0ZDEtZjY3Ni00YmVjLTljNWQtMTE3NDAxNWFhMDk4XkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_FMjpg_UX1000_.jpg",
      Title: "The Goonies",
    },
  ]);
