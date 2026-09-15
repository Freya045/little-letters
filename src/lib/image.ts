const MAX_EDGE = 480
const QUALITY = 0.58

export function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read that photo.'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('That file does not look like a photo.'))
      img.onload = () => {
        const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.round(img.width * scale))
        canvas.height = Math.max(1, Math.round(img.height * scale))
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Could not prepare the photo.'))
          return
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', QUALITY))
      }
      img.src = String(reader.result)
    }
    reader.readAsDataURL(file)
  })
}
