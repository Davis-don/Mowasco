import { useEffect, useMemo } from "react";

export const useDate = () => {
  const formatDate = (date) => {
    const toBeChangedDate = new Date(date);
    // return toBeChangedDate.toLocaleString()
    return toBeChangedDate.toLocaleDateString("en-US", {
      day: "numeric",
      year: "numeric",
      month: "long",
    });
  };
  return { formatDate };
};
