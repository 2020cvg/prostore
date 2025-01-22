// const encoder = new TextEncoder();
// const key = new TextEncoder().encode(process.env.ENCRYPTION_KEY); // Retrieve key from env var
import { createHmac } from 'crypto';


// Hash function with key-based encryption
export const hash = (input: string): string => {
  const secret = process.env.NEXTAUTH_SECRET || 'default_secret'; // Provide a fallback key
  if (!secret) {
    throw new Error('Secret key is missing or invalid');
  }
  return createHmac('sha256', secret).update(input).digest('hex');
};

// Compare function using key from env var
export const compare = async (
  plainPassword: string,
  encryptedPassword: string
): Promise<boolean> => {
  const hashedPassword = await hash(plainPassword);
  return hashedPassword === encryptedPassword;
};
// // Use Web Crypto API compatible with Edge Functions

// const encoder = new TextEncoder();
// const salt = crypto.getRandomValues(new Uint8Array(16)).join('');

// // Hash function
// export const hash = async (plainPassword: string): Promise<string> => {
//   const passwordData = encoder.encode(plainPassword + salt);
//   const hashBuffer = await crypto.subtle.digest('SHA-256', passwordData);
//   return Array.from(new Uint8Array(hashBuffer))
//     .map((b) => b.toString(16).padStart(2, '0'))
//     .join('');
// };

// // Compare function
// export const compare = async (
//   plainPassword: string,
//   encryptedPassword: string
// ): Promise<boolean> => {
//   const hashedPassword = await hash(plainPassword);
//   return hashedPassword === encryptedPassword;
// };
