export type HallType = {
  id: number;
  name: string;
  places: number;
  city: string;
  image_path: string;
  created_at: string;
  updated_at?: string;
};

export type HallParams = {
  limit?: number;
  order?: "ASC" | "DESC";
  order_by?: "id" | "name";
  city?: string;
  places_from?: number;
  places_to?: number;
  name?: string;
};

export class Hall {
  //Get all halls
  static async get(params: HallParams = {}) {
    const queryParams = [];

    //Verifico se ci sono dei parametri
    if (Object.keys(params).length) {
      for (const [key, value] of Object.entries(params)) {
        //Mi creo l'array di query params
        queryParams.push(`${key}=${value}`);
      }
    }

    //Verifico se ci sono query params
    //Se ci sono, all'URL aggiungo tutti i query params tramite join
    const url = queryParams.length
      ? `${import.meta.env.VITE_HALLS_URL}?${queryParams.join("&")}`
      : `${import.meta.env.VITE_HALLS_URL}`;

    const res = await fetch(url);
    const resJson = await res.json();

    return resJson.data;
  }

  static async minPlace() {
    const res = await fetch(
      `${import.meta.env.VITE_HALLS_URL}/min_place`
    );
    const resJson = await res.json();

    if (!resJson.success) {
      throw new Error("An error occured");
    }

    return resJson.data;
  }

  static async maxPlace() {
    const res = await fetch(
      `${import.meta.env.VITE_HALLS_URL}/max_place`
    );
    const resJson = await res.json();

    if (!resJson.success) {
      throw new Error("An error occured");
    }

    return resJson.data;
  }

  //Funzione che raccoglie il massimo e il minimo del numero di posti e restituise un array
  static async rangePlaces() {
    const minPlace: { min: number } = await Hall.minPlace();
    const maxPlace: { max: number } = await Hall.maxPlace();

    return {
      ...minPlace,
      ...maxPlace,
    };
  }

  static async cities() {
    const res = await fetch(`${import.meta.env.VITE_HALLS_URL}/cities`);
    const resJson = await res.json();

    if (!resJson.success) {
      throw new Error("An error occured");
    }

    return resJson.data;
  }

  static async projections(id: string) {
    const res = await fetch(`${import.meta.env.VITE_HALLS_URL}/${id}/projections`);
    const resJson = await res.json();

    if (!resJson.success) {
      throw new Error("An error occured");
    }

    return resJson.data;
  }

  static async single(id: string) {
    const res = await fetch(`${import.meta.env.VITE_HALLS_URL}/${id}`);
    const resJson = await res.json();

    if (!resJson.success) {
      throw new Error("Hall not found");
    }

    return resJson.data;
  }

  static async create(data: object) {
    const res = await fetch(import.meta.env.VITE_HALLS_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const resJson = await res.json();

    return resJson.data;
  }

  static async update(id: number, data: object) {
    const res = await fetch(`${import.meta.env.VITE_HALLS_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const resJson = await res.json();

    return resJson.data;
  }

  static async delete(id: number) {
    const res = await fetch(`${import.meta.env.VITE_HALLS_URL}/${id}`, {
      method: "DELETE",
    });
    const resJson = await res.json();

    return resJson.data;
  }
}
