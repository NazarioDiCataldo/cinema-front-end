export type MovieType = {
  id: number;
  title: string;
  production_year: number;
  nationality: string;
  director: string;
  genre: string;
  image_path: string;
  created_at: string;
  updated_at?: string;
};

type MovieParams = {
    limit?: number;
    order?: 'ASC' | 'DESC',
    order_by?: string,
    nationality?: string,
    production_year_from?: number,
    production_year_to?: number,
    title?: string,
    director?: string,
    genre?: string,  
}

export class Movie {
  //Get all movies
  static async get(params: MovieParams = {}) {

    const queryParams = [];

    //Verifico se ci sono dei parametri
    if(Object.keys(params).length) {
        for(const [key, value] of Object.entries(params)) {
            //Mi creo l'array di query params
            queryParams.push(`${key}=${value}`);
        }
    }

    //Verifico se ci sono query params
    //Se ci sono, all'URL aggiungo tutti i query params tramite join
    const url = queryParams.length ? `${import.meta.env.VITE_MOVIES_URL}?${queryParams.join('&')}` : `${import.meta.env.VITE_MOVIES_URL}`;

    const res = await fetch(url);
    const resJson = await res.json();

    return resJson.data;
  }

  static async single(id: string) {
    const res = await fetch(`${import.meta.env.VITE_MOVIES_URL}/${id}`);
    const resJson = await res.json();

    if (!resJson.success) {
      throw new Error("Movie not found");
    }

    return resJson.data;
  }

  static async create(data: object) {
    const res = await fetch(import.meta.env.VITE_MOVIES_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const resJson = await res.json();

    return resJson.data;
  }

  static async update(id: number, data: object) {
    const res = await fetch(`${import.meta.env.VITE_MOVIES_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const resJson = await res.json();

    return resJson.data;
  }

  static async delete(id: number) {
    const res = await fetch(`${import.meta.env.VITE_MOVIES_URL}/${id}`, {
      method: "DELETE",
    });
    const resJson = await res.json();

    return resJson.data;
  }
}
