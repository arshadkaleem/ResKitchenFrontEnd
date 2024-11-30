import jwt from 'jsonwebtoken';


// Retrieve the token from local storage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Save the token to local storage
export const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

// Remove the token from local storage
export const removeToken = () => {
  localStorage.removeItem('token');
};

// Verify the token using a secret key
export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, 'MokshaSolutionsPlanetNinjaAfzetSolutionsRefurnITAlphabyte'); // Replace 'your_secret_key' with your actual secret
    return !!decoded;
  } catch (error) {
    return false;
  }
};

// Authenticate with the backend and get a token
export const authenticate = async (username: string, password: string) => {
    const response = await fetch('https://your-backend-url/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },  
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        if (data.token) {
        saveToken(data.token);
        return data.token;
        }
    }

  throw new Error('Authentication failed');
};
