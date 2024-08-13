import LogoHeader from "@/src/library/components/Header";
import SWView from "@/src/library/components/SView";
import Text from "@/src/library/components/SVText";
import { useAppDispatch, useAppSelector } from "@/src/library/redux/hooks";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "@/src/library/redux/slices/appSlice";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Image, Pressable } from "react-native";
import { Rating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductListCard = ({ item, index }: any) => {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(0);
  const starImage = require("@assets/images/star.png");
  function increment() {
    dispatch(incrementQuantity(item?.id));
  }

  function decrement() {
    dispatch(decrementQuantity(item?.id));
  }

  function remove() {
    dispatch(removeFromCart(item?.id));
  }

  return (
    <SWView
      padding="s"
      elevation={4}
      flex={1}
      width={350}
      justifyContent="space-between"
      flexDirection="row"
      borderRadius="s"
      borderWidth={2}
      marginVertical="s"
      borderColor="surface_dark_shade_1"
      backgroundColor="background"
      gap="ms"
    >
      <SWView>
        <Image
          resizeMode="contain"
          height={100}
          width={100}
          source={{ uri: item?.image }}
        />
      </SWView>
      <SWView flex={1} flexDirection="column" gap="s">
        <Text fontSize={16} fontFamily="gilroy-medium">
          {item?.title?.slice(0, 45)}...
        </Text>

        <SWView alignItems="center" flexDirection="row" gap="s">
          <Rating
            key={item?.id}
            readonly
            type="star"
            ratingImage={starImage}
            ratingColor="#3498db"
            ratingBackgroundColor="#c8c7c8"
            ratingCount={5}
            startingValue={item?.rating?.rate}
            imageSize={20}
          />
          <Text fontFamily="gilroy-bold" opacity={0.5}>
            {item?.rating?.count}
          </Text>
        </SWView>

        <SWView
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontFamily="gilroy-bold" fontSize={16}>
            Rs. {item?.price}
          </Text>

          <MaterialIcons onPress={remove} name="delete" size={24} color="red" />

          <SWView
            padding="sss"
            borderRadius="ss"
            width={85}
            height={30}
            backgroundColor="opacive_grey"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Pressable   onPress={decrement}>
              <Entypo name="minus" size={22} color="black" />
            </Pressable>
            <Text fontFamily="gilroy-bold" fontSize={16}>
              {item?.quantity}
            </Text>
            <Pressable onPress={increment}>
              <Entypo name="plus" size={22} color="black" />
            </Pressable>
          </SWView>
        </SWView>
        <SWView>
          <Text opacity={0.6}>Category: {item?.category}</Text>
        </SWView>
      </SWView>
    </SWView>
  );
};

const Cart = () => {
  const { items } = useAppSelector((state) => state?.appSlice);
  console.log("items at cart", items);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFF" }}>
      <LogoHeader title="Shopping" />
      {items?.length == 0 ? 
      <SWView flex={1} backgroundColor="background" justifyContent="center" alignItems="center">
        <Image resizeMode="contain"style={{ height:300, width:300}}  source={require("@assets/images/emptyCart.png")} />

      </SWView>:
       <>
       <SWView
         paddingBottom="xl"
         alignItems="center"
         backgroundColor="background"
         justifyContent="center"
       >
         <FlatList
           showsVerticalScrollIndicator={false}
           data={items}
           renderItem={({ item, index }) => (
             <ProductListCard item={item} index={index} />
           )}
         />
       </SWView>
     </>
      
      }

     
    </SafeAreaView>
  );
};

export default Cart;
