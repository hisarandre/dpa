package com.dpa.back.repository;
import com.dpa.back.enums.UserCategory;
import com.dpa.back.enums.UserRank;
import com.dpa.back.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    Optional<User> findTopByOrderByIdDesc();

    /* ================= ALL ================= */
    @Query("SELECT u FROM User u WHERE u.isActive = true " +
            "AND u.id != :currentUserId " +
            "AND (:search IS NULL OR :search = '' OR " +
            "LOWER(CONCAT(u.firstName, ' ', u.lastName)) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(CONCAT(u.lastName, ' ', u.firstName)) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<User> findAllWithSearch(@Param("currentUserId") Long currentUserId, @Param("search") String search);

    /* ================= FAVORITES ================= */
    @Query("SELECT u FROM User u JOIN u.favoritedBy fb " +
            "WHERE u.isActive = true " +
            "AND u.id != :currentUserId " +
            "AND fb.id = :userId " +
            "AND (:search IS NULL OR :search = '' OR " +
            "LOWER(CONCAT(u.firstName, ' ', u.lastName)) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(CONCAT(u.lastName, ' ', u.firstName)) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<User> findFavoritesByUserId(@Param("userId") Long userId, @Param("currentUserId") Long currentUserId, @Param("search") String search);

    /* ================= HIGH RANKS ================= */
    @Query("SELECT u FROM User u WHERE u.isActive = true AND u.rank IN :ranks " +
            "AND u.id != :currentUserId " +
            "AND (:search IS NULL OR :search = '' OR " +
            "LOWER(CONCAT(u.firstName, ' ', u.lastName)) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(CONCAT(u.lastName, ' ', u.firstName)) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<User> findByRanksAndSearch(@Param("ranks") List<UserRank> ranks, @Param("currentUserId") Long currentUserId, @Param("search") String search);

    /* ================= CATEGORY ================= */
    @Query("SELECT u FROM User u WHERE u.isActive = true AND u.category = :category " +
            "AND u.id != :currentUserId " +
            "AND (:search IS NULL OR :search = '' OR " +
            "LOWER(CONCAT(u.firstName, ' ', u.lastName)) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(CONCAT(u.lastName, ' ', u.firstName)) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<User> findByCategoryAndSearch(@Param("category") UserCategory category, @Param("currentUserId") Long currentUserId, @Param("search") String search);

}