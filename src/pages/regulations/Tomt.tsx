import React, { useEffect, useState } from "react";
import SideSpaceContainer from "@/components/common/sideSpace";
import PropertyDetail from "@/components/Ui/stepperUi/propertyDetail";
import Ic_generelt from "@/public/images/Ic_generelt.svg";
// import Ic_tak from "@/public/images/Ic_tak.svg";
import Ic_check_true from "@/public/images/Ic_check_true.svg";
import Img_product_detail_map from "@/public/images/Img_product_detail_map.png";
import Image from "next/image";
import Ic_steddy from "@/public/images/Ic_steddy.svg";
import Ic_build_housing from "@/public/images/Ic_build_housing.svg";
import Ic_build_garage from "@/public/images/Ic_build_garage.svg";
import Ic_building_platting from "@/public/images/Ic_building_platting.svg";
import Ic_Superstructure from "@/public/images/Ic_Superstructure.svg";
import Ic_vapp from "@/public/images/Ic_vapp.svg";
import Button from "@/components/common/button";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useUserLayoutContext } from "@/context/userLayoutContext";
import ContactForm from "@/components/Ui/stepperUi/contactForm";
import { useAddress } from "@/context/addressContext";
import Loader from "@/components/Loader";

const Tomt: React.FC<any> = ({ handleNext, lamdaDataFromApi }) => {
  const items = [
    {
      id: 1,
      imageSrc: Ic_build_housing,
      title: "Bygge bolig",
      price: "2.490.000 NOK",
    },
    {
      id: 2,
      imageSrc: Ic_build_garage,
      title: "Bygge garasje",
      price: "295.899 NOK",
    },
    {
      id: 1,
      imageSrc: Ic_Superstructure,
      title: "Påbygg",
      price: "490.000 NOK",
    },
    {
      id: 1,
      imageSrc: Ic_building_platting,
      title: "Bygge platting",
      price: "295.899 NOK",
    },
  ];

  const validationLoginSchema = Yup.object().shape({
    terms_condition: Yup.boolean().oneOf([true], "Påkrevd").required("Påkrevd"),
  });

  const [isLoginChecked, setIsLoginChecked] = useState(false);
  const handleLoginCheckboxChange = () => {
    setIsLoginChecked(!isLoginChecked);
  };

  const { loginUser, setLoginUser } = useUserLayoutContext();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("min_tomt_login") === "true";
    if (isLoggedIn) {
      setLoginUser(true);
    }
  }, []);

  useEffect(() => {
    if (!loginUser) {
      setIsPopupOpen(true);
    } else {
      setIsPopupOpen(false);
    }
  }, [loginUser]);

  const handleLoginSubmit = async (values: any) => {
    console.log(values);
    setIsPopupOpen(false);
    localStorage.setItem("min_tomt_login", "true");
    setLoginUser(true);
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPopupOpen]);
  const { getAddress } = useAddress();

  const [askData, setAskData] = useState<any | null>(null);
  const { additionalData, loadingAdditionalData } = useAddress();

  useEffect(() => {
    if (additionalData?.answer) {
      try {
        const cleanAnswer = additionalData.answer
          .replace(/```json|```/g, "")
          .trim();

        const data = JSON.parse(cleanAnswer);

        setAskData(data);
      } catch (error) {
        console.error("Error parsing additionalData.answer:", error);
        setAskData(null);
      }
    }
  }, [additionalData]);

  console.log(lamdaDataFromApi);

  return (
    <div className="relative">
      <PropertyDetail isShow={false} />
      <SideSpaceContainer className="relative">
        <div className="pt-[26px] pb-[46px] relative flex gap-[40px]">
          <div className="w-[66%]">
            <h2 className="text-black text-2xl font-semibold mb-6">
              Eiendomsinformajon
            </h2>
            <div className="w-full flex gap-8 mb-[60px]">
              <div className="w-2/6 border-t-2 border-b-0 border-l-0 border-r-0 border-purple pt-4">
                <table className="table-auto border-0 w-full text-left property_detail_tbl">
                  <tbody>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Festenummer
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {
                          lamdaDataFromApi?.propertyDetails?.matrikkelnummer
                            ?.festenummer
                        }
                      </td>
                    </tr>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Areal beregnet
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {lamdaDataFromApi?.areaDetails}
                      </td>
                    </tr>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Etableringsdato
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {
                          lamdaDataFromApi?.propertyDetails?.etableringsdato
                            ?.date
                        }
                      </td>
                    </tr>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Sist oppdatert
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {
                          lamdaDataFromApi?.propertyDetails?.oppdateringsdato?.timestamp.split(
                            "T"
                          )[0]
                        }
                      </td>
                    </tr>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Registrert Grunnerverv
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {lamdaDataFromApi?.propertyDetails
                          ?.harRegistrertGrunnerverv === "true"
                          ? "Ja"
                          : "Nei"}
                      </td>
                    </tr>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Registrert JordskifteKrevd
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {lamdaDataFromApi?.propertyDetails
                          ?.harRegistrertJordskifteKrevd === "true"
                          ? "Ja"
                          : "Nei"}
                      </td>
                    </tr>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Inngår i annen eiendom
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {lamdaDataFromApi?.propertyDetails
                          ?.inngarISamlaFastEiendom === "true"
                          ? "Ja"
                          : "Nei"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="w-2/6 border-t-2 border-b-0 border-l-0 border-r-0 border-purple pt-4">
                <table className="table-auto border-0 w-full text-left property_detail_tbl">
                  <tbody>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Seksjonert
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {lamdaDataFromApi?.propertyDetails?.erSeksjonert ===
                        "true"
                          ? "Ja"
                          : "Nei"}
                      </td>
                    </tr>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Tinglyst
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {lamdaDataFromApi?.propertyDetails?.tinglyst === "true"
                          ? "Ja"
                          : "Nei"}
                      </td>
                    </tr>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Kulturminner registrert
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {lamdaDataFromApi?.propertyDetails?.harKulturminne ===
                        "true"
                          ? "Ja"
                          : "Nei"}
                      </td>
                    </tr>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Aktive festegrunner
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {lamdaDataFromApi?.propertyDetails
                          ?.harAktiveFestegrunner === "true"
                          ? "Ja"
                          : "Nei"}
                      </td>
                    </tr>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Anmerket klage
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {lamdaDataFromApi?.propertyDetails?.harAnmerketKlage ===
                        "true"
                          ? "Ja"
                          : "Nei"}
                      </td>
                    </tr>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Grunnforurensning
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {lamdaDataFromApi?.propertyDetails
                          ?.harGrunnforurensing === "true"
                          ? "Ja"
                          : "Nei"}
                      </td>
                    </tr>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Utgått
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {lamdaDataFromApi?.propertyDetails?.utgatt === "true"
                          ? "Ja"
                          : "Nei"}
                      </td>
                    </tr>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Under Sammenslåing
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {lamdaDataFromApi?.propertyDetails
                          ?.underSammenslaingBestar === "true"
                          ? "Ja"
                          : "Nei"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="w-2/6 border-t-2 border-b-0 border-l-0 border-r-0 border-purple pt-4">
                <table className="table-auto border-0 w-full text-left property_detail_tbl">
                  <tbody>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Kommune
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {getAddress?.kommunenavn} Kommune
                      </td>
                    </tr>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Kommunenr
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {getAddress?.kommunenummer}
                      </td>
                    </tr>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Gårdsnummer
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {getAddress?.gardsnummer}
                      </td>
                    </tr>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Bruksnummer
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {getAddress?.bruksnummer}
                      </td>
                    </tr>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Festenr
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {getAddress?.festenummer}
                      </td>
                    </tr>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Seksjonsnr
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {
                          lamdaDataFromApi?.propertyDetails?.matrikkelnummer
                            ?.seksjonsnummer
                        }
                      </td>
                    </tr>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Bruksnavn
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {lamdaDataFromApi?.propertyDetails?.bruksnavn}
                      </td>
                    </tr>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Oppmåling ikke fullført
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {lamdaDataFromApi?.propertyDetails
                          ?.oppmalingIkkeFullfort === "true"
                          ? "Ja"
                          : "Nei"}
                      </td>
                    </tr>
                    <tr className="flex gap-[10px] justify-between">
                      <td className="text-left pb-[16px] text-secondary text-sm">
                        Mangler grensepunktmerking
                      </td>
                      <td className="text-right pb-[16px] text-black text-sm font-semibold w-full truncate max-w-[120px]">
                        {lamdaDataFromApi?.propertyDetails
                          ?.grensepunktmerkingMangler === "true"
                          ? "Ja"
                          : "Nei"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mb-[34px]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-black text-2xl font-semibold">
                  Reguleringsbestemmelser
                </h2>
                <Image src={Ic_generelt} alt="image" />
              </div>
              <div className="flex flex-col gap-3">
                {loadingAdditionalData ? (
                  <Loader />
                ) : (
                  <>
                    {askData &&
                      askData?.conclusion?.map((a: any, index: number) => (
                        <div
                          className="flex items-start gap-3 text-secondary text-base"
                          key={index}
                        >
                          <Image src={Ic_check_true} alt="image" />
                          <span>{a}</span>
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-black text-2xl font-semibold">
                  Kommuneplan for Asker
                </h2>
                <Image src={Ic_generelt} alt="image" />
              </div>
              <div className="flex flex-col gap-3">
                {loadingAdditionalData ? (
                  <Loader />
                ) : (
                  <>
                    {askData &&
                      askData?.applicable_rules?.map(
                        (a: any, index: number) => (
                          <div
                            className="flex items-start gap-3 text-secondary text-base"
                            key={index}
                          >
                            <Image src={Ic_check_true} alt="image" />
                            <div>
                              {a.rule}{" "}
                              <span className="text-primary font-bold">
                                {a.section}
                              </span>
                            </div>
                          </div>
                        )
                      )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-[34%]">
            <h2 className="text-black text-2xl font-semibold mb-6">
              Kartutsnitt
            </h2>
            <Image
              src={Img_product_detail_map}
              alt="image"
              className="rounded-[12px] overflow-hidden w-full mb-[60px]"
            />
            <div>
              <div className="flex items-center gap-[36px] mb-6">
                <Image src={Ic_steddy} alt="logo" />
                <p className="text-secondary text-sm">
                  Vi hjelper deg med{" "}
                  <span className="text-black font-semibold">
                    reguleringer, søknader
                  </span>{" "}
                  og{" "}
                  <span className="text-black font-semibold">
                    innheter tilbud.
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-6">
                {items.map((item, index) => (
                  <div key={index}>
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      className="rounded-full overflow-hidden w-[80px] h-[80px] mb-3"
                    />
                    <h6 className="text-black font-medium text-base mb-2">
                      {item.title}
                    </h6>
                    <div className="gap-4 flex items-center justify-between mb-3">
                      <p className="text-secondary text-sm">Pris fra</p>
                      <h5 className="text-black text-base font-semibold">
                        {item.price}
                      </h5>
                    </div>
                    <Button
                      text="Utforsk boliger"
                      className="border border-lightPurple bg-lightPurple text-blue sm:text-base rounded-[8px] w-full h-[36px] md:h-[40px] lg:h-[48px] font-semibold relative"
                      path=""
                    />
                  </div>
                ))}
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
        {!loginUser && (
          <div
            className="absolute top-0 h-full w-full left-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.7) 100%, rgba(255, 255, 255, 0.7) 100%)",
            }}
          ></div>
        )}
      </SideSpaceContainer>
      <div
        className="sticky bottom-0 bg-white py-6"
        style={{
          boxShadow:
            "0px -4px 6px -2px #10182808, 0px -12px 16px -4px #10182814",
        }}
      >
        <SideSpaceContainer>
          <div className="flex justify-end gap-4 items-center">
            <Button
              text="Tilbake"
              className="border border-lightPurple bg-lightPurple text-blue sm:text-base rounded-[8px] w-max h-[36px] md:h-[40px] lg:h-[48px] font-medium desktop:px-[46px] relative desktop:py-[16px]"
              path="/"
            />
            <Button
              text="Velg husmodell"
              className="border border-primary bg-primary text-white sm:text-base rounded-[8px] w-max h-[36px] md:h-[40px] lg:h-[48px] font-semibold relative desktop:px-[28px] desktop:py-[16px]"
              onClick={() => {
                handleNext();
              }}
            />
          </div>
        </SideSpaceContainer>
      </div>

      {isPopupOpen && !loginUser && (
        <div className="fixed top-0 left-0 flex justify-center items-center h-full w-full">
          <div
            className="bg-white p-8 rounded-[8px] w-[787px]"
            style={{
              boxShadow:
                "0px 8px 8px -4px rgba(16, 24, 40, 0.031), 0px 20px 24px -4px rgba(16, 24, 40, 0.078)",
            }}
          >
            <h2 className="text-black text-[24px] font-semibold mb-2 text-center">
              Registrer deg
            </h2>
            <p className="text-secondary text-base text-center mb-2">
              Logg inn med{" "}
              <span className="font-semibold text-black">Vipps</span> for å få
              se{" "}
              <span className="font-semibold text-black">
                alle bestemmelser og finne <br />
                boliger som passer på denne eiendommen
              </span>
            </p>
            <Formik
              initialValues={{ terms_condition: false }}
              validationSchema={validationLoginSchema}
              onSubmit={handleLoginSubmit}
            >
              {({ values, setFieldValue, errors, touched }) => (
                <Form>
                  <div className="flex items-center justify-center flex-col">
                    <label className="flex items-center gap-[12px] container w-max">
                      <Field
                        type="checkbox"
                        name="terms_condition"
                        checked={isLoginChecked}
                        onChange={() => {
                          setFieldValue(
                            "terms_condition",
                            !values.terms_condition
                          );
                          handleLoginCheckboxChange();
                        }}
                      />
                      <span className="checkmark checkmark_primary"></span>

                      <div className="text-secondary text-base">
                        Jeg aksepterer{" "}
                        <span className="text-primary">Vilkårene</span> og har
                        lest{" "}
                        <span className="text-primary">
                          Personvernerklæringen
                        </span>
                      </div>
                    </label>
                    {errors.terms_condition && touched.terms_condition && (
                      <div className="text-red text-sm">
                        {errors.terms_condition}
                      </div>
                    )}
                    <div className="flex justify-end mt-6">
                      <button
                        className="
                            text-sm md:text-base lg:py-[10px] py-[4px] px-2 md:px-[10px] lg:px-[18px] h-[36px] md:h-[40px] lg:h-[44px] flex items-center gap-[12px] justify-center border border-primary bg-primary text-white sm:text-base rounded-[8px] w-max font-semibold relative desktop:px-[28px] desktop:py-[16px]"
                      >
                        Fortsett med <Image src={Ic_vapp} alt="logo" />
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tomt;
