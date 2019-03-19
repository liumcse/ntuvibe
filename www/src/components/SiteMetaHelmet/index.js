import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const SiteMetaHelmet = props => (
  <Helmet>
    <meta name="description" content={props.description} />
    <meta property="og:url" content={props.url} />
    <meta property="og:title" content={props.title} />
    <meta
      property="og:description"
      content={
        props.description ||
        "Search for courses at Nanyang Technological University. Read course reviews and build your personalized timetable."
      }
    />
    <link rel="canonical" href={props.url} />
    <title>{props.title}</title>
    {props.children}
  </Helmet>
);

SiteMetaHelmet.defaultProps = {
  title: "NTUVibe",
  description:
    "Search for courses at Nanyang Technological University. Read course reviews and build your personalized timetable."
};

SiteMetaHelmet.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.object
};

export default SiteMetaHelmet;
