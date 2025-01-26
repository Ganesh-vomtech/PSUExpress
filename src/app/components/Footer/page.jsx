export default function Footer() {
  return (
    <div>

      <link rel="shortcut icon" href="/images/favicon.png" type="image/x-icon" />
      <link rel="alternate" href="index.html" hrefLang="hi-in" />
      <link rel="canonical" href="index.html" />
      <link href="css/styles.css" rel="stylesheet" />
      <link href="css/bootstrap.min.css" rel="stylesheet" />
      <link href="css/font-awesome.min.css" rel="stylesheet" />
      <link href="css/menu.css" rel="stylesheet" />
      <link href="css/icon_set_1.css" rel="stylesheet" />
      <link rel="stylesheet" href="css/owl.carousel.min.css" />
      <link rel="stylesheet" href="css/owl.theme.default.min.css" />
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <h4>Latest on Facebook</h4>
          </div>
          <div className="col-sm-3">
            <h4>Latest Tweets</h4>
          </div>
          <div className="col-sm-3">
            <h4>Useful links</h4>
          </div>
          <div className="col-sm-3">
            <h4>Sign up for Newsletter</h4>
            <div className="newsletter">
              <p>Register your email for news and get special offers</p>
              <form action="#" method="get">
                <button type="submit" name="submit" className="btn">submit</button>
                <input type="text" name="email" className="form-control" />
              </form>
              <a href="https://www.facebook.com/psuexpressofficial" target="_blank"><img src="/images/fb.png" alt="Facebook" /></a>
              <a href="https://www.instagram.com/psuexpress/" target="_blank"><img src="/images/insta.png" alt="Instagram" /></a>
              <a href="https://www.linkedin.com/company/psu-express" target="_blank"><img src="/images/linkedIn.png" alt="LinkedIn" /></a>
              <a href="https://www.kooapp.com/profile/PSUexpress" target="_blank"><img src="/images/koo.png" alt="Koo" /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="copy">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">Copyrights © 2025 All Right Reserved by PSU Express.</div>
            <div className="col-sm-6 text-right">
              <a href="#">About Us</a>
              <a href="#">Psu Companies In India</a>
              <a href="#">Jobs</a>
              <a href="#">Tenders</a>
              <a href="#">Video Gallery</a>
              <a href="#">Image Gallery</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
