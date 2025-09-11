export const getTheChefs = async (signal) => {
  try {
    const response = await fetch("https://serverofchefbooking.onrender.com/get-chefsHost", {signal,credentials:"include"});
    const data = await response.json();
     if (!response.ok) {
      if (response.status === 401) {
        return { isLoggedIn: false };
      }
      if (response.status === 404) {
        return { isLoggedIn: false };
      }
      if (response.status === 500) {
        throw new Error("Internal server error");
      }
      throw new Error("Failed to fetch authentication status");
    }
    return mapServerChefsToLocalChefs(data.abstractchef);
  } catch (err) {
    throw err;
  }
};
const mapServerChefsToLocalChefs = (serverChefs) => {
  return serverChefs.map((chef) => {
    return {
      number:chef.mobile,
      id: chef._id,
      pic: chef.profileImage,
      name: chef.name,
      available: chef.available,
      type: chef.type,
      rating: chef.rating,
      price: chef.price,
      speciality: chef.speciality,
      bio: chef.bio,
      experience: chef.experience,
      certifications: chef.certifications,
    };
  });
};
