import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

async function testAuthEndpoints() {
  console.log('Testing authentication endpoints...');
  
  // Generate a unique email for testing
  const uniqueEmail = `test_${Date.now()}@example.com`;
  
  try {
    // Test registration
    console.log('\n1. Testing registration...');
    const registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, {
      name: 'Test User',
      email: uniqueEmail,
      password: 'password123',
      role: 'user'
    });
    console.log('Registration successful:', registerResponse.data);
    
    // Test login
    console.log('\n2. Testing login...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: uniqueEmail,
      password: 'password123'
    });
    console.log('Login successful:', loginResponse.data);
    
    // Test with token
    console.log('\n3. Testing authenticated request...');
    const token = loginResponse.data.token;
    const profileResponse = await axios.get(`${API_BASE_URL}/auth/profile/${loginResponse.data.user.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Profile fetch successful:', profileResponse.data);
    
    console.log('\n✅ All authentication tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testAuthEndpoints();