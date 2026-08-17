package vn.homestore.api.identity.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.homestore.api.identity.domain.UserAccount;

import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {

    Optional<UserAccount> findByEmail(String email);

    boolean existsByEmail(String email);
}
