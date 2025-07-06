import { useState, useEffect } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import usePatientExistsById from "@/features/patients/hooks/usePatientExistsById";
import usePatientExistsByNationalId from "@/features/patients/hooks/usePatientExistsByNationalId";
import usePatientExistsByPassport from "@/features/patients/hooks/usePatientExistsByPassport";
import { PATIENTS_ROUTES } from "@/entities/patients/routes";

export type PatientSearchType = "id" | "nationalId" | "passport";
interface PatientSearchParams {
  type: PatientSearchType;
  value: string;
}

export function usePatientSearch(initialType: PatientSearchType = "id") {
  const navigate = useNavigate();
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [searchParams, setSearchParams] = useState<PatientSearchParams>({
    type: initialType,
    value: "",
  });
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [foundPatientId, setFoundPatientId] = useState<string | null>(null);

  // Prepare all hooks
  const hooks = {
    id: usePatientExistsById(
      searchTriggered && searchParams.type === "id" ? searchParams.value : ""
    ),
    nationalId: usePatientExistsByNationalId(
      searchTriggered && searchParams.type === "nationalId"
        ? searchParams.value
        : ""
    ),
    passport: usePatientExistsByPassport(
      searchTriggered && searchParams.type === "passport"
        ? searchParams.value
        : ""
    ),
  };

  // Pick the active hook result
  const { exists, isLoading, error } = hooks[searchParams.type];
  const patientId =
    searchParams.type !== "id"
      ? (hooks[searchParams.type] as { patientId?: string }).patientId
      : undefined;

  useEffect(() => {
    if (!searchTriggered) return;
    if (exists) {
      const FoundId =
        searchParams.type === "id" ? searchParams.value : (patientId ?? null);
      setFoundPatientId(FoundId);
      navigate(
        generatePath(`${PATIENTS_ROUTES.MAIN_PATH}/${PATIENTS_ROUTES.DETAIL}`, {
          patientId: String(FoundId),
        })
      );
      setSearchDialogOpen(false);
      setSearchParams({ type: initialType, value: "" });
      setSearchTriggered(false);
      setNotFound(false);
    } else if (!isLoading && !exists && !error) {
      setNotFound(true);
      setSearchTriggered(false);
      setFoundPatientId(null);
    }
  }, [
    searchTriggered,
    searchParams,
    exists,
    isLoading,
    error,
    navigate,
    initialType,
    patientId,
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
    foundPatientId,
  };
}

export default usePatientSearch;
