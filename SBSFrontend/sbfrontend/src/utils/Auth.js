export const getAuthenticatedUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };
  
  export const logoutUser = (navigate) => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    navigate("/");
  };
  