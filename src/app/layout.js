import Footer from "./components/Footer/page";
import Header from "./components/Header/page";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Stylesheets */}

        <div style={{ overflowX: "visible", overflowY: "visible" }}>
  {/* Other content */}
</div>


        <link href="/css/styles.css" rel="stylesheet" />
        <link href="/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/css/font-awesome.min.css" rel="stylesheet" />
        <link href="/css/menu.css" rel="stylesheet" />
        <link href="/css/icon_set_1.css" rel="stylesheet" />
        <link rel="stylesheet" href="/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/css/owl.theme.default.min.css" />

        {/* Scripts */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
        <script src="/js/jquery.min.js" type="text/javascript" />
        <script src="/js/popper.min.js" type="text/javascript" />
        <script src="/js/bootstrap.min.js" type="application/javascript" />
        <script src="/js/common_scripts_min.js" type="text/javascript" />
        <script src="/js/functions.js" type="application/javascript" />
        <script src="/js/owl.carousel.js" type="text/javascript" />
        <script src="/js/jquery.bxslider.js" type="text/javascript" />

        {/* Header and Footer */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
