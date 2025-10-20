import axios from 'axios';

async function testServer() {
  try {
    console.log('Testing server connection...');
    const response = await axios.get('http://localhost:5001/health');
    console.log('Server response:', response.data);
  } catch (error) {
    console.error('Server test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

testServer();