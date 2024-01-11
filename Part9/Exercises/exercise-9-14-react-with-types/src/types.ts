type CoursePart = {
    name: string,
    exerciseCount: number
}

export interface ContentProps {
    course: CoursePart[];
}