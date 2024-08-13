import { fetchSingleProducts } from "@/src/utils/service";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ToastAndroid,
} from "react-native";
import SVButton from "../components/SVButton";
import SWView from "../components/SView";
import Text from "../components/SVText";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addToCart } from "../redux/slices/appSlice";
import theme from "../theme/theme";

type Props = {
  visible: Object;
  onClose: () => void;
};
const ProductModal = ({ onClose, visible }: Props) => {
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { items } = useAppSelector((state) => state?.appSlice);

  async function getSingleProduct() {
    try {
      setIsLoading(true);
      let res = await fetchSingleProducts({ id: visible?.id });
      // console.log("single product", res);
      setProduct(res);
    } catch (error) {
      console.log("error getting single product", error);
    } finally {
      setIsLoading(false);
    }
  }

  const isProductInCart = items.some(({ id }) => id === product?.id);
  function handleAddToCart() {
    if (isProductInCart) {
      ToastAndroid.show("Product already added to cart", ToastAndroid.SHORT);
    } else {
      try {
        dispatch(addToCart(product));
      } catch (error) {
        console.error("error while adding to cart", error);
        ToastAndroid.show("Error while adding to cart", ToastAndroid.SHORT);
      }
    }
  }

  useEffect(() => {
    getSingleProduct();
  }, [visible?.visible]);

  const handleOverlayPress = (event: any) => {
    const isInsideModal = event.target === event.currentTarget;
    if (isInsideModal) {
      onClose();
    }
  };

  return (
    <Modal
      onDismiss={onClose}
      visible={visible?.visible}
      animationType="slide"
      transparent={true}
    >
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: "center" }}
        behavior="height"
      >
        <Pressable
          onPress={(event) => {
            handleOverlayPress(event);
          }}
          style={{
            flex: 1,
            borderColor: "blue",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* main content */}
          <SWView
            backgroundColor="background"
            height={"60%"}
            maxHeight={"80%"}
            width={"85%"}
            borderRadius="m"
            flexDirection="column"
            padding="m"
            justifyContent="space-between"
          >
            {isLoading ? (
              <SWView flex={1} justifyContent="center" alignItems="center">
                <ActivityIndicator
                  size={"large"}
                  color={theme?.colors?.blueText}
                />
              </SWView>
            ) : (
              <>
                <SWView alignItems="center" marginTop="s">
                  <Image
                    resizeMode="contain"
                    height={150}
                    width={200}
                    
                    source={{ uri: product?.image }}
                  />
                </SWView>
                <SWView
                  flexDirection="row"
                  justifyContent="space-between"
                  marginTop="m"
                  gap="s"
                >
                                    <SWView flex={1}>
                    <Text fontSize={15} fontFamily="gilroy-bold">
                      {product?.title}
                    </Text>
                  </SWView>
                  <Text color="light_green" fontSize={20} fontFamily="gilroy-bold">
                  ₹{""}{product?.price}
                  </Text>

                </SWView>

                <SWView
                  flex={1}
                  flexDirection="row"
                  justifyContent="space-between"
                  marginTop="m"
                  gap="s"
                >
                  <Text fontSize={17} fontFamily="gilroy-medium">
                    Description:{" "}
                  </Text>
                  <SWView flex={1}>
                    <Text fontSize={16} fontFamily="gilroy-medium">
                      {product?.description?.slice(0,273)}
                    </Text>
                  </SWView>
                </SWView>

                <SWView
                  flexDirection="row"
                  gap="s"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <SVButton
                    surface={isProductInCart ? "blueText" : "errorRed"}
                    onPress={() => {
                      handleAddToCart();
                    }}
                    fontSize={18}
                    width={180}
                    height={45}
                    title={isProductInCart ? "Added" : "Add To Cart"}
                  />
                  <SVButton
                  textColor="surface_dark"
                    onPress={() => onClose()}
                    surface="surface_dark_shade_1"
                    fontSize={18}
                    width={100}
                    height={45}
                    title="Close"
                  />
                </SWView>
              </>
            )}
          </SWView>
          {/* main content */}
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ProductModal;
