import React from "react";
import classes from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={`${classes.footer_section} ${classes.contact}`}>
          <h4 className={classes.section_title}>Contact Us</h4>
          <p className={classes.prg}>123 Main Street</p>
          <p className={classes.prg}>City, State 12345</p>
          <p className={classes.prg}>Phone: (123) 456-7890</p>
          <p className={classes.prg}>
            <Link
              onClick={() =>
                (window.location.href = "mailto:no-reply@example.com")
              }
            >
              Mail: restaurant@gmail.com
            </Link>
          </p>
        </div>
        <div className={`${classes.footer_section} ${classes.hours}`}>
          <h4 className={classes.section_title}>Opening Hours</h4>
          <p className={classes.prg}>Monday - Friday: 9am - 10pm</p>
          <p className={classes.prg}>Saturday - Sunday: 10am - 11pm</p>
        </div>
        <div className={`${classes.footer_section} ${classes.follow}`}>
          <h4 className={classes.section_title}>Follow Us</h4>
          <p className={classes.prg}>
            <Link>Facebook</Link>
          </p>
          <p className={classes.prg}>
            <Link>Twitter</Link>
          </p>
          <p className={classes.prg}>
            <Link>Instagram</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
