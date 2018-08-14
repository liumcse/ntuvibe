import React from "react";
import NavBar from "src/components/NavBar";

import * as styles from "./style.scss";

const PageAbout = () => (
  <div className={styles.container}>
    <NavBar />
    <div className={styles.content}>
      <h1>About</h1>
      <p>
        NTUVibe is a knowledge sharing platform for students at Nanyang
        Technological University (NTU) to view course information and reviews.
      </p>
      <p>
        Released in August 2018, it was started by a few mystical students from
        School of Computer Science and Engineering at Nanyang Technological
        University.
      </p>
      <h1>Disclaimer</h1>
      <p>
        All data (including but not limited to course information, class
        schedule, exam schedule) are obtained from information accessible to the
        general public, which can be searched via Google, or from the website of
        Nanyang Technological University without requiring authorization.
      </p>
      <p>
        NTUVibe collects those open data and presents them in a way we believe
        that provides the best user experience. Although NTUVibe may present the
        data in a different way, data will never be altered.
      </p>
      <h1>Privacy policy</h1>
      <h3>What information do we collect?</h3>
      <p>
        We collect information from you when you use our site. Upon entering our
        site, your visit will be recorded for statistical purpose. When
        registering on our side, you may be asked to enter your NTU Email.
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
        Cookies are small files that a site or its service provider transfers to
        your computers hard drive through your Web browser upon your permission.
        Cookies enable the sites or service providers systems to recognize your
        browser and capture and remember certain information.
      </p>
      <p>We use cookies to keep you logged in and record your visits.</p>
      <h3>Do we disclose any information to outside parties?</h3>
      <p>
        We do not sell, trade, or otherwise transfer to outside parties your
        personally identifiable information. This does not include trusted third
        parties who assist us in operating our website, conducting our business,
        or servicing you, so long as those parties agree to keep this
        information confidential. We may also release your information when we
        believe release is appropriate to comply with the law, enforce our site
        policies, or protect ours or others rights, property, or safety.
      </p>
      <h3>Your consent</h3>
      <p>By using our site, you consent to this privacy policy.</p>

      <h5>&copy; 2018 NTUVibe &middot; Stay cute</h5>
    </div>
  </div>
);

export default PageAbout;
