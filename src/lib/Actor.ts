export type ActorType = {
  id: number;
  name: string;
  birth_year: number;
  nationality: string;
  image_path: string;
  created_at: string;
  updated_at?: string;
};

export type ActorParams = {
    limit?: number;
    order?: 'ASC' | 'DESC',
    order_by?: 'id' | 'name',
    nationality?: string,
    birth_year_from?: number,
    birth_year_to?: number,
    name?: string  
}

export class Actor {
  //Get all actors
  static async get(params: ActorParams = {}) {

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
    const url = queryParams.length ? `${import.meta.env.VITE_ACTORS_URL}?${queryParams.join('&')}` : `${import.meta.env.VITE_ACTORS_URL}`;

    const res = await fetch(url);
    const resJson = await res.json();
    
    return resJson.data;
  }

  static async single(id: string) {
    const res = await fetch(`${import.meta.env.VITE_ACTORS_URL}/${id}`);
    const resJson = await res.json();

    if (!resJson.success) {
      throw new Error("Actor not found");
    }

    return resJson.data;
  }

  static async create(data: object) {
    const res = await fetch(import.meta.env.VITE_ACTORS_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const resJson = await res.json();

    return resJson.data;
  }

  static async update(id: number, data: object) {
    const res = await fetch(`${import.meta.env.VITE_ACTORS_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const resJson = await res.json();

    return resJson.data;
  }

  static async delete(id: number) {
    const res = await fetch(`${import.meta.env.VITE_ACTORS_URL}/${id}`, {
      method: "DELETE",
    });
    const resJson = await res.json();

    return resJson.data;
  }
}
