// Generate random CAPTCHA
function generateCaptcha() {
    const captcha = Math.random().toString(36).substring(2, 8);
    document.getElementById('captcha-display').innerText = captcha;
    return captcha;
}

let captchaValue = generateCaptcha();

// Event listener for registration form
document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const password = document.getElementById('reg-password').value;
    const captcha = document.getElementById('captcha').value;

    if (captcha !== captchaValue) {
        document.getElementById('message').innerText = 'Invalid CAPTCHA. Please try again.';
        captchaValue = generateCaptcha(); // regenerate CAPTCHA
        return;
    }

    // Simulate OTP sending and verification
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random OTP
    alert(`Your OTP is: ${otp}`); // In a real app, you'd send this via email/SMS

    // Show OTP section
    document.getElementById('otp-section').style.display = 'block';

    document.getElementById('verify-otp').onclick = function() {
        const userOtp = document.getElementById('otp').value;
        if (userOtp == otp) {
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPhone', phone);
            localStorage.setItem('userPassword', password);
            document.getElementById('message').innerText = 'Registration successful! You can now log in.';
            document.getElementById('otp-section').style.display = 'none';
            document.getElementById('registration-form').reset();
            captchaValue = generateCaptcha(); // Reset CAPTCHA
        } else {
            document.getElementById('message').innerText = 'Invalid OTP. Please try again.';
        }
    };
});

// Event listener for login form
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Retrieve stored user details
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (email === storedEmail && password === storedPassword) {
        document.getElementById('message').innerText = 'Login successful!';
    } else {
        document.getElementById('message').innerText = 'Invalid email or password.';
    }
});
