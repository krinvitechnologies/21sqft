import React from 'react'
import './privacy.css'
import Navbar from '../../components/homepage/Navbar/navbar'
import Footer from '../../components/homepage/footer/footer'

function PrivacyPolicy() {
    return (
        <div className='privacy-policy'>
            <Navbar />
            <div className="privacy-policy-cont">
                <div className="privacy-policy-head">
                    <h1>Privacy Policy of 21sqft.com</h1>
                </div>

                <div className="bottom-pp">

                    <h3>Effective Date: [15/04/2024]</h3>
                    <div className="pp-cont">
                        <h4>1. Introduction</h4>
                        <p>Welcome to 21SQFT.com, owned and operated by DSD ENTERPRISES. We are committed to protecting your personal information and your right to privacy. This Privacy Policy outlines how we collect, use, and disclose your information when you visit our website or use our services.</p>
                    </div>

                    <h3>2. Information We Collect</h3>
                    <div className="pp-cont">
                        {/* <h4>2.1. Information You Provide</h4> */}
                        <p> <strong>2.1 Personal Information: </strong>We may collect personal information that you provide to us, such as your name, email address, phone number, and company details when you register for an account or submit a listing.</p>
                        <p><strong>2.2 Usage Data: </strong>may collect information about your interactions with our website, including IP addresses, browser type, pages viewed, and other usage data.</p>
                        <p><strong>2.3 Cookies: </strong>We use cookies and similar tracking technologies to enhance your experience on our website, analyze website usage, and deliver targeted advertisements.</p>
                    </div>


                    {/* <div className="pp-cont">
                        <h4>2.2. Information We Automatically Collect</h4>
                        <p>– We may collect information about your device, including your IP address, browser type, and operating system.</p>
                        <p>– We use cookies and similar technologies to gather information about your interactions with our Website, such as pages visited and referral sources.</p>

                    </div> */}

                    <div className="pp-cont">
                        <h4>3. How We Use Your Information</h4>
                        <p><strong>3.1 To Provide and Maintain Our Services:</strong> We use your information to operate, maintain, and improve our website and services.</p>
                        <p><strong>3.2 Communication:</strong>We may use your email address to send you newsletters, updates, or promotional materials.</p>
                        <p><strong>3.3 Analytics:</strong>We analyze usage data to understand how visitors interact with our website and to optimize our services and content.</p>
                        <p><strong>3.4 Legal Obligations:</strong> We may disclose your information if required by law or in response to legal requests.</p>
                    </div>

                    <div className="pp-cont">
                        <h4> 4. Third-Party Services</h4>
                        <p>We may use third-party services, such as payment processors or analytics providers, to facilitate our services. These third parties may have access to your information, but they are obligated not to disclose or use it for any other purpose.</p>
                    </div>

                    <div className="pp-cont">
                        <h4>5. Security</h4>
                        <p>We may use third-party services, such as payment processors or analytics providers, to facilitate our services. These third parties may have access to your information, but they are obligated not to disclose or use it for any other purpose.</p>
                    </div>

                    <div className="pp-cont">
                        <h4>6. Children's Privacy</h4>
                        <p>Our website is not intended for children under the age of 13. We do not knowingly collect or solicit personal information from children. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information from our records.</p>
                    </div>

                    <div className="pp-cont">
                        <h4>7. Your Rights</h4>
                        <p>You have the right to access, correct, or delete your personal information. You may also opt-out of receiving promotional emails from us. To exercise these rights, please contact us at [email address].</p>
                    </div>

                    <div className="pp-cont">
                        <h4>8. Changes to this Privacy Policy</h4>
                        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with a revised "Last Updated" date. Your continued use of our website after any changes indicates your acceptance of the updated Privacy Policy.</p>
                    </div>

                    <div className="pp-cont">
                        <h4>9. Contact Us</h4>
                        <p>If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:</p>
                        <p>DSD ENTERPRISES</p>
                        <p>Email: info@21sqft.com</p>
                        <p>By using 21SQFT.com, you agree to the terms of this Privacy Policy. If you do not agree with this Privacy Policy, please do not use our website or services.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PrivacyPolicy