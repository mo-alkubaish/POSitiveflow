// searchUsers.ts

type User = {
    name: string;
    email: string;
    role: string;
  };
  
  // Filter users by name, email, or role
  const searchUsers = (users: User[], searchTerm: string): User[] => {
    if (!searchTerm) return users;
    return users.filter((user) =>
      [user.name, user.email, user.role].some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };
  
  export default searchUsers;
  