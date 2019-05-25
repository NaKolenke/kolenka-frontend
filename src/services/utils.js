export function checkErrors(data ) {
  if (data.success === 0) 
    return Promise.reject(data.error)

  return data
}