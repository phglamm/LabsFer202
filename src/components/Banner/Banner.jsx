import { Carousel } from "antd";
import "../../scss/Banner.scss";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const Banner = ({ banner1, banner2, banner3, banner4 }) => (
  <Carousel className="banner" autoplay>
    <div>
      <img src={banner1} alt="" />
    </div>
    <div>
      <img src={banner2} alt="" />{" "}
    </div>
    <div>
      <img src={banner3} alt="" />{" "}
    </div>
    <div>
      <img src={banner4} alt="" />{" "}
    </div>
  </Carousel>
);
export default Banner;
