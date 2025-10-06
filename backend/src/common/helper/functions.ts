export function persianSlugify(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\u0600-\u06FF-]/g, ''); // remove weird chars, keep persian + english + numbers + -
}
