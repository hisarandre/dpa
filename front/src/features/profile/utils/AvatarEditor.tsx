import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { X, Upload } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { getCroppedImg } from "@/features/profile/utils/getCroppedImg";

interface AvatarEditorProps {
    image?: string;
    onSave: (blob: Blob) => void;
    onCancel: () => void;
}

export default function AvatarEditor({
                                         image,
                                         onSave,
                                         onCancel,
                                     }: AvatarEditorProps) {
    const [fileUrl, setFileUrl] = useState<string | null>(image ?? null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const onCropComplete = useCallback(
        (_: any, croppedPixels: any) => {
            setCroppedAreaPixels(croppedPixels);
        },
        []
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (!selected) return;
        setFileUrl(URL.createObjectURL(selected));
    };

    const handleSave = async () => {
        if (!fileUrl || !croppedAreaPixels) return;
        const blob = await getCroppedImg(fileUrl, croppedAreaPixels);
        onSave(blob);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={onCancel}
        >
            {/* Modal */}
            <div
                className="relative w-[360px] rounded-xl bg-background p-4 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold">Edit avatar</h2>
                    <Button size="icon" variant="ghost" onClick={onCancel}>
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {/* Crop area */}
                <div className="relative w-full aspect-square bg-black rounded-lg overflow-hidden mb-3">
                    {fileUrl && (
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
                        />
                    )}
                </div>

                {/* Zoom */}
                <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.01}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full mb-3"
                />

                {/* File input */}
                <label className="flex items-center justify-center gap-2 w-full mb-4 cursor-pointer rounded-lg border border-dashed p-3 text-sm hover:bg-muted">
                    <Upload className="w-4 h-4" />
                    Choose image
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );

}
