const fs = require('fs');
const path = require('path');
const nodemailer = require('./.next/standalone/node_modules/nodemailer');

// 1. Read .env.local manually
console.log('Reading .env.local...');
try {
    const envPath = path.join(__dirname, '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const passwordMatch = envContent.match(/EMAIL_PASSWORD=(.+)/);

    if (!passwordMatch) {
        throw new Error('EMAIL_PASSWORD not found in .env.local');
    }

    const password = passwordMatch[1].trim();
    console.log('Password found (length):', password.length);

    // 2. Configure Transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
            user: 'info@hazarvolga.com.tr',
            pass: password,
        },
    });

    // 3. Verify Connection
    console.log('Verifying SMTP connection...');
    transporter.verify(function (error, success) {
        if (error) {
            console.error('❌ SMTP Connection Failed:', error);
        } else {
            console.log('✅ SMTP Connection Successful! Server is ready to take our messages');
        }
    });

} catch (err) {
    console.error('❌ Error:', err.message);
    if (err.code === 'MODULE_NOT_FOUND') {
        console.error('HINT: nodemailer is missing from node_modules');
    }
}
