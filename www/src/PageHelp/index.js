// @flow
import React from "react";
import { Link } from "react-router-dom";
import vibe from "src/brand/logo.png";
import Footer from "src/components/Footer";
import * as styles from "./style.scss";

import SiteMetaHelmet from "src/components/SiteMetaHelmet";
import Card from "./components/Card";
import Bubble from "./components/Bubble";
import { logPageview } from "src/tracking";

import fb from "./assets/facebook.svg";
import md from "./assets/medium.svg";

const brand = (
  <div
    style={{
      display: "inline-block",
      background: "url(".concat(vibe).concat(") no-repeat"),
      backgroundSize: "contain",
      height: "3rem",
      width: "6rem"
    }}
  />
);

const PageHelp = () => {
  logPageview();
  return (
    <div className={styles.container}>
      <SiteMetaHelmet
        title="Help - NTUVibe"
        url="https://ntuvibe.com/help"
        description="NTUVibe is a knowledge sharing platform for students at Nanyang Technological University to view course information and course reviews."
      />
      <div className={styles.goBack}>
        <Link to="/">Home</Link>
      </div>
      <div className={styles.dark}>
        <div className={styles.heading_1}>{brand}</div>
        <div className={styles.heading_2}>Take the right course.</div>
        <div className={styles.heading_3}>
          At Vibe, you can view all courses available at Nanyang Technological
          University and see what people think about them.
        </div>
        {/* <img className={styles.pic_1} src={pic_1} width="80%" height="auto" /> */}
      </div>
      <div className={styles.light}>
        <div className={styles.heading_4}>Dive In - 3 Steps</div>
        <div className={styles.card}>
          <Card number={"1"}>
            <div className={styles.card_heading}>Go to Vibe</div>
            <div className={styles.card_content}>
              The first step of using Vibe is to open your favorite browser and
              go to ntuvibe.com. It&#39;s deadly simple but you can&#39;t avoid
              it.
            </div>
          </Card>
        </div>
        <div className={styles.card}>
          <Card number={"2"}>
            <div className={styles.card_heading}>Make a Search</div>
            <div className={styles.card_content}>
              Be it a course code, course title or just random word - we support
              partial match.<br /> Use ARROW keys to navigate and press ENTER to
              go to that course - or you can just click.
            </div>
          </Card>
        </div>
        <div className={styles.card}>
          <Card number={"3"}>
            <div className={styles.card_heading}>Start Browsing</div>
            <div className={styles.card_content}>
              Now you&#39;ve come to the course information page. Take a look at
              the course description and what people say about it. Looking good?
              How about adding it to your STARS 🙊.
            </div>
          </Card>
        </div>
        <div className={styles.heading_4}>There&#39;s More!</div>
        <div className={styles.card}>
          <Card>
            <div className={styles.card_heading}>Rate a Course</div>
            <div className={styles.card_content}>
              Does the course meet your expectation? Do you find it useful?
              Write down your first hand experience!
              <span className={styles.quote}>
                Your opinion is invaluable and can benefit thousands of future
                students!
              </span>
              More features are on the way!
            </div>
          </Card>
        </div>
        <div className={styles.heading_4}>Your Voice Matters</div>
        <div className={styles.card}>
          <Card>
            <div className={styles.card_heading}>Our Pledge</div>
            <div className={styles.card_content}>
              At Vibe, we believe that everyone has the right to be heard.
              <br />
              Therefore, we promise that Vibe will never filter or delete any
              content posted by our users.
              <br />
              However, we will take actions if your content shows or involves
              any of the following:
              <br />
              <br />
              1). discrimination against age, gender, gender identity or
              expression, culture, ethnicity, language, national origin,
              political beliefs, profession, race, religion, sexual orientation,
              socioeconomic status, and technical ability.
              <br />
              2). violent threats or language directed against another person;
              sexually explicit or violent material; posting (or threatening to
              post) other people’s personally identifying information; personal
              insults, especially those using racist or sexist terms.
              <br />
              3). anything offensive to certain groups or illegal.
              <br />
              <br />
              Note: above content is adopted from{" "}
              <a href="https://code.fb.com/codeofconduct/">
                Open Source Code of Conduct - Facebook Code
              </a>.
            </div>
          </Card>
        </div>
        {/* <div className={styles.heading_4}>Contribute</div>
        <div className={styles.card}>
          <Card>
            <div className={styles.card_heading}>Make Vibe better</div>
            <div className={styles.card_content}>
              Vibe is an open source project initiated by 4 students from School
              of Computer Science and Engineering under{" "}
              <a href="https://en.wikipedia.org/wiki/MIT_License">
                MIT license
              </a>{" "}
              - the software is owned by all contributors, not just the
              initiators. You can be a part of it too! How about start with{" "}
              <a href="#">editing this page</a>?
            </div>
          </Card>
        </div> */}
      </div>
      <div className={styles.white}>
        <div className={styles.heading_4}>Follow Vibe on Social Media</div>
        <div className={styles.social_media}>
          <Bubble alt="Facebook" img={fb} link="https://facebook.com/ntuvibe" />
          <Bubble alt="Medium" img={md} link="https://medium.com/@ntuvibe" />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default PageHelp;
