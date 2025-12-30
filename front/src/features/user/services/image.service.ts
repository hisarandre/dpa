/*
import { supabase } from '@/lib/supabase'

export type ImageType = 'avatar' | 'reference' | 'banner'

class ImageService {
    private static BUCKET_NAME = 'profile-images'

    async uploadImage(file: File, userId: string, type: ImageType): Promise<string> {
        try {
            this.validateFile(file)

            const compressedFile = await this.compressImage(file)

            const fileExt = file.name.split('.').pop()
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
            const filePath = `${userId}/${type}/${fileName}`

            await this.deleteOldImages(userId, type)

            const { error } = await supabase.storage
                .from(ImageService.BUCKET_NAME)
                .upload(filePath, compressedFile, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (error) throw error

            const { data: urlData } = supabase.storage
                .from(ImageService.BUCKET_NAME)
                .getPublicUrl(filePath)

            return urlData.publicUrl
        } catch (error) {
            console.error('Erreur lors de l\'upload:', error)
            throw new Error(`Échec de l'upload: ${error.message}`)
        }
    }

    private async deleteOldImages(userId: string, type: string): Promise<void> {
        try {
            const { data: files } = await supabase.storage
                .from(ImageService.BUCKET_NAME)
                .list(`${userId}/${type}`)

            if (files && files.length > 0) {
                const filePaths = files.map(file => `${userId}/${type}/${file.name}`)
                await supabase.storage
                    .from(ImageService.BUCKET_NAME)
                    .remove(filePaths)
            }
        } catch (error) {
            console.error('Erreur lors de la suppression:', error)
        }
    }

    private validateFile(file: File): void {
        const MAX_SIZE = 5 * 1024 * 1024 // 5MB
        const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

        if (!ALLOWED_TYPES.includes(file.type)) {
            throw new Error('Type de fichier non autorisé. Utilisez JPG, PNG ou WEBP.')
        }

        if (file.size > MAX_SIZE) {
            throw new Error('Le fichier est trop volumineux. Maximum 5MB.')
        }
    }

    private async compressImage(file: File, maxWidth = 1200): Promise<File> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)

            reader.onload = (event) => {
                const img = new Image()
                img.src = event.target?.result as string

                img.onload = () => {
                    const canvas = document.createElement('canvas')
                    let width = img.width
                    let height = img.height

                    if (width > maxWidth) {
                        height = (height * maxWidth) / width
                        width = maxWidth
                    }

                    canvas.width = width
                    canvas.height = height

                    const ctx = canvas.getContext('2d')
                    ctx?.drawImage(img, 0, 0, width, height)

                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                const compressedFile = new File([blob], file.name, {
                                    type: file.type,
                                    lastModified: Date.now(),
                                })
                                resolve(compressedFile)
                            } else {
                                reject(new Error('Échec de la compression'))
                            }
                        },
                        file.type,
                        0.8
                    )
                }

                img.onerror = () => reject(new Error('Échec du chargement de l\'image'))
            }

            reader.onerror = () => reject(new Error('Échec de la lecture du fichier'))
        })
    }

    async previewImage(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = () => reject(new Error('Échec de la lecture du fichier'))
        })
    }
}

export const imageService = new ImageService()*/
