export type Write<T extends object, U extends object> = Omit<T, keyof U> & U;
export type Cast<T, U> = T extends U ? T : U;
