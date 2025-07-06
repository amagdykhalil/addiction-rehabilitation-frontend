import { useState, useEffect } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { useUserExistsById } from "@/features/users/hooks";
import { useUserExistsByNationalId } from "@/features/users/hooks";
import { useUserExistsByPassport } from "@/features/users/hooks";
import { useUserExistsByEmail } from "@/features/users/hooks";
import { ROUTES } from "@/shared/routes";

export type UserSearchType = "id" | "nationalId" | "passport" | "email";
interface UserSearchParams {
  type: UserSearchType;
  value: string;
}

export function useUserSearch(initialType: UserSearchType = "id") {
  const navigate = useNavigate();
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [searchParams, setSearchParams] = useState<UserSearchParams>({
    type: initialType,
    value: "",
  });
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [foundUserId, setFoundUserId] = useState<string | null>(null);

  // Prepare all hooks
  const hooks = {
    id: useUserExistsById(
      searchTriggered && searchParams.type === "id" ? searchParams.value : "",
    ),
    nationalId: useUserExistsByNationalId(
      searchTriggered && searchParams.type === "nationalId"
        ? searchParams.value
        : "",
    ),
    passport: useUserExistsByPassport(
      searchTriggered && searchParams.type === "passport"
        ? searchParams.value
        : "",
    ),
    email: useUserExistsByEmail(
      searchTriggered && searchParams.type === "email"
        ? searchParams.value
        : "",
    ),
  };

  // Pick the active hook result
  const { exists, isLoading, error } = hooks[searchParams.type];
  const userId =
    searchParams.type !== "id"
      ? (hooks[searchParams.type] as { userId?: string }).userId
      : undefined;
  useEffect(() => {
    if (!searchTriggered) return;

    if (exists) {
      const FoundId =
        searchParams.type === "id" ? searchParams.value : (userId ?? null);
      setFoundUserId(FoundId);
      navigate(
        generatePath(`${ROUTES.USERS.MAIN_PATH}/${ROUTES.USERS.DETAIL}`, {
          userId: String(FoundId),
        }),
      );
      setSearchDialogOpen(false);
      setSearchParams({ type: initialType, value: "" });
      setSearchTriggered(false);
      setNotFound(false);
    } else if (!isLoading && !exists && !error) {
      setNotFound(true);
      setSearchTriggered(false);
      setFoundUserId(null);
    }
  }, [
    searchTriggered,
    searchParams,
    exists,
    isLoading,
    error,
    navigate,
    initialType,
    userId,
  ]);

  return {
    searchDialogOpen,
    setSearchDialogOpen,
    searchParams,
    setSearchParams,
    searchTriggered,
    setSearchTriggered,
    notFound,
    setNotFound,
    isLoading,
    error,
    foundUserId,
  };
}

export default useUserSearch;
