/**
 * Change password request.
 */
export interface ChangePasswordRequest {

    /** Old password. */
    oldPassword: string;

    /** New password. */
    newPassword: string;

    /** Confirmation password. */
    confirmation: string;
}
