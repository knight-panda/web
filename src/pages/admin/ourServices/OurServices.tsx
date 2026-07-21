import "./OurServices.css";

import serviceImage_1 from "../../../assets/1.png";
import serviceImage_2 from "../../../assets/2.png";
import serviceImage_3 from "../../../assets/3.png";
import serviceImage_4 from "../../../assets/5.png";
import serviceImage_5 from "../../../assets/6.png";


const OurServices = () => {

  const serviceImages = [
    serviceImage_1,
    serviceImage_2,
    serviceImage_3,
    serviceImage_4,
    serviceImage_5
  ];

  return (
    <div className="admin-service-container">
      {serviceImages.map((img, index) => (
        <div key={index} className="service-item">
          <img className="as-img" src={img} alt={`service-${index}`} />
        </div>
      ))}
    </div>
  );
};

export default OurServices;