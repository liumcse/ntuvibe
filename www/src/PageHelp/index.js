// @flow
import React from "react";
import { Link } from "react-router-dom";
// import pic_1 from "./assets/pic_1.jpg";
import Footer from "src/PageCourseDetail/components/Footer";
import * as styles from "./style.scss";

import Card from "./components/Card";

const PageHelp = () => {
  return (
    <div className={styles.container}>
      <div className={styles.goBack}>
        <Link to="/">Home</Link>
      </div>
      <div className={styles.dark}>
        <div className={styles.heading_1}>
          <span className={styles.ntu}>NTU</span>Vibe
        </div>
        <div className={styles.heading_2}>
          Be smart about what you are taking.
        </div>
        <div className={styles.heading_3}>
          At Vibe, you can view all courses available at NTU and see what people
          think about them.
        </div>
        {/* <img className={styles.pic_1} src={pic_1} width="80%" height="auto" /> */}
      </div>
      <div className={styles.light}>
        <div className={styles.heading_4}>Dive In - 3 Steps</div>
        <div className={styles.card}>
          <Card number={"1"}>
            <div className={styles.card_heading}>Go to Vibe</div>
            <div className={styles.card_content}>
              The first step of using Vibe is opening the website.
            </div>
          </Card>
        </div>
        <div className={styles.card}>
          <Card number={"2"}>
            <div className={styles.card_heading}>Make a Search</div>
            <div className={styles.card_content}>
              Be it a course code, course title or random letter - we support
              partial match.
            </div>
          </Card>
        </div>
        <div className={styles.card}>
          <Card number={"3"}>
            <div className={styles.card_heading}>Start Browsing</div>
            <div className={styles.card_content}>
              Now you&#39;ve come to the course information page. Take a look at
              the course description and what people say about it. Like it?
              Consider adding it to your STARS 🙊.
            </div>
          </Card>
        </div>
        <div className={styles.heading_4}>More features!</div>
        <div className={styles.card}>
          <Card number={"4"}>
            <div className={styles.card_heading}>Rate a Course</div>
            <div className={styles.card_content}>
              Does the course meet your expectation? Do you find it useful?
              Write down your first hand experience!
              <span className={styles.quote}>
                Your opinion is invaluable and can benefit thousands of future
                students!
              </span>
            </div>
          </Card>
        </div>
        <div className={styles.heading_4}>Your Voice Matters</div>
        <div className={styles.card}>
          <Card number={"5"}>
            <div className={styles.card_heading}>Our Pledge</div>
            <div className={styles.card_content}>
              At Vibe, we believe that everyone has the right to be heard.
              <br />
              Therefore, we promise that Vibe will never filter or delete any
              content made by our users.
              <br />
              However, we will take actions if your content:
              <br />
              <br />
              1. shows discrimination against age, gender, gender identity or
              expression, culture, ethnicity, language, national origin,
              political beliefs, profession, race, religion, sexual orientation,
              socioeconomic status, and technical ability.
              <br />
              2. involes violent threats or language directed against another
              person; sexually explicit or violent material; posting (or
              threatening to post) other people’s personally identifying
              information; personal insults, especially those using racist or
              sexist terms.
              <br />
              <br />
              This section is incomplete and I may just be ranting.
            </div>
          </Card>
        </div>
        <div className={styles.heading_4}>Contribute</div>
        <div className={styles.card}>
          <Card number={"6"}>
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
        </div>
      </div>
      <div className={styles.white}>
        <div className={styles.heading_4}>Follow Vibe on Social Media</div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default PageHelp;
