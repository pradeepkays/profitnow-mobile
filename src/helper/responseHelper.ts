export function parseResponseError(error: any) {
  return JSON.parse(error.message) as { message: string; status: string }
}
