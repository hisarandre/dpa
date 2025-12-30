import {supabase} from "@/shared/lib/supabase";

export async function uploadAvatar(
    userId: number,
    file: Blob
): Promise<string> {
    const filePath = `${userId}/avatar.png`;

    const { error } = await supabase.storage
        .from("uploads")
        .upload(filePath, file, {
            upsert: true,
            contentType: "image/png",
        });

    if (error) {
        throw error;
    }

    const { data } = supabase.storage
        .from("uploads")
        .getPublicUrl(filePath);

    return data.publicUrl;
}
