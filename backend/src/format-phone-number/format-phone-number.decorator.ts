import { Transform } from 'class-transformer';


/**
 * A Class Transformer decorator that formats a phone number to match the format
 * (966) 5xx-xxx-xxxx. If the phone number does not match this format, it is returned
 * as is, and an error is logged to the console.
 * @example
 * class User {
 *   @FormatPhoneNumber()
 *   phone: string;
 * }
 */
export function FormatPhoneNumber() {
  return Transform(({ value }) => {
    if (!value) return value;
    return formatPhoneNumber(value);
  });

/**
 * Format a phone number to match the format (966) 5xx-xxx-xxxx. If the phone number
 * does not match this format, it is returned as is, and an error is logged to the console.
 * @param phone The phone number to format.
 * @returns The formatted phone number.
 */
  function formatPhoneNumber(phone: string): string {
    // Remove all non-numeric characters
    const cleaned = ('' + phone).replace(/\D/g, '');
    
    // Handle different input scenarios
    let normalized: string;
    
    // If number starts with 0, replace with 966
    if (cleaned.startsWith('0')) {
        normalized = '966' + cleaned.slice(1);
    } 
    // If number doesn't start with 966 and doesn't start with 0
    else if (!cleaned.startsWith('966')) {
        normalized = '966' + cleaned;
    } 
    // If number already starts with 966, keep it as is
    else {
        normalized = cleaned;
    }
    if (normalized.length != 12) {
        console.error('Invalid phone number:', phone);
        return phone;
    }


    
    // Format the phone number
    const match = normalized.match(/^(\d{3})(\d{3})(\d{4})(\d{2})$/);
    if (match) {
        // Add parentheses and hyphens
        return `(${match[1]}) ${match[2]}-${match[3]}-${match[4]}`;
    }
    console.error('Invalid phone number:', phone);
    
    return phone;
}
}