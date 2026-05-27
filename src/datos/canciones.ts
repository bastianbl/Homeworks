export type Cancion = {
  nombre: string;
  artista: string;
  genero: string;
  popularidad: number;
};

export const cancionesIniciales: Cancion[] = [

  // canciones de pop
  {
    nombre: "Blinding Lights",
    artista: "The Weeknd",
    genero: "Pop",
    popularidad: 98,
  },
  {
    nombre: "Levitating",
    artista: "Dua Lipa",
    genero: "Pop",
    popularidad: 95,
  },
  {
    nombre: "As It Was",
    artista: "Harry Styles",
    genero: "Pop",
    popularidad: 97,
  },
  {
    nombre: "Flowers",
    artista: "Miley Cyrus",
    genero: "Pop",
    popularidad: 94,
  },
  {
    nombre: "Shape of You",
    artista: "Ed Sheeran",
    genero: "Pop",
    popularidad: 96,
  },
  {
    nombre: "Bad Guy",
    artista: "Billie Eilish",
    genero: "Pop",
    popularidad: 92,
  },

  // canciones de rock
  {
    nombre: "Bohemian Rhapsody",
    artista: "Queen",
    genero: "Rock",
    popularidad: 99,
  },
  {
    nombre: "Hotel California",
    artista: "Eagles",
    genero: "Rock",
    popularidad: 95,
  },
  {
    nombre: "Smells Like Teen Spirit",
    artista: "Nirvana",
    genero: "Rock",
    popularidad: 95,
  },
  {
    nombre: "Stairway to Heaven",
    artista: "Led Zeppelin",
    genero: "Rock",
    popularidad: 97,
  },
  {
    nombre: "Numb",
    artista: "Linkin Park",
    genero: "Rock",
    popularidad: 94,
  },
  {
    nombre: "Sweet Child O Mine",
    artista: "Guns N Roses",
    genero: "Rock",
    popularidad: 93,
  },

  // canciones de reggaeton
  {
    nombre: "Despacito",
    artista: "Luis Fonsi",
    genero: "Reggaeton",
    popularidad: 100,
  },
  {
    nombre: "Dakiti",
    artista: "Bad Bunny",
    genero: "Reggaeton",
    popularidad: 94,
  },
  {
    nombre: "Tusa",
    artista: "Karol G",
    genero: "Reggaeton",
    popularidad: 93,
  },
  {
    nombre: "Callaita",
    artista: "Bad Bunny",
    genero: "Reggaeton",
    popularidad: 92,
  },
  {
    nombre: "Bichota",
    artista: "Karol G",
    genero: "Reggaeton",
    popularidad: 91,
  },
  {
    nombre: "Mi Gente",
    artista: "J Balvin",
    genero: "Reggaeton",
    popularidad: 92,
  },

  // canciones de hip hop
  {
    nombre: "Lose Yourself",
    artista: "Eminem",
    genero: "Hip Hop",
    popularidad: 99,
  },
  {
    nombre: "Gods Plan",
    artista: "Drake",
    genero: "Hip Hop",
    popularidad: 94,
  },
  {
    nombre: "Sicko Mode",
    artista: "Travis Scott",
    genero: "Hip Hop",
    popularidad: 93,
  },
  {
    nombre: "One Dance",
    artista: "Drake",
    genero: "Hip Hop",
    popularidad: 92,
  },
  {
    nombre: "Without Me",
    artista: "Eminem",
    genero: "Hip Hop",
    popularidad: 92,
  },
  {
    nombre: "The Real Slim Shady",
    artista: "Eminem",
    genero: "Hip Hop",
    popularidad: 91,
  },

  // canciones de electronica
  {
    nombre: "Titanium",
    artista: "David Guetta",
    genero: "Electronica",
    popularidad: 94,
  },
  {
    nombre: "Wake Me Up",
    artista: "Avicii",
    genero: "Electronica",
    popularidad: 91,
  },
  {
    nombre: "Animals",
    artista: "Martin Garrix",
    genero: "Electronica",
    popularidad: 88,
  },
  {
    nombre: "Faded",
    artista: "Alan Walker",
    genero: "Electronica",
    popularidad: 90,
  },

  // canciones clasicas
  {
    nombre: "Imagine",
    artista: "John Lennon",
    genero: "Clasico",
    popularidad: 98,
  },
  {
    nombre: "Billie Jean",
    artista: "Michael Jackson",
    genero: "Clasico",
    popularidad: 97,
  },
];

export const relacionesIniciales: Array<[string, string]> = [
    
  // pop
  ["Blinding Lights", "Levitating"],
  ["Levitating", "As It Was"],
  ["As It Was", "Flowers"],
  ["Flowers", "Shape of You"],
  ["Shape of You", "Bad Guy"],

  // rock
  ["Bohemian Rhapsody", "Hotel California"],
  ["Hotel California", "Stairway to Heaven"],
  ["Stairway to Heaven", "Smells Like Teen Spirit"],
  ["Smells Like Teen Spirit", "Numb"],
  ["Numb", "Sweet Child O Mine"],

  // reggaeton
  ["Despacito", "Mi Gente"],
  ["Mi Gente", "Tusa"],
  ["Tusa", "Dakiti"],
  ["Dakiti", "Callaita"],
  ["Callaita", "Bichota"],

  // hip hop
  ["Lose Yourself", "Without Me"],
  ["Without Me", "The Real Slim Shady"],
  ["The Real Slim Shady", "Gods Plan"],
  ["Gods Plan", "One Dance"],
  ["One Dance", "Sicko Mode"],

  // electronica
  ["Titanium", "Wake Me Up"],
  ["Wake Me Up", "Animals"],
  ["Animals", "Faded"],

  // clasicos
  ["Imagine", "Billie Jean"],

  // conexiones por artista
  ["Dakiti", "Callaita"],
  ["Bichota", "Tusa"],
  ["Lose Yourself", "The Real Slim Shady"],

  // conexiones adicionales 
  ["Blinding Lights", "Titanium"],
  ["Shape of You", "Despacito"],
  ["Numb", "Lose Yourself"],
];