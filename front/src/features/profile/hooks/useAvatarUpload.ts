import {supabase} from "@/shared/lib/supabase";

export function useAvatarUpload(userId: string) {
    const uploadAvatar = async (blob: Blob) => {
        const filePath = `avatars/${userId}.webp`;

        const { error } = await supabase.storage
            .from("uploads")
            .upload(filePath, blob, {
                upsert: true,
                contentType: "image/webp",
            });

        if (error) throw error;

        const { data } = supabase.storage
            .from("uploads")
            .getPublicUrl(filePath);

        return data.publicUrl;
    };

    return { uploadAvatar };
}
