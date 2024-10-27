import { ListingReduxType } from "@/types/types";
import { useState, useEffect } from "react";

const useGetListing = (url: string) => {
  const [dataListing, setDataListing] = useState<ListingReduxType>();
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(url, {
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
          },
          cache: "no-cache",
        });
        if (res.ok) {
          const data = await res.json();
          setDataListing(data);
        }
      } catch (error: unknown) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [url]);
  return { isLoading, error, dataListing, setDataListing };
};

export default useGetListing;
