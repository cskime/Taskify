import { Invitation } from "@/types/invitation";
import { useMemo, useState } from "react";

export function useInvitationSearch(invitations: Invitation[]) {
  const [searchValue, setSearchValue] = useState<string>("");

  const filteredInvitations = useMemo(() => {
    return invitations.filter((item) =>
      item.dashboard.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [invitations, searchValue]);

  return {
    searchValue,
    setSearchValue,
    filteredInvitations,
  };
}
