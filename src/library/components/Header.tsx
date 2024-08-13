import { Theme } from "@theme";
import SWView from "./SView";
import Text from "./SVText";
import React from "react";
type PageHeaderType = {
 
  title?:string,
};

const LogoHeader = ({ title}: PageHeaderType) => {

  

  return (
        <SWView  backgroundColor="header_color" height={60} paddingHorizontal="s"> 
           
            <SWView flex={1} justifyContent="center" alignItems="center">
                <Text opacity={0.7}  fontFamily="gilroy-bold" color="text_on_secondary" fontSize={24} textAlign="center">{title}</Text>
            </SWView>
            

        </SWView>
  

  );
};

export default LogoHeader;