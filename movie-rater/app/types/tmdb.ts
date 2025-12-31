export interface movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    genres: { id: number; name: string; }[];
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
    known_for: Array<movie | tvShow>;
}

export interface CreditCast extends celeb {
  character: string;
  order: number;
}

export interface reviews {
    id: string; 
    author: string;
    author_details: {
        username: string;
        avatar_path: string | null;
        rating: number | null;
    };
    content: string;
    url: string;
    created_at: string;
    movieTitle?: string;
    moviePosterPath?: string;
}

export interface creditCrew extends celeb {
  department: string;
  job: string;
}   

export interface credits {
    id: number;
    cast: CreditCast[];
    crew: creditCrew[];
}

export interface videos {
    id: number;
    results: video[];
}

export interface reviewResults {
    id: number;
    page: number;
    results: reviews[];
    total_pages: number;
    total_results: number;
}

export interface celebDetails extends celeb {
    birthday: string | null;
    deathday: string | null;
    biography: string;
    place_of_birth: string | null;
    homepage: string | null;
}

export interface celebCredits {
    id: number;
    cast: Array<movie | tvShow>;
    crew: Array<movie | tvShow>;
}                       

