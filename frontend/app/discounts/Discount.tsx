/**
 * Defines the structure of a Discount object.
 * 
 * Properties:
 * - `name` (string): The name of the discount.
 * - `type` (string): Type of discount (e.g., "Percentage" or "Fixed Amount").
 * - `value` (string): Discount value, formatted as a string.
 * - `startDate` (string): Start date of the discount (ISO date format).
 * - `endDate` (string): End date of the discount (ISO date format).
 * - `status` (string): Current status of the discount (e.g., "Active", "Scheduled", "Ended").
 */


export type Discount = {
    name: string;
    type: string;
    value: string;
    startDate: string;
    endDate: string;
    status: string;
  };
  