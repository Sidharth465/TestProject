import LogoHeader from "@/src/library/components/Header";
import SWView from "@/src/library/components/SView";
import Text from "@/src/library/components/SVText";
import Backdrop from "@/src/library/container/Backdrop";
import ProductModal from "@/src/library/container/ProductModal";
import theme from "@/src/library/theme/theme";
import { fetchAllProducts } from "@/src/utils/service";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable } from "react-native";
import { Rating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";

 const ProductListCard = ({ item, setVisible, index }: any) => {
  const starImage = require("@assets/images/star.png");

  return (
    <Pressable
      onPress={() => setVisible({ visible: true, id: item?.id })}
      style={{ marginVertical: 5 }}
    >
      <SWView
        padding="s"
        elevation={4}
        flex={1}
        width={300}
        justifyContent="space-between"
        flexDirection="row"
        borderRadius="s"
        borderWidth={2}
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

          <Text fontFamily="gilroy-bold" fontSize={16}>
            Rs. {item?.price}
          </Text>
          <SWView>
            <Text opacity={0.6}>Category: {item?.category}</Text>
          </SWView>
        </SWView>
      </SWView>
    </Pressable>
  );
  
};

type Props = {
  visible: Boolean;
  index: Number | null;
};
const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [visible, setVisible] = useState<Props>({
    visible: false,
    index: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  function onClose() {
    setVisible({ visible: false, index: null });
  }

  async function getAllProducts() {
    try {
      setIsLoading(true);
      let res = await fetchAllProducts();
      setAllProducts(res);
      // console.log("resProducts", res);
    } catch (error) {
      console.log("error getting products", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:"#FFFF" }}>
      <LogoHeader title="Shopping" />
      {isLoading ? (
        <SWView
          flex={1}
          justifyContent="center"
          alignItems="center"
          backgroundColor="background"
        >
          <ActivityIndicator size={"large"} color={theme?.colors?.blueText} />
        </SWView>
      ) : (
        <>
          <SWView
            paddingBottom="xl"
            alignItems="center"
            backgroundColor="background"
            justifyContent="center"
          >
            <FlatList
              showsVerticalScrollIndicator={false}
              data={allProducts}
              renderItem={({ item, index }) => (
                <ProductListCard
                  item={item}
                  index={index}
                  setVisible={setVisible}
                />
              )}
            />
          </SWView>

          <ProductModal onClose={onClose} visible={visible} />
          {visible?.visible && <Backdrop />}
        </>
      )}
    </SafeAreaView>
  );
};

export default Products;
