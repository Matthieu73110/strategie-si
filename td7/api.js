import axios from "axios";

export async function fetchUser(userId, options = {}) {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
      options
    );
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération de l'utilisateur");
  }
}

export async function createUser(userData) {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      userData
    );
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la création de l'utilisateur");
  }
}
