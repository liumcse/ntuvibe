import React from "react";
import NavBar from "src/components/NavBar";
import Footer from "src/components/Footer";
import SiteMetaHelmet from "src/components/SiteMetaHelmet";
import { logPageview } from "src/tracking";

import logo from "src/brand/logo-color.png";

import * as styles from "./style.scss";

const PageAbout = () => {
  logPageview();
  return (
    <div className={styles.container}>
      <SiteMetaHelmet url="https://ntuvibe.com/about" title="About - NTUVibe" />
      <NavBar />
      <div className={styles.content}>
        <div className={styles.header}>About</div>
        <p>
          NTUVibe is a knowledge sharing platform for students at Nanyang
          Technological University (NTU) to view course information and reviews.
        </p>
        <p>
          Released in August 2018, it was started by a few students from School
          of Computer Science and Engineering at Nanyang Technological
          University. NTUVibe is still under rapid development to provide you
          with better service.
        </p>
        <h2>Disclaimer</h2>
        <p>
          All data (including but not limited to course information, class
          schedule and exam schedule) are obtained directly from information
          open to the general public via Google search or NTU website. No
          information is privileged which requires authorization.
        </p>
        <p>
          NTUVibe may present the data in a different form to improve the user
          experience. However, NTUVibe never alters the original data.
        </p>
        <h2>Privacy policy</h2>
        <p>
          This page informs you of our policies regarding the collection, use,
          and disclosure of personal data when you use our Service and the
          choices you have associated with that data. This Privacy Policy for
          NTUVibe is powered by{" "}
          <a href="https://FreePrivacyPolicy.com">Free Privacy Policy</a>.
        </p>
        <p>
          We use your data to provide and improve the Service. By using the
          Service, you agree to the collection and use of information in
          accordance with this policy. Unless otherwise defined in this Privacy
          Policy, terms used in this Privacy Policy have the same meanings as in
          our Terms and Conditions, accessible from{" "}
          <a href="https://ntuvibe.com">https://ntuvibe.com</a>.
        </p>
        <h3>What information do we collect?</h3>
        <p>
          We collect information from you when you use our site. Upon entering
          our site, your visit will be recorded solely for the purpose of
          statistics. When registering on our side, you may be asked to enter
          your NTU Email and your major of study.
        </p>
        <h3>What do we use your information for?</h3>
        <p>
          Information we collect from you may be used to improve our website (we
          continually strive to improve our website offerings based on the
          information and feedback we receive from you).
        </p>
        <h3>How do we protect your information?</h3>
        <p>
          We implement a variety of security measures to maintain the safety of
          your personal information when you enter, submit, or access your
          personal information.
        </p>
        <h3>Cookies</h3>
        <p>
          Cookies are small files that a site or its service provider transfers
          to your computers hard drive through your Web browser upon your
          permission. Cookies enable the sites or service providers systems to
          recognize your browser and capture and remember certain information.
        </p>
        <p>We use cookies to keep you logged in and record your visits.</p>
        <h3>Do we disclose any information to outside parties?</h3>
        <p>
          We do not sell, trade, or otherwise transfer to outside parties your
          personally identifiable information. This does not include trusted
          third parties who assist us in operating our website, conducting our
          business, or servicing you, so long as those parties agree to keep
          this information confidential. We may also release your information
          when we believe release is appropriate to comply with the law, enforce
          our site policies, or protect ours or others rights, property, or
          safety.
        </p>
        <h3>Your Consent</h3>
        <p>By using our site, you consent to this privacy policy.</p>
        <h3>Changes to this privacy policy</h3>
        <p>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page. We will
          let you know via email and/or a prominent notice on our Service, prior
          to the change becoming effective and update the modified date at the
          bottom of this Privacy Policy.
        </p>
        <p>
          You are advised to review this Privacy Policy periodically for any
          changes. Changes to this Privacy Policy are effective when they are
          posted on this page. This policy was last modified on August 15, 2018.
        </p>
        <h3>Contact Us</h3>
        <p>
          If you have any questions about this Privacy Policy, please contact
          us:
        </p>
        <li>
          By email: <a href="mailto:info@ntuvibe.com">info@ntuvibe.com</a>
        </li>
        <li>
          At Facebook Page: <a href="https://facebook.com/ntuvibe">NTUVibe</a>
        </li>
      </div>
      <Footer />
    </div>
  );
};

export default PageAbout;
