import { useState, useCallback, useEffect } from "react"
import Cropper from "react-easy-crop"
import { X, Upload, Loader2 } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { getCroppedImg } from "@/features/profile/utils/getCroppedImg"
import { ErrorAlert } from "@/shared/components/errorAlert"

interface AvatarEditorProps {
    image?: string
    onSave: (blob: Blob) => Promise<void> | void
    onCancel: () => void
}

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ACCEPTED_FORMATS = ["image/jpeg"]

export default function AvatarEditor({image,onSave,onCancel,}: AvatarEditorProps) {
    const [fileUrl, setFileUrl] = useState<string | null>(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Bloquer le scroll au montage
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    useEffect(() => {
        setFileUrl(image ?? null)
        setCrop({ x: 0, y: 0 })
        setZoom(1)
        setCroppedAreaPixels(null)
        setError(null)
    }, [image])

    const onCropComplete = useCallback(
        (_: any, croppedPixels: any) => {
            setCroppedAreaPixels(croppedPixels)
        },
        []
    )

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0]
        if (!selected) return

        if (!ACCEPTED_FORMATS.includes(selected.type)) {
            setError("Format non supporté. Utilisez un fichier JPG.")
            return
        }

        if (selected.size > MAX_FILE_SIZE) {
            setError("Fichier trop volumineux. Maximum 2MB.")
            return
        }

        setError(null)

        const url = URL.createObjectURL(selected)
        setFileUrl(url)
    }

    const handleSave = async (e?: React.MouseEvent) => {
        e?.stopPropagation()

        if (!fileUrl || !croppedAreaPixels || isLoading) return

        setIsLoading(true)
        setError(null)

        try {
            const blob = await getCroppedImg(fileUrl, croppedAreaPixels)
            await onSave(blob)
        } catch (err) {
            console.error(err)
            setError("Erreur lors du traitement de l'image.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleBackdropClick = () => {
        if (isLoading) return
        onCancel()
    }

    const handleCancel = () => {
        if (isLoading) return
        if (fileUrl) URL.revokeObjectURL(fileUrl)
        onCancel()
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-dark/80 p-4"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="relative w-full max-w-md rounded-xl bg-gray-dark p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Modifier l'avatar</h2>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleCancel}
                        disabled={isLoading}
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {error && <ErrorAlert message={error} />}

                {/* Crop area */}
                <div className="relative w-full aspect-square bg-gray-semi rounded-lg overflow-hidden my-4">
                    {fileUrl ? (
                        <Cropper
                            image={fileUrl}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            cropShape="round"
                            showGrid={false}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                            onMediaLoaded={(media) => {
                                setCroppedAreaPixels({
                                    x: 0,
                                    y: 0,
                                    width: media.naturalWidth,
                                    height: media.naturalHeight,
                                })
                            }}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-sm opacity-60">
                            Aucune image sélectionnée
                        </div>
                    )}
                </div>

                {/* Zoom */}
                {fileUrl && (
                    <div className="mb-4">
                        <label className="text-sm mb-2 block">
                            Zoom : {zoom.toFixed(2)}x
                        </label>
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.01}
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="w-full"
                            disabled={isLoading}
                        />
                    </div>
                )}

                {/* File input */}
                <label
                    className={`flex items-center justify-center gap-2 w-full mb-4 cursor-pointer rounded-lg border-2 border-dashed p-4 text-sm transition-colors ${
                        isLoading
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-muted hover:border-primary"
                    }`}
                >
                    <Upload className="w-5 h-5" />
                    <span className="font-medium">Choisir une image</span>
                    <input
                        type="file"
                        accept="image/jpeg"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={isLoading}
                    />
                </label>

                <p className="text-xs text-center mb-4">
                    JPG — Max 2MB
                </p>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isLoading}
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!fileUrl || !croppedAreaPixels || isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Traitement…
                            </>
                        ) : (
                            "Enregistrer"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}