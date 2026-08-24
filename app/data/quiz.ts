export type QuizOption = {
  id: string
  label: string
  emoji?: string
}

export type QuizQuestion = {
  id: string
  question: string
  subtitle?: string
  options: QuizOption[]
}

export type QuizResult = {
  id: string
  title: string
  subtitle: string
  treatmentIds: string[]
  packageId?: string
  description: string
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: '¿Cómo describes cómo llegas hoy?',
    subtitle: 'Sin juzgar. Solo descríbelo.',
    options: [
      { id: 'tensa', label: 'Tensa y acelerada' },
      { id: 'cansada', label: 'Cansada y sin energía' },
      { id: 'bien', label: 'Bien, solo quiero un regalo' },
      { id: 'curiosa', label: 'Curiosa, quiero explorar' },
    ],
  },
  {
    id: 'q2',
    question: '¿Qué parte de ti quieres cuidar hoy?',
    options: [
      { id: 'rostro', label: 'Mi rostro y mi piel' },
      { id: 'cuerpo', label: 'Mi cuerpo y mis músculos' },
      { id: 'mente', label: 'Mi mente y mi energía' },
      { id: 'todo', label: 'Todo, necesito un reset completo' },
    ],
  },
  {
    id: 'q3',
    question: '¿Cuánto tiempo tienes hoy?',
    options: [
      { id: 'poco', label: '45 min – 1 hora' },
      { id: 'medio', label: '1 – 1.5 horas' },
      { id: 'mucho', label: '2 horas o más' },
      { id: 'abierto', label: 'Sin prisa, el tiempo que necesite' },
    ],
  },
  {
    id: 'q4',
    question: '¿Qué sensación quieres llevarte?',
    options: [
      { id: 'calma', label: 'Calma profunda y descanso' },
      { id: 'luminosa', label: 'Piel luminosa y fresca' },
      { id: 'liviana', label: 'Cuerpo liviano y destensado' },
      { id: 'transformada', label: 'Transformada, diferente a como llegué' },
    ],
  },
]

export const quizResults: QuizResult[] = [
  {
    id: 'masaje',
    title: 'Tu cuerpo pide descanso.',
    subtitle: 'Una experiencia de relajación profunda.',
    treatmentIds: ['masaje-relajante', 'masaje-sensorial-signature'],
    packageId: 'ritual-relajacion',
    description:
      'Según cómo respondiste, lo que más te beneficiaría hoy es soltar. Un masaje relajante o nuestro Ritual de Relajación te llevarán a ese estado que tu sistema nervioso está pidiendo.',
  },
  {
    id: 'facial',
    title: 'Tu piel quiere atención.',
    subtitle: 'Una experiencia de renovación facial.',
    treatmentIds: ['hydrafacial', 'ritual-facial-lumiere'],
    packageId: 'ritual-facial',
    description:
      'Tu piel es el reflejo de tu estado interno, y hoy está lista para recibir cuidado. Nuestro Hydrafacial o el Ritual Facial Signature te darán esa luminosidad que buscas.',
  },
  {
    id: 'completo',
    title: 'Necesitas una pausa total.',
    subtitle: 'La experiencia más completa de Lucienne.',
    treatmentIds: ['ritual-detox', 'body-sculpt'],
    packageId: 'experiencia-lucienne',
    description:
      'Lo que describes es un reset completo. La Experiencia Lucienne —que combina facial, corporal y tiempo de descanso privado— fue diseñada exactamente para este momento.',
  },
  {
    id: 'corporal',
    title: 'Tu cuerpo está listo para renovarse.',
    subtitle: 'Una experiencia de transformación corporal.',
    treatmentIds: ['drenaje-linfatico', 'body-sculpt'],
    packageId: 'body-experience',
    description:
      'Tu cuerpo necesita moverse, fluir, renovarse. Nuestro Body Experience combina drenaje, exfoliación y masaje para darte esa sensación de ligereza que buscas.',
  },
]

export const getQuizResult = (answers: Record<string, string>): QuizResult => {
  const vals = Object.values(answers)
  if (vals.includes('rostro') || vals.includes('luminosa')) return quizResults[1]
  if (vals.includes('todo') || vals.includes('transformada') || vals.includes('todo')) return quizResults[2]
  if (vals.includes('cuerpo') || vals.includes('liviana')) return quizResults[3]
  return quizResults[0]
}
