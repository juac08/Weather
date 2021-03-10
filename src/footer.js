import React from "react";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <>
      <footer>
        <ul className="footer">
          <div>
            <li>
              <a
                href="https://www.facebook.com/junaid4u.ahmad"
                className="social-icon hi2"
              >
                <i className="fab fa-facebook"></i>
              </a>
            </li>
          </div>
          <div>
            <li>
              <a
                href="https://www.linkedin.com/in/juac08"
                className="social-icon hi2"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
          </div>
          <div>
            <li>
              <a href="https://github.com/juac08" className="social-icon hi2">
                <i className="fab fa-github"></i>
              </a>
            </li>
          </div>
          <div>
            <li>
              <a href="https://www.instagram.com" className="social-icon hi2">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </div>
        </ul>

        <div>
          <p className="f">© {date} Junaid, Ahmad.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
