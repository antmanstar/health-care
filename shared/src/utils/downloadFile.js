export const downloadFile = (payload, fileName) => {
  const url = window.URL.createObjectURL(new Blob([payload]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
}
