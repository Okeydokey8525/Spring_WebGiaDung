package vn.homestore.api.identity.api;

import vn.homestore.api.identity.domain.UserAccount;
import vn.homestore.api.identity.domain.UserRole;

public record AuthUserResponse(
        Long id,
        String fullName,
        String email,
        UserRole role
) {

    public static AuthUserResponse from(UserAccount account) {
        return new AuthUserResponse(
                account.getId(),
                account.getFullName(),
                account.getEmail(),
                account.getRole()
        );
    }
}
