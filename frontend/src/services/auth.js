const SERVER_PATH = import.meta.env.VITE_SERVER_PATH;

export async function login(username) {
  try {
    console.log(SERVER_PATH);
    const response = await fetch(`${SERVER_PATH}/api/auth/login?username=${username}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function logout(username) {
  try {
    const response = await fetch(`${SERVER_PATH}/api/auth/logout?username=${username}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Logout failed");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
