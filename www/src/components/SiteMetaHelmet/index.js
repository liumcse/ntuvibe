import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const SiteMetaHelmet = props => (
  <Helmet>
    <meta name="description" content={props.description} />
    <meta property="og:url" content={props.url} />
    <meta property="og:title" content={props.title} />
    <meta property="og:description" content={props.description} />
    <link rel="canonical" href={props.url} />
    <title>{props.title}</title>
    {props.children}
  </Helmet>
);

SiteMetaHelmet.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.object
};

export default SiteMetaHelmet;
