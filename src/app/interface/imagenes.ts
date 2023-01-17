export interface Imagenes {
  data: Imagen[];
}

export interface Imagen {
  id: number,
  name: string,
  route: string,
  create_at: string,
  updated_at: string,
  base64: string
}
