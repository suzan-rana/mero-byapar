import { useEffect } from "react";
import { toast } from "react-toastify";

export default function useLoader(isMutating: boolean) {
  useEffect(() => {
    if (isMutating) {
      toast.loading("Loading...", {
        toastId: "LOADING",
      });
    } else {
      toast.dismiss("LOADING");
    }
  }, [isMutating]);
}
