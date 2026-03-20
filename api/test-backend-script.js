const testBackend = async () => {
    const baseUrl = 'http://localhost:5000/api';

    console.log('🧪 Testing Backend Endpoints...');

    // Test Registration
    try {
        console.log('\n--- Testing Registration ---');
        const registerResponse = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test Setup User',
                email: `test_${Date.now()}@example.com`, // Unique email
                phone: '555-0101'
            })
        });
        const registerData = await registerResponse.json();
        console.log('Status:', registerResponse.status);
        console.log('Response:', registerData);
    } catch (error) {
        console.error('Registration Test Failed:', error.message);
    }

    // Test Contact Form
    try {
        console.log('\n--- Testing Contact Form ---');
        const contactResponse = await fetch(`${baseUrl}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test Setup User',
                email: 'test@example.com',
                phone: '555-0101',
                message: 'This is a test message from the setup script.'
            })
        });
        const contactData = await contactResponse.json();
        console.log('Status:', contactResponse.status);
        console.log('Response:', contactData);
    } catch (error) {
        console.error('Contact Form Test Failed:', error.message);
    }
};

testBackend();
