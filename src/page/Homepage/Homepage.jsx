import Footer from "../../components/Footer/Footer";
import MainCom from "../../components/MainCom";
import ResponsiveAppBar from "../../components/Navbar/AppBar";
import Banner from "../../components/Banner/Banner";
import { Container } from "react-bootstrap";
import "../../scss/Homepage.scss";
export default function Homepage() {
  return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      {/* <Navbar123></Navbar123> */}
      <Container fluid>
        <Banner
          banner1={
            "https://static.vecteezy.com/system/resources/previews/036/040/519/large_2x/ai-generated-pink-peach-orchids-bouquet-on-light-background-with-glitter-and-bokeh-banner-with-copy-space-perfect-for-poster-greeting-card-event-invitation-promotion-print-elegant-design-photo.jpeg"
          }
          banner2={
            "https://homesteadgardens.com/wp-content/uploads/Orchid-Banner-e1677007591368.png"
          }
          banner3={
            "https://static.vecteezy.com/system/resources/previews/015/743/596/large_2x/delicate-background-with-purple-orchid-flowers-for-postcards-and-graphic-works-banner-panorama-with-space-for-text-photo.jpg"
          }
          banner4={
            "https://www.kaleialoha.com/wp-content/uploads/2020/04/pink-spotted-orchids-banner.jpg"
          }
        ></Banner>
      </Container>
      <div className="content">
        <MainCom></MainCom>
      </div>
      <Footer></Footer>
    </div>
  );
}
