import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoHeader from "@/src/library/components/Header";
import { err } from "react-native-svg";
import { fetchAllProducts } from "@/src/utils/service";
import { useIsFocused } from "@react-navigation/native";
import SWView from "@/src/library/components/SView";
import { FlatList, Image } from "react-native";


const ProductListCard =({item}:any)=>{
  return(
    <SWView flex={1}  alignItems="center" flexDirection="row" borderRadius="ms" borderWidth={2} borderColor="surface_dark_shade_1" marginVertical="ms"  width={300} backgroundColor="background" gap="s">
      <SWView   width={50} borderWidth={1}>
        <Image  height={50} width={50} source={{uri:item?.image}}/>

      </SWView>
      <SWView flex={1}  width={50} borderWidth={1}>

      </SWView>



    </SWView>
  )
}

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  

  async function getAllProducts() {
    try {
      let res = await fetchAllProducts();
      setAllProducts(res);
      // console.log("resProducts", res);
    } catch (error) {
      console.log("error getting products", error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <SafeAreaView style={{flex:1}}>
      <LogoHeader title="Shopping" />
      <SWView paddingBottom="xl" alignItems="center" backgroundColor="background" justifyContent="center"  > 
        <FlatList data={allProducts} renderItem={({item,index})=> <ProductListCard item={item}/>} />

      </SWView>
    </SafeAreaView>
  );
};

export default Products;
