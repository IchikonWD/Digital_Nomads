const cities = [
  {
    name: 'Las Palmas de Gran Canaria',
    description:
      "There's much more to Gran Canarias than surfing incredible waves, a life under the mild sun and splendid natural environment: it's also trending among nomads. The city understood this demand and it's even home for the largest remote workers event in Europe, Repeople. Plus, is one of the main LGBT friendly destinations. Pick it if you want balance life quality, great remote working conditions and, what's more important, fun!",
    image: '/assets/images/cities/las_palmas.jpg',
  },
  {
    name: 'Santa Cruz de Tenerife',
    description:
      "The city known by its wild carnival has way more to offer than that. Exotic landscapes, modern architecture, nice beaches or the absolutly stunning Teide National Park won't make you regret for chosing the city as your next target nomad destination.",
    image: '/cities/santa_cruz.png',
  },
  {
    name: 'Corralejo',
    description:
      "Corralejo is located in the Fuerteventura's northeast Island. It's famous for its culture of windsurf, scuba diving and its white sand beaches. It has an envious sunny and summer weather type all year, making it an amazing next destination for your adventure!",
    image: '/assets/images/cities/corralejo.png',
  },
  {
    name: 'Puerto del Rosario',
    description:
      "It's the crowdest city in Fuerteventura and its capital. Located in the north of the Island you'd love the city if you're keen on kitesurfing, windsurf, or surf. It is full of nice spots to master those sports. Moreover, Puerto del Rosario has an exciting summer weather all year!",
    image: '/assets/images/cities/puerto_del_rosario.jpeg',
  },
  {
    name: 'Arrecife',
    description:
      "Lanzarote's capital city Arrecife is the sailor city by definition. It'd exceed your expectations if you're looking for a paradise destination with unique black sand beaches and an amazing way of life with a cultural hub innovation.",
    image: '/assets/images/cities/arrecife.jpeg',
  },
  {
    name: 'Barcelona',
    description:
      'Barcelona, the hub of trends, design, creativity, architecture, cuisine, and fashion while maintaining its local traditions. With views of the mediterranean sea and delimited by its mountains, Barcelona is everything you can ask for in a cosmopolitan city. ',
    image: '/assets/images/cities/barcelona.jpeg',
  },
  {
    name: 'Madrid',
    description:
      'The vibrant capital is known for being built with people from all around the country. Always welcoming and with endless options and plans, Madrid defends its capital title fiercely.',
    image: '/assets/images/cities/madrid.png',
  },
  {
    name: 'San Sebastián',
    description:
      "If you're a foodie San Sebastian, or Donosti, as the locals call it, is the place to go. Donosti will not disappoint as your next nomad destination, with first-class restaurants, the city with the most Michelin stars per square meter in the world, and a thriving business sector.",
    image: '/assets/images/cities/san_sebastian.png',
  },
  {
    name: 'Bilbao',
    description:
      "The underground city of Basque Country par excellence! Perhaps you've heard about the Bilbao effect, perhaps not, but this city won't let you be indifferent in your next adventure. During the past ten years, Bilbo (as the locals call it) has been living a transformation, based on two features high-quality living standards and cultural activities, to become the most exciting place to live in the Basque Country!",
    image: '/assets/images/cities/bilbao.jpeg',
  },
  {
    name: 'La Coruña',
    description:
      "Welcome to the most fashionable city in Spain's northwest! La Coruña has evolved into a destination where everyone wants to spend some time. It offers a diverse selection of cultural events as well as a gastronomic culture that will not let you down.",
    image: '/assets/images/cities/la_coruna.jpeg',
  },
  {
    name: 'Pamplona',
    description:
      "The coolest and greenest walled city in the country! Welcome to Pamplona, where the cultural, foodies, and plan-makers nomads aficionados wouldn't want to leave. Besides, just a few miles from the kicking point of the French Camino de Santiago.",
    image: '/assets/images/cities/pamplona.jpeg',
  },
  {
    name: 'Valencia',
    description:
      "Where can you get sun, amazing nightlife, music events, and carnivals? If Valencia hasn't already come to your mind, you should consider it if you also want to enjoy gastronomy and traditional festivals like Las Fallas. Allow the Mediterranean sea and light to engulf you in a city with ...K citizens who already enjoy ...days of sun a year!",
    image: '/assets/images/cities/valencia.jpeg',
  },
  {
    name: 'Alicante',
    description:
      "Welcome to the White Coast's most significant city! The combination of deeply ingrained traditions and the peaceful Mediterranean sea has given Alicante a distinct identity. You'll become a rice expert after staying in the city. ",
    image: '/assets/images/cities/alicante.jpeg',
  },
  {
    name: 'Jávea',
    description:
      "Javea has beautiful weather all year and is an ideal location for learning about the Mediterranean way of life. It's the optimal location for those who enjoy tranquil turquoise seas, hiking, and eating. Welcome to Jávea, digital nomads!",
    image: '/assets/images/cities/javea.jpeg',
  },
  {
    name: 'Córdoba',
    description:
      "Hi Nomad! Welcome to Córdoba, the capital of Muslims and where east and west meet their faces. You won't be leaving the city as you arrived. Either for its Great Mosque or its rich tapestry of cultures, streets, and alleys, you'll enjoy the stay in the city. You'll be losing yourself to the lively taverns and livid cultural life.",
    image: '/assets/images/cities/cordoba.png',
  },
  {
    name: 'Granada',
    description:
      "Granada is considered the country's Arabic Jewel and one of its jewels because of its extensive Arabic heritage. It offers a diverse range of cultural events, and the city's buzz and bustle are well-known throughout the country. Granada is your next visit if you're seeking an intriguing city with a rich cultural past.",
    image: '/assets/images/cities/granada.jpeg',
  },
  {
    name: 'Sevilla',
    description:
      "Sevilla has a special color, as said in a famous Spanish Song. With a strong heritage and historical wealth still present nowadays contrasting the city modernization process, Sevilla will capture and transport you to Andalusia's core idiosyncrasy. Perhaps it's Triana or its people, but Sevilla will leave you a distinctive mark in your next nomad adventure!",
    image: '/assets/images/cities/sevilla.jpeg',
  },
  {
    name: 'Málaga',
    description:
      'With its recent development, it has become the most international city in Andalusia. "Spanish Silicon Valley" is a term used to describe this Mediterranean coastal metropolis. With such a large contemporary and startup scene, you can find yourself learning about the city\'s history on the same day that you attend a tech event. Do not miss out on the town where the rush of the metropolis meets the Spanish way of life. Remember, the place where Pablo Picasso was born is a city worth visiting!',
    image: '/assets/images/cities/malaga.jpeg',
  },
  {
    name: 'Marbella',
    description:
      "Hello there, adventurous Nomad! Welcome to the bustling city in Costa del Sol's. Shows, festivals, sports, and cuisine culture will keep you occupied. Either you want to rest and enjoy the beach, your stay in Marbella will surpass your expectations. So, relax and enjoy your journey.",
    image: '/assets/images/cities/marbella.jpeg',
  },
  {
    name: 'Tarifa',
    description:
      "Hey, thrill-seeker! Tarifa welcomes you to the southernmost tip of the Iberian Peninsula, where the Mediterranean meets the Atlantic. The city is known across the world as a surfer's paradise and a haven for nature enthusiasts. You're a bon vivant if you've made it this far!",
    image: '/assets/images/cities/tarifa.jpeg',
  },
  {
    name: 'Palma de Mallorca',
    description:
      'The biggest of the Balearic Islands boasts endless turquoise beaches and caverns with mountains only a short distance away. With its own startup economy and a valuable networking ecology, Majorca, or simply Palma as its locals call it, has been one of the top three locations for digital nomads in Spain for some years, despite its values and qualities eroding.',
    image: '/assets/images/cities/palma_de_mallorca.jpeg',
  },
  {
    name: 'Ciudadela',
    description:
      'Located in Menorca Island and surrounded by the best Mediterranean turquoise coves, Ciudadela will make you fall for it in seconds. The Balearic island way of life and its amazing sunsets will make you jeopardize your willingness to keep traveling ;)',
    image: '/assets/images/cities/ciudadela.jpg',
  },
  {
    name: 'Ibiza',
    description:
      "Pine forests with Caribbean beaches and stunning caves in the middle of the Mediterranean Sea. Either you're looking for a peaceful retreat or rushing to the fizzy clubbing night live, Ibiza will stand out from your expectations.",
    image: '/assets/images/cities/ibiza.jpg',
  },
];

export default cities;
