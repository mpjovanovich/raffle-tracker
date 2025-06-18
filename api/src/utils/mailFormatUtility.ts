export const createValidationEmail = (
  validateUrl: string,
  expiresIn: string
): string => {
  return `
<div style="max-width: 500px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  <h2 style="color: #333; margin: 0 0 20px 0;">Thanks for signing up!</h2>
  
  <p style="margin: 0 0 20px 0;">
    Please <a href="${validateUrl}" style="color: #007bff; text-decoration: none; font-weight: 500;">click here to verify your email</a>.
  </p>
  
  <p style="font-size: 14px; color: #666; margin: 15px 0 0 0;">
    This verification link will expire in ${expiresIn}.
  </p>

  <p style="font-size: 14px; color: #666; margin: 15px 0 0 0;">
    If you did not request this verification, you may ignore this email.
  </p>
</div>
  `;
};
