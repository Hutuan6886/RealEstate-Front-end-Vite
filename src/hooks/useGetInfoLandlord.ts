import { useEffect, useState } from "react";

import { LandlordType } from "@/types/types";

const useGetInfoLandlord = (listingId?: string) => {
  const [infoLandlord, setInfoLandlord] = useState<LandlordType>();
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const resquest = await fetch(
          `${import.meta.env.VITE_API_ROUTE}${import.meta.env.VITE_GET_LISTING_LANDLORD}/${listingId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "Application/json",
            },
            cache: "no-cache",
          }
        );
        if (resquest.ok) {
          const dataInfoLandlord = await resquest.json();
          setInfoLandlord(dataInfoLandlord);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [listingId]);
  return { isLoading, error, infoLandlord };
};

export default useGetInfoLandlord;
