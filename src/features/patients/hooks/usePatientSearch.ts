import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useExistsById from "@/features/patients/hooks/useExistsById";
import useExistsByNationalId from "@/features/patients/hooks/useExistsByNationalId";
import useExistsByPassport from "@/features/patients/hooks/useExistsByPassport";
import { ROUTES } from "@/shared/routes/routesPaths";

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
  const [foundPatientId, setFoundPatientId] = useState<number | null>(null);

  // Hooks for each search type
  const {
    exists: existsById,
    isLoading: isLoadingById,
    error: errorById,
  } = useExistsById(
    searchTriggered && searchParams.type === "id" ? searchParams.value : "",
  );

  const {
    exists: existsByNationalId,
    patientId: patientIdByNationalId,
    isLoading: isLoadingByNationalId,
    error: errorByNationalId,
  } = useExistsByNationalId(
    searchTriggered && searchParams.type === "nationalId"
      ? searchParams.value
      : "",
  );

  const {
    exists: existsByPassport,
    patientId: patientIdByPassport,
    isLoading: isLoadingByPassport,
    error: errorByPassport,
  } = useExistsByPassport(
    searchTriggered && searchParams.type === "passport"
      ? searchParams.value
      : "",
  );

  // Effect to handle navigation or not found
  useEffect(() => {
    if (!searchTriggered) return;

    let found = false;
    let idToNavigate: number | null = null;

    if (searchParams.type === "id" && existsById) {
      found = true;
      idToNavigate = parseInt(searchParams.value);
    }
    if (
      searchParams.type === "nationalId" &&
      existsByNationalId &&
      patientIdByNationalId
    ) {
      found = true;
      idToNavigate = patientIdByNationalId;
    }
    if (
      searchParams.type === "passport" &&
      existsByPassport &&
      patientIdByPassport
    ) {
      found = true;
      idToNavigate = patientIdByPassport;
    }

    if (found && idToNavigate) {
      setFoundPatientId(idToNavigate);
      navigate(`${ROUTES.PATIENT.MAIN_PATH}/${idToNavigate}`);
      setSearchDialogOpen(false);
      setSearchParams({ type: initialType, value: "" });
      setSearchTriggered(false);
      setNotFound(false);
    } else if (
      searchTriggered &&
      ((searchParams.type === "id" &&
        !isLoadingById &&
        !existsById &&
        !errorById) ||
        (searchParams.type === "nationalId" &&
          !isLoadingByNationalId &&
          !existsByNationalId &&
          !errorByNationalId) ||
        (searchParams.type === "passport" &&
          !isLoadingByPassport &&
          !existsByPassport &&
          !errorByPassport))
    ) {
      setNotFound(true);
      setSearchTriggered(false);
      setFoundPatientId(null);
    }
  }, [
    searchTriggered,
    searchParams,
    existsById,
    existsByNationalId,
    existsByPassport,
    patientIdByNationalId,
    patientIdByPassport,
    isLoadingById,
    isLoadingByNationalId,
    isLoadingByPassport,
    errorById,
    errorByNationalId,
    errorByPassport,
    navigate,
    initialType,
  ]);

  const isLoading =
    (searchParams.type === "id" && isLoadingById) ||
    (searchParams.type === "nationalId" && isLoadingByNationalId) ||
    (searchParams.type === "passport" && isLoadingByPassport);

  const error =
    (searchParams.type === "id" && errorById) ||
    (searchParams.type === "nationalId" && errorByNationalId) ||
    (searchParams.type === "passport" && errorByPassport);

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
