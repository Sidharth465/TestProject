import SWView from "@/src/library/components/SView";

import { Tabs } from "expo-router";
import React from "react";
import Svg, { Path } from "react-native-svg";

const HomeIcon = ({ isFocused }:any) => {
  const fill = isFocused ? "#008DFF" : "#87898a";
  return (
    <Svg viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM9.44661 15.3975C9.11385 15.1508 8.64413 15.2206 8.39747 15.5534C8.15082 15.8862 8.22062 16.3559 8.55339 16.6025C9.5258 17.3233 10.715 17.75 12 17.75C13.285 17.75 14.4742 17.3233 15.4466 16.6025C15.7794 16.3559 15.8492 15.8862 15.6025 15.5534C15.3559 15.2206 14.8862 15.1508 14.5534 15.3975C13.825 15.9373 12.9459 16.25 12 16.25C11.0541 16.25 10.175 15.9373 9.44661 15.3975Z"
        fill={fill}
      />
    </Svg>
  );
};


const UserIcon = ({ isFocused }:any) => {
  const fill = isFocused ? "#008DFF" : "#87898a";
  return (
    <Svg width="20" height="20" viewBox="0 0 0.4 0.4" xmlns="http://www.w3.org/2000/svg"><Path fill={fill} d="M.35.328V.3H.115L.13.272.36.249.4.1H.093L.075.025H0V.05h.055l.053.21-.033.065v.038c0 .02.017.038.038.038S.15.383.15.363.133.325.113.325H.3v.038c0 .02.017.038.038.038S.376.384.376.363Q.375.336.351.328"/></Svg>
  );
};


export default function MainLayout() {
  return (
    <Tabs 
     initialRouteName="(product)/index"

    screenOptions={{
      
      headerShown: false,
      tabBarLabelStyle:{fontSize:16,fontFamily:"gilroy-bold",letterSpacing:0.5}
      
     
    }}>
      <Tabs.Screen name="(products)/index" options={{title:"Products", tabBarIcon: ({ focused, color, size }) => (
          <SWView height={25} width={25} >
              <HomeIcon isFocused={focused} />
          </SWView>
          ),
          
}} />
      <Tabs.Screen name="(cart)/index"  options={{title:"Cart", tabBarIcon: ({ focused, color, size }) => (
            <UserIcon isFocused={focused} />
          ),}} />
    </Tabs>
  );
}
