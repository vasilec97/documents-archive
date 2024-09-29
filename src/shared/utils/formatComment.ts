const MAX_LENGTH = 50

export const formatComment = (str: string) => {
  return str.length >= MAX_LENGTH ? str.slice(0, MAX_LENGTH - 3) + "..." : str
}
