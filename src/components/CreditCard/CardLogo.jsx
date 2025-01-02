import React from "react";
import { CreditCard as CardIcon } from "lucide-react";

// Import the logo images
import visaLogo from "../../assets/visa.png";
import mastercardLogo from "../../assets/mastercard.png";
import nubankLogo from "../../assets/nubank.png";

const CardLogo = ({ type }) => {
  const logos = {
    visa: <img src={visaLogo} alt="Visa" className="h-12 w-20" />,
    mastercard: (
      <img src={mastercardLogo} alt="Mastercard" className="h-12 w-20" />
    ),
    nubank: <img src={nubankLogo} alt="Visa" className="h-12 w-20" />,
  };

  return <div className="text-white">{logos[type]}</div>;
};

export default CardLogo;
