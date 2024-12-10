import React from "react";
import Img_product1 from "@/public/images/Img_product1.png";
import Img_product2 from "@/public/images/Img_product2.png";
import Img_product_logo1 from "@/public/images/Img_product_logo1.png";
import Img_product_logo2 from "@/public/images/Img_product_logo2.png";
import Img_product3 from "@/public/images/Img_product3.png";
import Img_product4 from "@/public/images/Img_product4.png";
import Img_product_logo3 from "@/public/images/Img_product_logo3.png";
import Img_product_logo4 from "@/public/images/Img_product_logo4.png";
import Img_product_map1 from "@/public/images/Img_product_map1.png";
import Button from "@/components/common/button";
import Property from "@/components/common/property";

const AllProperty: React.FC<any> = () => {
  const propertyList = [
    {
      id: 1,
      href: "",
      image: Img_product1,
      logo: Img_product_logo1,
      map: Img_product_map1,
      title: "Herskapelige Almgaard er en drømmebolig for familien",
      price: "5.860.000 NOK",
      area: "233",
      bedrooms: "5",
      bathrooms: "3",
    },
    {
      id: 2,
      href: "",
      image: Img_product2,
      logo: Img_product_logo2,
      map: Img_product_map1,
      title: "Drøbak - dette huset har en enkel, ren og moderne fasade",
      price: "5.210.000 NOK",
      area: "179",
      bedrooms: "4",
      bathrooms: "2",
    },
    {
      id: 3,
      href: "",
      image: Img_product3,
      logo: Img_product_logo3,
      map: Img_product_map1,
      title: "Funkishus med utleiedel",
      price: "4.980.000  NOK",
      area: "172",
      bedrooms: "3/4",
      bathrooms: "2",
    },
    {
      id: 4,
      href: "",
      image: Img_product4,
      logo: Img_product_logo4,
      map: Img_product_map1,
      title: "Askøy med pulttak – Moderne hus tilpasset utleie",
      price: "5.860.000  NOK",
      area: "184",
      bedrooms: "4",
      bathrooms: "2",
    },
    {
      id: 5,
      href: "",
      image: Img_product1,
      logo: Img_product_logo1,
      map: Img_product_map1,
      title: "Herskapelige Almgaard er en drømmebolig for familien",
      price: "5.860.000 NOK",
      area: "233",
      bedrooms: "5",
      bathrooms: "3",
    },
    {
      id: 6,
      href: "",
      image: Img_product2,
      logo: Img_product_logo2,
      map: Img_product_map1,
      title: "Drøbak - dette huset har en enkel, ren og moderne fasade",
      price: "5.210.000 NOK",
      area: "179",
      bedrooms: "4",
      bathrooms: "2",
    },
    {
      id: 7,
      href: "",
      image: Img_product3,
      logo: Img_product_logo3,
      map: Img_product_map1,
      title: "Funkishus med utleiedel",
      price: "4.980.000  NOK",
      area: "172",
      bedrooms: "3/4",
      bathrooms: "2",
    },
    {
      id: 8,
      href: "",
      image: Img_product4,
      logo: Img_product_logo4,
      map: Img_product_map1,
      title: "Askøy med pulttak – Moderne hus tilpasset utleie",
      price: "5.860.000  NOK",
      area: "184",
      bedrooms: "4",
      bathrooms: "2",
    },
  ];
  return (
    <>
      <div className="pt-[16px] pb-[146px]">
        <h3 className="text-black text-2xl font-semibold mb-[36px]">
          Følgende husmodeller kan bygges på denne tomten
        </h3>
        <div className="grid grid-cols-4 gap-x-8 gap-y-12">
          <Property
            propertyList={propertyList}
            LinkHref={"/regulations?regulation-details"}
          />
        </div>
        <div className="flex justify-center mt-[60px]">
          <Button
            text="See More"
            className="border border-lightPurple bg-lightPurple text-blue sm:text-base rounded-[8px] w-max h-[36px] md:h-[40px] lg:h-[48px] font-medium desktop:px-[54px] relative desktop:py-[16px]"
            path="/"
          />
        </div>
      </div>
    </>
  );
};

export default AllProperty;