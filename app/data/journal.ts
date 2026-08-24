export type JournalArticle = {
  slug: string
  title: string
  subtitle: string
  category: string
  readTime: number
  date: string
  image: string
  excerpt: string
  body: string[]
}

export const journalArticles: JournalArticle[] = [
  {
    slug: 'ritual-matutino-piel',
    title: 'El ritual matutino que tu piel necesita',
    subtitle: 'Cinco minutos pueden cambiar tu relación con el espejo.',
    category: 'Cuidado de la piel',
    readTime: 4,
    date: '18 de agosto, 2026',
    image: '/img/journal-1.jpg',
    excerpt:
      'Comenzar el día con intención no es un lujo. Es una decisión que se acumula con el tiempo y se refleja en tu piel.',
    body: [
      'El cuidado de la piel no empieza con los productos. Empieza con la forma en que llegas al baño por las mañanas. Con si tienes prisa o si te das esos cinco minutos.',
      'En Lucienne hemos aprendido, sesión tras sesión, que las pieles más radiantes no son las que usan más pasos ni las más caras. Son las que tienen consistencia. Las que se limpian bien, se hidratan y se protegen, sin saltarse ninguno de esos tres gestos.',
      'El primer paso —el que más se omite— es la limpieza doble. Una limpieza en aceite que disuelve el SPF y el maquillaje, seguida de una limpieza en gel o espuma que trabaja la piel en sí. No es exagerado. Es eficiente.',
      'Después, el sérum. No el de moda: el que necesita tu piel hoy. Para muchas es vitamina C por la mañana, para otras ácido hialurónico. Para algunas —las que viven en una ciudad con altitud y contaminación como la CDMX— ambos.',
      'La hidratación va después, siempre. Y el SPF cierra el ritual. Esto no es negociable. No importa si está nublado ni si "no saldrás mucho". El daño solar es acumulativo y silencioso.',
      'Cinco minutos de presencia son más poderosos que veinte de prisa. Eso es lo que hace un ritual.',
    ],
  },
  {
    slug: 'hifu-sin-cirugia',
    title: 'HIFU: el lifting sin bisturí que no es magia',
    subtitle: 'Qué es, cómo funciona y por qué los resultados son tan reales.',
    category: 'Tecnología estética',
    readTime: 5,
    date: '10 de agosto, 2026',
    image: '/img/transforma-1.jpg',
    excerpt:
      'No hay magia en el HIFU. Hay ultrasonido enfocado, calor controlado y el estímulo perfecto para que tu cuerpo haga lo que sabe hacer: regenerarse.',
    body: [
      'Cuando hablan de un "facial sin bisturí", la primera reacción suele ser escepticismo. Y tiene sentido: el mercado está lleno de promesas que no se sostienen.',
      'El HIFU —Ultrasonido Focalizado de Alta Intensidad— es diferente porque no trabaja sobre la superficie. Trabaja en las capas profundas de la piel, en el mismo plano donde actúa el cirujano en un lifting tradicional.',
      'La tecnología emite pulsos de ultrasonido que se enfocan en puntos específicos bajo la piel. Esos puntos alcanzan temperaturas que estimulan la producción de colágeno sin dañar la capa exterior. El calor es preciso, controlado y localizado.',
      'Los resultados no son instantáneos porque trabajan con el proceso natural del cuerpo. El colágeno nuevo se forma en semanas. La piel se ve más firme, el óvalo más definido, las líneas menos marcadas. El efecto continúa mejorando hasta tres meses después.',
      'No es magia. Es bioquímica. Y eso es lo que lo hace tan confiable.',
      'En Lucienne hacemos diagnóstico antes de cualquier sesión de HIFU. La tecnología es poderosa, y la personalización es lo que marca la diferencia entre un resultado bueno y uno que transforma.',
    ],
  },
  {
    slug: 'masaje-mas-que-relajacion',
    title: 'El masaje es más que relajación',
    subtitle: 'Por qué tocarte con intención cambia cómo sientes tu cuerpo.',
    category: 'Bienestar',
    readTime: 3,
    date: '2 de agosto, 2026',
    image: '/img/relajate-2.jpg',
    excerpt:
      'Vivimos en cuerpos que cargamos. El masaje es la oportunidad de habitarlos.',
    body: [
      'Hay una diferencia entre un masaje que te hace sentir bien en el momento y uno que realmente cambia algo. La diferencia, casi siempre, está en la intención.',
      'El sistema nervioso recibe cada presión, cada dirección, cada pausa. Cuando el masaje está bien hecho, el sistema parasimpático responde. El ritmo cardíaco baja. La respiración se profundiza. Los músculos que estaban contraídos —porque así los tenemos, todo el tiempo— ceden.',
      'El drenaje linfático tiene otro lenguaje: lento, rítmico, preciso. Trabaja el sistema que los médicos llaman "el segundo sistema circulatorio". Cuando está congestionado, el cuerpo se inflama. Cuando fluye, la piel se ve diferente, el cuerpo se siente más ligero.',
      'Lo que busca un buen masaje no es solo que salgas relajada. Es que tu cuerpo aprenda que puede descansar. Que hay un lugar seguro para soltar. Y eso, con el tiempo, se vuelve una habilidad.',
    ],
  },
  {
    slug: 'membresia-ritmo-constante',
    title: 'Por qué el bienestar funciona en ritmo, no en crisis',
    subtitle: 'El autocuidado que espera a "tener tiempo" nunca llega.',
    category: 'Filosofía Lucienne',
    readTime: 3,
    date: '25 de julio, 2026',
    image: '/img/conocenos.jpg',
    excerpt:
      'La diferencia entre quienes se ven bien todo el año y quienes lo intentan en ráfagas no es esfuerzo. Es constancia.',
    body: [
      'El bienestar no funciona por acumulación de intensidad. Funciona por frecuencia. Por hacer algo, de manera consistente, aunque sea pequeño.',
      'Esto lo vemos en cada clienta que lleva meses con nosotras. Su piel no es la misma que cuando entró por primera vez. Sus hombros no están igual de tensos. Tiene un lugar al que volver, y eso cambia cómo se siente en el resto de su semana.',
      'La membresía Lucienne nació de esa convicción: el autocuidado que funciona no es el que te das en vacaciones ni el que compras en pánico antes de un evento. Es el que se integra en tu ritmo.',
      'Dos sesiones al mes. Prioridad en agenda. Un precio que te hace sentir que no tienes excusa para cancelarlo. Así funciona Signature. Así se construye una transformación real.',
    ],
  },
  {
    slug: 'regalo-que-permanece',
    title: 'El regalo que permanece después del momento',
    subtitle: 'Por qué una experiencia vale más que cualquier objeto.',
    category: 'Lifestyle',
    readTime: 3,
    date: '15 de julio, 2026',
    image: '/img/gift.jpg',
    excerpt:
      'Los objetos acumulan polvo. Las experiencias acumulan significado.',
    body: [
      'Hubo un tiempo en que regalar algo físico parecía lo más tangible que podías hacer. Lo envuelves, lo entregas, se puede tocar.',
      'Pero hay algo que los objetos no pueden hacer: crear un recuerdo específico. El momento exacto en que alguien por fin descansó. La tarde que no revisó el teléfono ni una vez. La primera vez que sintió su piel suave de verdad.',
      'Eso es lo que regala una experiencia Lucienne. No el tratamiento en sí —aunque es extraordinario— sino el espacio. El permiso de estar ahí, de no hacer nada más que recibir cuidado.',
      'Nuestras gift cards no tienen fecha de caducidad urgente. No presionan. Esperan el momento correcto. Y cuando llega, hacen exactamente lo que prometieron.',
    ],
  },
  {
    slug: 'pedregal-calidad-de-vida',
    title: 'Pedregal: bienestar en el corazón del sur',
    subtitle: 'Un rincón para desconectarte, exactamente donde lo necesitas.',
    category: 'Nuestro espacio',
    readTime: 2,
    date: '5 de julio, 2026',
    image: '/img/galeria-1.jpg',
    excerpt:
      'Lucienne nació en Paseos del Pedregal porque ahí es donde viven las personas que cuidan de todo menos de sí mismas.',
    body: [
      'Paseos del Pedregal tiene algo que pocas zonas de la Ciudad de México logran: tranquilidad sin desconexión. Cerca de todo, pero con un ritmo diferente.',
      'Lucienne se instaló ahí con intención. Porque nuestras clientas no quieren hacer un viaje largo para llegar a su espacio de bienestar. Quieren que sea parte de su día, no una excepción.',
      'El spa tiene luz natural en todas las cabinas. Los materiales son cálidos. Los aromas, suaves. No hay pantallas ni ruido exterior. Hay silencio de calidad, que es diferente al silencio de aislamiento.',
      'Venimos construyendo este espacio desde 2023. Cada detalle tiene razón de ser. Y seguimos aprendiendo, sesión a sesión, cómo hacer que cada visita se sienta como la primera.',
    ],
  },
]

export const getArticle = (slug: string) => journalArticles.find((a) => a.slug === slug)
