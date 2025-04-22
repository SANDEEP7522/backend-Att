// ✅ Fixed: Generates email template
export const generateEmailTemplate = (verificationCode) => {
  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 30px; border: 1px solid #ececec; border-radius: 10px; background-color: #ffffff; text-align: left;">
      <h2 style="color: #222222; text-align: center;">Email Verification Needed</h2>
      <p style="font-size: 16px; color: #444444;">Hello,</p>
      <p style="font-size: 16px; color: #444444;">Please use the verification code below to verify your email address and complete the registration process:</p>
      <div style="font-size: 26px; font-weight: bold; margin: 20px 0; background-color: #28a745; color: #ffffff; padding: 15px; text-align: center; border-radius: 5px;">
        ${verificationCode}
      </div>
      <p style="margin-top: 30px; font-size: 14px; color: #666666;">If you did not initiate this request, please disregard this email.</p>
      <p style="font-size: 12px; color: #888888; margin-top: 20px;">Thank you,<br>Your Team</p>
    </div>
  `;
};
