export const emailTemplate = ({ otp, name }) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - OTP Code</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 20px;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
        }

        .content {
            padding: 50px 40px;
        }

        .greeting {
            color: #333;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
        }

        .message {
            color: #555;
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 30px;
        }

        .otp-container {
            margin: 40px 0;
            text-align: center;
        }

        .otp-box {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
            display: inline-block;
            width: 100%;
        }

        .otp-label {
            color: rgba(255,255,255,0.8);
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .otp-code {
            font-size: 42px;
            font-weight: bold;
            color: white;
            letter-spacing: 12px;
            font-family: 'Courier New', monospace;
            text-shadow: 0 2px 10px rgba(0,0,0,0.2);
            margin: 10px 0;
        }

        .otp-validity {
            color: rgba(255,255,255,0.7);
            font-size: 13px;
            margin-top: 15px;
        }

        .info-box {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 12px;
            border-left: 4px solid #667eea;
            margin: 30px 0;
        }

        .info-box h3 {
            color: #333;
            font-size: 14px;
            margin-bottom: 15px;
            font-weight: 600;
        }

        .info-box ul {
            color: #555;
            font-size: 14px;
            padding-left: 20px;
            line-height: 1.8;
        }

        .info-box li {
            margin-bottom: 5px;
        }

        .support-text {
            color: #777;
            font-size: 13px;
            line-height: 1.6;
            text-align: center;
            margin-top: 30px;
        }

        .support-text a {
            color: #667eea;
            text-decoration: none;
        }

        @media (max-width: 640px) {
            body {
                padding: 20px 10px;
            }

            .content {
                padding: 30px 20px;
            }

            .otp-code {
                font-size: 32px;
                letter-spacing: 8px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Content -->
        <div class="content">
            <p class="greeting">Hello! ${name} Welcome 👋</p>
            
            <p class="message">
                Use the verification code below to complete your registration:
            </p>

            <!-- OTP Code -->
            <div class="otp-container">
                <div class="otp-box">
                    <p class="otp-label">Your OTP Code</p>
                    <div class="otp-code">${otp}</div>
                    <p class="otp-validity">Valid for 10 minutes</p>
                </div>
            </div>

            <!-- Information Box -->
            <div class="info-box">
                <h3>📌 Important Notes:</h3>
                <ul>
                    <li>Never share this code with anyone</li>
                    <li>This code expires in 10 minutes</li>
                </ul>
            </div>

            <p class="support-text">
                Having trouble? Contact our support team at 
                <a href="mailto:support@company.com">support@company.com</a>
            </p>
        </div>
    </div>
</body>
</html>`
}