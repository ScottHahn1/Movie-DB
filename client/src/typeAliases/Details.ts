export type DetailsType = {
    id: number,
    backdrop_path: string,
    budget: number,
    created_by: {
        name: string
    }[],
    genres: {
        id: number,
        name: string
    }[],
    overview: string,
    poster_path: string,
    production_companies: {
        logo_path: string,
        name: string
    }[],
    release_date: string,
    first_air_date: string,
    // media_type: string,
    revenue: number,
    runtime: number,
    spoken_languages: {
        english_name: string,
        name: string
    }[],
    title: string,
    name: string,
    vote_average: number,
    status: string,
    original_language: string,
    networks: {
        name: string,
        logo_path: string
    }[],
    type: string
}