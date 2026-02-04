export type PlainHeaders = Record<string, string | string[] | undefined>;

export type MaybeHeaders = Headers | PlainHeaders;

export const isHeaders = (h: MaybeHeaders): h is Headers => typeof (h as Headers).get === "function";
