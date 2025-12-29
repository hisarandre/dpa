// service/TechnicalIdService.java
package com.dpa.back.service;

import com.dpa.back.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TechnicalIdService {

    private final UserRepository userRepository;

    @Transactional
    public String generateNextTechnicalId() {
        // Récupérer le dernier ID technique
        String lastTechnicalId = userRepository.findTopByOrderByIdDesc()
                .map(user -> user.getTechnicalId())
                .orElse("DOG-000");

        // Extraire le numéro
        int lastNumber = Integer.parseInt(lastTechnicalId.substring(4)); // Enlève "DOG-"
        int nextNumber = lastNumber + 1;

        // Formater avec des zéros (DOG-001, DOG-002, etc.)
        return String.format("DOG-%03d", nextNumber);
    }
}