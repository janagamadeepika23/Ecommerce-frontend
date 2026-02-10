import acData from "./data/ac";
import bagData from "./data/Bag";
import bodyLotionData from "./data/bodyLotionData";
import booksData from "./data/books";
import computerData from "./data/computers";
import footwear from "./data/footwear";
import fridgeData from "./data/fridge";
import furnitureData from "./data/furniture";
import jewelleryData from "./data/Jewellery";
import KidstoysData from "./data/Kidstoys";
import kidsWearData from "./data/Kidwear";
import kitchenData from "./data/kitchen";
import { makeupData } from "./data/Makeup";
import menData from "./data/men";
import MenwearData from "./data/Menswear";
import mobileData from "./data/mobiles";
import proData from "./data/proData";
import sareeData from "./data/saree";
import speakerData from "./data/speaker";
import studytableData from "./data/studytable";
import tvData from "./data/tv";
import walletData from "./data/wallet";
import watchData from "./data/watch";
import womanData from "./data/woman";
import womenwearData from "./data/womenwear";

export const allProductsData = [
  ...acData,
  ...booksData,
  ...computerData,
  ...fridgeData,
  ...furnitureData,
  ...kitchenData,
  ...menData,
  ...mobileData,
  ...speakerData,
  ...tvData,
  ...watchData,
  ...womanData,
  ...proData,
  ...bodyLotionData,
  ...womenwearData,
  ...studytableData,
  ...jewelleryData,
  ...footwear,
  ...makeupData,
  ...kidsWearData,
  ...MenwearData,
  ...bagData,
  ...sareeData,
  ...KidstoysData,
  ...walletData,
];

export default allProductsData;

