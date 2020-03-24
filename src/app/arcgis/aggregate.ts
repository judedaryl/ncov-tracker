export type Aggregate<T> = {
    [prop in keyof T]?: string
} & {
    value: number;
};