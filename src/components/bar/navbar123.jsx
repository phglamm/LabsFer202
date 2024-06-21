import { Button } from "antd";
import { useState } from "react";
import ProductContent from "../dropdowncontent/dropdownContentProduct";
import ServicesContent from "../dropdowncontent/dropdownContentService.";
import "./navbar123.css";
export default function Navbar123() {
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const handleMouseOverProduct = () => {
    setIsProductDropdownOpen(true);
    setIsServiceDropdownOpen(false);
  };
  const handleMouseOverService = () => {
    setIsProductDropdownOpen(false);
    setIsServiceDropdownOpen(true);
  };
  const handleMouseLeaveProduct = () => {
    setIsProductDropdownOpen(false);
  };
  const handleMouseLeaveService = () => {
    setIsServiceDropdownOpen(false);
  };

  return (
    <div className="NavBar123">
      <div className="drowndownContainer" onMouseOver={handleMouseOverService}>
        <Button>Service</Button>
        {isServiceDropdownOpen && (
          <div
            className="dropdownWrapper"
            onMouseLeave={handleMouseLeaveService}
          >
            <ServicesContent></ServicesContent>
          </div>
        )}
      </div>
      <div className="drowndownContainer" onMouseOver={handleMouseOverProduct}>
        <Button>Products</Button>
        {isProductDropdownOpen && (
          <div
            className="dropdownWrapper"
            onMouseLeave={handleMouseLeaveProduct}
          >
            <ProductContent></ProductContent>
          </div>
        )}
      </div>
    </div>
  );
}
