const API_URL = 'http://localhost:8081/api';

export const loginApi = async (email, password, rememberMe) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, rememberMe }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { success: false, message: errorText || 'Invalid email or password' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false, message: 'Server is unreachable. Please try again later.' };
  }
};
