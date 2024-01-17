export type CreditsType = {
    cast: {
        cast_id: number,
        character: string,
        gender: number,
        id: number,
        known_for_department: string,
        name: string,
        profile_path: string
    }[],
    crew: {
        gender: number,
        id: number,
        job: string,
        name: string,
        profile_path: string
    }[]
}