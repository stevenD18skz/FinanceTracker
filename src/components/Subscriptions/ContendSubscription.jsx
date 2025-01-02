import React from "react";
import CardSubscriptions from "./CardSubcriptions";
import { PlusCircle } from "lucide-react";
import "./ContendSubscription.css";

const ContendSubscription = ({ subscriptionData }) => {
  return (
    <div className="">
      <h3>Cards</h3>

      <div className="subscription-list custom-scrollbar-x">
        {subscriptionData.map((card) => (
          <CardSubscriptions subscription={card} />
        ))}

        <div className="card">
          <button className="icon">
            <PlusCircle className="icon-img" />
            <span className="icon-text">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContendSubscription;
