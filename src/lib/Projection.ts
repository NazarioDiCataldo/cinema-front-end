import type { MovieType } from "./Movie";

export type ProjectionType = {
    id: number;
    hall_id: number;
    movie_id: number;
    projection_date: string;
    takings: number;
    movie: MovieType;
    created_at: string;
    updated_at?: string;
}