// class AuthService {
//   private accessToken: string | null = null; // Stored in memory

//   async login(username: string, password: string) {
//     const response = await fetch('/api/auth/login', {
//       method: 'POST',
//       body: JSON.stringify({ username, password }),
//     });

//     const data = await response.json();
//     this.accessToken = data.accessToken; // Store in memory

//     // Store refresh token in localStorage for persistence
//     localStorage.setItem('refreshToken', data.refreshToken);
//   }

//   async makeApiRequest(url: string) {
//     // Send access token with every request
//     const response = await fetch(url, {
//       headers: {
//         'Authorization': `Bearer ${this.accessToken}`, // Use from memory
//       },
//     });
//     return response;
//   }
// }
