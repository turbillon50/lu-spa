export const adminKPIs = {
  reservasHoy: 8,
  reservasSemana: 47,
  ingresosMes: 184_320,
  ingresosComparacion: +12.4,
  clientasActivas: 71,
  membresiasActivas: 34,
  ocupacionHoy: 78,
}

export const reservasHoy = [
  { id: 'r-1', hora: '09:00', clienta: 'Valentina Cruz', tratamiento: 'Hydrafacial Lumière', cabina: 'Pétalo', duracion: 60, estado: 'confirmada' },
  { id: 'r-2', hora: '10:00', clienta: 'Sofía Mendoza', tratamiento: 'Masaje Relajante', cabina: 'Almendro', duracion: 60, estado: 'confirmada' },
  { id: 'r-3', hora: '11:00', clienta: 'Mariana Reyes', tratamiento: 'Hydrafacial Lumière', cabina: 'Pétalo', duracion: 60, estado: 'en-curso' },
  { id: 'r-4', hora: '12:00', clienta: 'Gabriela Torres', tratamiento: 'HIFU Facial 360', cabina: 'Suite', duracion: 90, estado: 'confirmada' },
  { id: 'r-5', hora: '13:00', clienta: 'Ana Paula Ríos', tratamiento: 'Ritual en Pareja', cabina: 'Suite Doble', duracion: 120, estado: 'confirmada' },
  { id: 'r-6', hora: '14:00', clienta: 'Fernanda López', tratamiento: 'Masaje Sensorial Signature', cabina: 'Almendro', duracion: 90, estado: 'pendiente' },
  { id: 'r-7', hora: '16:00', clienta: 'Isabela Castro', tratamiento: 'Depilación Láser', cabina: 'Pétalo', duracion: 30, estado: 'confirmada' },
  { id: 'r-8', hora: '17:00', clienta: 'Camila Reyes', tratamiento: 'Ritual Facial Signature', cabina: 'Suite', duracion: 90, estado: 'confirmada' },
]

export const topTratamientos = [
  { nombre: 'Hydrafacial Lumière', sesiones: 124, ingreso: 285_200 },
  { nombre: 'Masaje Relajante', sesiones: 98, ingreso: 147_000 },
  { nombre: 'HIFU Facial 360', sesiones: 61, ingreso: 213_500 },
  { nombre: 'Ritual en Pareja', sesiones: 44, ingreso: 255_200 },
  { nombre: 'Radiofrecuencia', sesiones: 38, ingreso: 106_400 },
]

export const clientasRecientes = [
  { id: 'c-1', nombre: 'Valentina Cruz', email: 'v.cruz@email.com', membresia: 'Signature', visitas: 12, ultimaVisita: '2026-08-21', gasto: 28_400 },
  { id: 'c-2', nombre: 'Mariana Reyes', email: 'mariana.reyes@email.com', membresia: 'Signature', visitas: 8, ultimaVisita: '2026-08-24', gasto: 18_900 },
  { id: 'c-3', nombre: 'Sofía Mendoza', email: 's.mendoza@email.com', membresia: 'Essentielle', visitas: 5, ultimaVisita: '2026-08-20', gasto: 9_200 },
  { id: 'c-4', nombre: 'Gabriela Torres', email: 'g.torres@email.com', membresia: 'Privé', visitas: 22, ultimaVisita: '2026-08-24', gasto: 67_400 },
  { id: 'c-5', nombre: 'Ana Paula Ríos', email: 'ap.rios@email.com', membresia: null, visitas: 3, ultimaVisita: '2026-08-18', gasto: 8_700 },
  { id: 'c-6', nombre: 'Fernanda López', email: 'f.lopez@email.com', membresia: 'Essentielle', visitas: 7, ultimaVisita: '2026-08-15', gasto: 14_200 },
]

export const ingresosPorSemana = [
  { semana: 'Jul 28', ingreso: 38_400 },
  { semana: 'Ago 4', ingreso: 42_100 },
  { semana: 'Ago 11', ingreso: 39_800 },
  { semana: 'Ago 18', ingreso: 51_200 },
  { semana: 'Ago 24', ingreso: 12_820 },
]

export const ocupacionPorDia = [
  { dia: 'Lun', porcentaje: 65 },
  { dia: 'Mar', porcentaje: 72 },
  { dia: 'Mié', porcentaje: 80 },
  { dia: 'Jue', porcentaje: 88 },
  { dia: 'Vie', porcentaje: 95 },
  { dia: 'Sáb', porcentaje: 100 },
  { dia: 'Dom', porcentaje: 45 },
]
