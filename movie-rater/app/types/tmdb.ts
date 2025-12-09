export interface movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
}

export interface tvShow {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    first_air_date: string;
    vote_average: number;
}

export interface video {
    id: string;
    name: string;
    key: string;
    site: string;
    type: string;
}

export interface celeb {
    id: number;
    name: string;
    profile_path: string;
    known_for_department: string;
}