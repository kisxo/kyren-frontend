import React from "react";
import Layout from "../components/Layout/Layout";
import "./Terms.css";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="bg-heading">
        <h4>
          <b>Privacy Policy</b>
        </h4>
      </div>
      <div className="terms-container">
        <p>Last updated:  14 January 2025 </p>
        <h5 className="mt-5">Information Collection:</h5>
        <p>
          - We collect personal information, including but not limited to, name,
          email address, and payment details, solely for the purpose of
          processing in-game purchases and providing a personalized gaming
          experience.
        </p>

        <h5 className="mt-5">Usage of Information:</h5>
        <p>
          - Personal information is used to facilitate transactions, deliver
          purchased in-game items, and enhance user experience within the game.
        </p>

        <h5 className="mt-5">Data Security:</h5>
        <p>
          - We employ industry-standard security measures to protect user data
          against unauthorized access, disclosure, alteration, or destruction.
        </p>

        <h5 className="mt-5">Third-Party Services:</h5>
        <p>
          - We may use third-party services for payment processing and
          analytics, and users are encouraged to review the privacy policies of
          these services.
        </p>

        <h5 className="mt-5">Cookies:</h5>
        <p>
          - Our website uses cookies to enhance user experience. Users can
          manage cookie preferences through their browser settings.
        </p>

        <h5 className="mt-5">User Consent:</h5>
        <p>
          - By using our website and making in-game purchases, users consent to
          the collection, processing, and storage of their personal information
          in accordance with this privacy policy.
        </p>

        <h5 className="mt-5">Children's Privacy:</h5>
        <p>
          - Our services are not directed to children under the age of 13. We do
          not knowingly collect personal information from children. Parents or
          legal guardians are responsible for ensuring that minors do not submit
          personal information.
        </p>

        <h5 className="mt-5">Data Retention:</h5>
        <p>
          - We retain user data for as long as necessary to fulfill the purposes
          outlined in this privacy policy, unless a longer retention period is
          required or permitted by law.
        </p>

        <h5 className="mt-5">Communication:</h5>
        <p>
          - Users may receive occasional emails related to their in-game
          purchases, updates, and promotional offers. Users can opt out of
          promotional communications.
        </p>

        <h5 className="mt-5">Policy Changes:</h5>
        <p>
          - We reserve the right to update or modify the privacy policy at any
          time. Users will be notified of any changes.
        </p>

        <h5 className="mt-5">Contact Information:</h5>
        <p>
          - For any privacy-related concerns or questions, users can contact us
          at topupplaygroundofficial@gmail.com
        </p>
        <p>
          <i>
            By using our website and services, users agree to the terms outlined
            in this privacy policy.
          </i>
        </p>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
