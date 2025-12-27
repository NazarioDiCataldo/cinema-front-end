export type ActorType = {
  id: number;
  name: string;
  birth_year: number;
  nationality: string;
  image_path: string;
  created_at: string;
  updated_at?: string;
};

export class Actor {
  //Get all actors
  static async get() {
    const res = await fetch(import.meta.env.VITE_ACTORS_URL);
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
