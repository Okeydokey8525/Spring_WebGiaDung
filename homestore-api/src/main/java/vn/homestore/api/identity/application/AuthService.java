package vn.homestore.api.identity.application;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.homestore.api.common.error.InvalidRequestException;
import vn.homestore.api.common.error.ResourceConflictException;
import vn.homestore.api.common.error.ResourceNotFoundException;
import vn.homestore.api.identity.api.AuthUserResponse;
import vn.homestore.api.identity.api.RegisterRequest;
import vn.homestore.api.identity.domain.UserAccount;
import vn.homestore.api.identity.domain.UserRole;
import vn.homestore.api.identity.infrastructure.UserAccountRepository;

import java.util.Locale;

@Service
public class AuthService {

    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserAccountRepository userAccountRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userAccountRepository = userAccountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public AuthUserResponse register(RegisterRequest request) {
        if (!request.password().equals(request.confirmPassword())) {
            throw new InvalidRequestException("Password confirmation does not match");
        }

        String fullName = normalizeFullName(request.fullName());
        String email = normalizeEmail(request.email());

        if (userAccountRepository.existsByEmail(email)) {
            throw new ResourceConflictException("Email is already registered");
        }

        UserAccount account = new UserAccount(
                fullName,
                email,
                passwordEncoder.encode(request.password()),
                UserRole.CUSTOMER
        );

        try {
            return AuthUserResponse.from(userAccountRepository.saveAndFlush(account));
        } catch (DataIntegrityViolationException ex) {
            throw new ResourceConflictException("Email is already registered");
        }
    }

    @Transactional(readOnly = true)
    public AuthUserResponse getCurrentUser(String email) {
        UserAccount account = userAccountRepository.findByEmail(normalizeEmail(email))
                .orElseThrow(() -> new ResourceNotFoundException("User account was not found"));

        return AuthUserResponse.from(account);
    }

    public static String normalizeEmail(String value) {
        return value.trim().toLowerCase(Locale.ROOT);
    }

    private String normalizeFullName(String value) {
        return value.trim().replaceAll("\\s+", " ");
    }
}
