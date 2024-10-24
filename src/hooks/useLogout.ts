import { useState } from "react";
import { useDispatch } from "react-redux";

import { toast } from "@/components/ui/use-toast";
import {
  logoutUserFailure,
  logoutUserLoading,
  logoutUserSuccess,
} from "@/features/user/userSlice";

const useLogout = () => {
  const [error, setError] = useState<unknown>();

  const dispatch = useDispatch();

  const logout = async () => {
    //todo: Để thực hiện logout function: Post api logout -> tại api thực hiện clearCookie access_token. Tại front-end thực hiện update currentUser thành user rỗng
    try {
      dispatch(logoutUserLoading());
      const res = await fetch(
        `${import.meta.env.VITE_API_ROUTE}${import.meta.env.VITE_LOGOUT}`,
        {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const { message } = await res.json();
      if (res.ok) {
        dispatch(logoutUserSuccess());
        toast({
          className: "bg-green-600 border-0 text-white rounded-[0.375rem]",
          description: message,
        });
      } else {
        toast({
          variant: "destructive",
          className: "bg-red-600 border-0 text-white rounded-[0.375rem]",
          description: message,
        });
        dispatch(logoutUserFailure());
      }
    } catch (error: unknown) {
      setError(error);
      dispatch(logoutUserFailure());
    }
  };
  return { error, logout };
};

export default useLogout;
