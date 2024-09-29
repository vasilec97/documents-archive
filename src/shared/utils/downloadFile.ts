export const downloadFile = ({ uri, name }: { uri: string; name: string }) => {
  const temporaryDownloadLink = document.createElement("a")
  temporaryDownloadLink.style.display = "none"

  document.body.appendChild(temporaryDownloadLink)

  temporaryDownloadLink.setAttribute("href", uri)
  temporaryDownloadLink.setAttribute("download", name)

  temporaryDownloadLink.click()

  document.body.removeChild(temporaryDownloadLink)
}
