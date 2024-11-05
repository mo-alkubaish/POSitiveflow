/**
 * Filters a list of users based on a search term, matching the term against the user's name, email, or role.
 * 
 * @param {User[]} users - Array of user objects to search within.
 * @param {string} searchTerm - The search term to match against user fields.
 * @returns {User[]} - Array of users that match the search term.
 * 
 * If no search term is provided, the function returns the full user list.
 */

type User = {
    name: string;
    email: string;
    role: string;
  };
  
  const searchUsers = (users: User[], searchTerm: string): User[] => {
    if (!searchTerm) return users;
    return users.filter((user) =>
      [user.name, user.email, user.role].some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };
  
  export default searchUsers;
  