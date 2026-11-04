export type RolUsuario = 'admin' | 'lector';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  password?: string;
  rol: RolUsuario;
  avatar?: string;
}

export interface AutorHistoria {
  nombre: string;
  inicial: string;
  colorBg: string;
  colorTexto: string;
}

export interface Capitulo {
  numero: number;
  titulo: string;
  subtitulo: string;
  cita?: string;
  texto: string[];
}

export interface Historia {
  id: string;
  titulo: string;
  resumen: string;
  imagen: string;
  categoria: string;
  etiquetas?: string[];
  temaTag?: string;
  estado?: 'Borrador' | 'Acabada' | string;
  visibilidad?: 'Privada' | 'Pública' | string;
  palabras?: number;
  fechaEdicion?: string;
  tiempoLectura?: string;
  fechaPublicacion?: string;
  autor?: AutorHistoria;
  marcador?: string | null;
  marcadorColor?: string;
  verificado?: boolean;
  capitulos?: Capitulo[];
}

export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  fecha: string;
}

export interface PaginaManuscrito {
  capitulo: string;
  html: string;
}

export interface AparienciaEditor {
  colorPapel: string;
  fuente: string;
}

export interface BorradorEditor {
  titulo?: string;
  paginas?: Record<number, PaginaManuscrito>;
}

export interface ContextoAuth {
  usuario: Usuario | null;
  iniciarSesion: (email: string, password: string) => { exito: true } | { exito: false; mensaje: string };
  registrar: (nombre: string, email: string, password: string) => { exito: true } | { exito: false; mensaje: string };
  cerrarSesion: () => void;
}
