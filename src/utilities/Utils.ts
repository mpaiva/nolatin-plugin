const randomId = () => Math.random().toString(36).substring(2, 15)

const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};