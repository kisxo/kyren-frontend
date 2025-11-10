import { useEffect } from "react";
import "./NotificationSlider.css";
import { pink } from '@mui/material/colors';
import { Alert } from "@mui/material";
import { AccessAlarm, WhatsApp, ElectricBolt, Discount} from "@mui/icons-material";

function NotificationSlider () {

    return (
        <div className="scroller">
            <div className="item item-1">            
                <ElectricBolt className="scroller-icon"/>Instant Delivery  with Automatic Checkout <ElectricBolt className="scroller-icon"/>
            </div> 

            <div className="item item-2">
                <AccessAlarm className="scroller-icon"/> 
                 24/7 Customer Support
                <WhatsApp className="scroller-icon"/>
                <a href="https://wa.me/916003251677" target="_blank"> 6003251677</a>
                
            </div>
            <div className="item item-3">
                <Discount className="scroller-icon"/> 
                 Exclusive Deals & Discounts.
                <span>Only on Kyren Official Store</span>  
               
            </div>
        </div>
    );
}

export default NotificationSlider;