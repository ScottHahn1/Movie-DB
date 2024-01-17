export type Details = {
    biography: string,
    birthday: string,
    deathday: string,
    gender: number,
    known_for_department: string,
    name: string,
    place_of_birth: string,
    profile_path: string,
}

export type Credits = {
    cast: {
        backdrop_path: string,
        character: string,
        media_type: string,
        name: string,
        title: string,
        popularity: number,
        poster_path: string,
        vote_count: number,
        release_date: string,
        first_air_date: string,
        id: number
    }[],
    crew: {
        backdrop_path: string,
        media_type: string,
        name: string,
        title: string,
        popularity: number,
        poster_path: string,
        vote_count: number,
        job: string,
        release_date: string,
        first_air_date: string,
        id: number
    }[]
}