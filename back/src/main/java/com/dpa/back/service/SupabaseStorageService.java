package com.dpa.back.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SupabaseStorageService {

    private final WebClient supabaseWebClient;

    @Value("${supabase.url}")
    private String supabaseUrl;

    @Value("${supabase.storage-bucket}")
    private String bucket;

    public String uploadFile(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        String filePath = fileName;

        supabaseWebClient
                .post()
                .uri("/storage/v1/object/" + bucket + "/" + filePath)
                .contentType(MediaType.parseMediaType(file.getContentType()))
                .bodyValue(file.getBytes())
                .retrieve()
                .onStatus(
                        status -> status.value() != 200,
                        response -> response.bodyToMono(String.class)
                                .map(body -> new RuntimeException("Upload failed: " + body))
                )
                .bodyToMono(String.class)
                .block();

        return supabaseUrl + "/storage/v1/object/public/" + bucket + "/" + filePath;
    }

    public void deleteFile(String fileUrl) {
        String path = fileUrl.replace(supabaseUrl + "/storage/v1/object/public/" + bucket + "/", "");

        supabaseWebClient
                .delete()
                .uri("/storage/v1/object/" + bucket + "/" + path)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public byte[] downloadFile(String fileUrl) {
        String path = fileUrl.replace(supabaseUrl + "/storage/v1/object/public/" + bucket + "/", "");

        return supabaseWebClient
                .get()
                .uri("/storage/v1/object/public/" + bucket + "/" + path)
                .retrieve()
                .bodyToMono(byte[].class)
                .block();
    }
}