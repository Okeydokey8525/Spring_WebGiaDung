package vn.homestore.api.common.persistence;

import org.springframework.dao.DataIntegrityViolationException;

public final class ConstraintViolationDetector {

    private ConstraintViolationDetector() {
        // Utility class
    }

    public static boolean isConstraintViolated(DataIntegrityViolationException ex, String constraintName) {
        Throwable current = ex;
        while (current != null) {
            if (current.getMessage() != null && current.getMessage().contains(constraintName)) {
                return true;
            }
            current = current.getCause();
        }
        return false;
    }
}
