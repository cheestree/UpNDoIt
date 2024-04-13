export type Task = {
    id: number,
    created_by: number,
    created_at: Date,
    modified_at: Date,
    title: string,
    public: boolean,
    description: string
}

export type TaskAdd = {
    title: string,
    description: string,
    public: boolean
}
