import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import toast from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface UseFavourite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavourite = ({ listingId, currentUser }: UseFavourite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavourited = useMemo(() => {
    const list = currentUser?.favouriteIds || [];
    return list.includes(listingId);
  }, [currentUser?.favouriteIds, listingId]);

  const toggleFavourite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!currentUser) return loginModal.onOpen();
    try {
      if (hasFavourited) await axios.delete(`/api/favourites/${listingId}`);
      else await axios.post(`/api/favourites/${listingId}`);
      router.refresh();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return { hasFavourited, toggleFavourite };
};

export default useFavourite;
