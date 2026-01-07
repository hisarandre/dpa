import { supabase } from "@/shared/lib/supabase";

export async function uploadReference(
    userId: number,
    file: File
): Promise<string> {
    const fileExtension = file.name.split('.').pop();
    const filePath = `${userId}/reference.${fileExtension}`;

    const { error } = await supabase.storage
        .from("uploads")
        .upload(filePath, file, {
            upsert: true,
            contentType: file.type,
            cacheControl: "0",
        });

    if (error) {
        throw error;
    }

    const { data } = supabase.storage
        .from("uploads")
        .getPublicUrl(filePath);

    return `${data.publicUrl}?t=${Date.now()}`;
}