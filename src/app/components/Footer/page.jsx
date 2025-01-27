export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-3 footer-section">
            <h4 className="footer-heading">Latest on Facebook</h4>
          </div>
          <div className="col-sm-3 footer-section">
            <h4 className="footer-heading">Latest Tweets</h4>
          </div>
          <div className="col-sm-3 footer-section">
            <h4 className="footer-heading">Useful Links</h4>
            <ul className="useful-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">PSU Companies</a></li>
              <li><a href="#">Jobs</a></li>
              <li><a href="#">Tenders</a></li>
              <li><a href="#">Video Gallery</a></li>
              <li><a href="#">Image Gallery</a></li>
            </ul>
          </div>
          <div className="col-sm-3 footer-section">
            <h4 className="footer-heading">Sign Up for Newsletter</h4>
            <div className="newsletter">
              <p>Subscribe for exclusive news and updates</p>
              <form action="#" method="get">
                <input type="email" name="email" className="form-control" placeholder="Enter your email" />
                <button type="submit" name="submit" className="btn">Subscribe</button>
              </form>
              <div className="social-links">
                <a href="https://www.facebook.com/psuexpressofficial" target="_blank" className="social-icon"><img src="/images/fb.png" alt="Facebook" /></a>
                <a href="https://www.instagram.com/psuexpress/" target="_blank" className="social-icon"><img src="/images/insta.png" alt="Instagram" /></a>
                <a href="https://www.linkedin.com/company/psu-express" target="_blank" className="social-icon"><img src="/images/linkedIn.png" alt="LinkedIn" /></a>
                <a href="https://www.kooapp.com/profile/PSUexpress" target="_blank" className="social-icon"><img src="/images/koo.png" alt="Koo" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copy">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <p>&copy; 2025 PSU Express. All Rights Reserved.</p>
            </div>
            <div className="col-sm-6 text-right">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
