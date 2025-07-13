import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableEmpty,
} from "@/shared/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

import type { Patient } from "@/entities/patients/model/patient";
import { TableSkeletonRows } from "./TableSkeletonRows";
import { useTranslation } from "react-i18next";
import { COMMON_KEYS, NAMESPACE_KEYS } from "@/shared/i18n/keys";
import { PATIENTS_KEYS } from "@/entities/patients/lib/translationKeys";
import { PatientMenuAction } from "./PatientMenuAction";

interface PatientsTableProps {
  patients: Patient[];
  isLoading: boolean;
  getAge: (birthDate: string) => number;
}

export const PatientsTable = ({
  patients,
  isLoading,
  getAge,
}: PatientsTableProps) => {
  const { t } = useTranslation([NAMESPACE_KEYS.common, NAMESPACE_KEYS.patient]);

  return (
    <div className="w-full max-w-full overflow-x-auto rounded-md border">
      <Table className="min-w-[800px]">
        <TableHeader>
          <TableRow>
            <TableHead>
              {t(PATIENTS_KEYS.table.patientId, { ns: NAMESPACE_KEYS.patient })}
            </TableHead>
            <TableHead>
              {t(PATIENTS_KEYS.table.patient, { ns: NAMESPACE_KEYS.patient })}
            </TableHead>
            <TableHead>
              {t(PATIENTS_KEYS.table.age, { ns: NAMESPACE_KEYS.patient })}
            </TableHead>
            <TableHead>
              {t(PATIENTS_KEYS.table.gender, { ns: NAMESPACE_KEYS.patient })}
            </TableHead>
            <TableHead>
              {t(PATIENTS_KEYS.table.contact, { ns: NAMESPACE_KEYS.patient })}
            </TableHead>
            <TableHead>
              {t(PATIENTS_KEYS.table.idDocument, {
                ns: NAMESPACE_KEYS.patient,
              })}
            </TableHead>
            <TableHead>
              {t(PATIENTS_KEYS.table.nationality, {
                ns: NAMESPACE_KEYS.patient,
              })}
            </TableHead>
            <TableHead>
              {t(PATIENTS_KEYS.list.actions, { ns: NAMESPACE_KEYS.patient })}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Render skeleton rows
            Array.from({ length: 5 }).map((_, idx) => (
              <TableSkeletonRows key={`skeleton-${idx}`} />
            ))
          ) : patients.length === 0 ? (
            <TableEmpty
              message={t(PATIENTS_KEYS.list.noPatients, {
                ns: NAMESPACE_KEYS.patient,
              })}
            />
          ) : (
            patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>
                  <div className="font-mono text-sm">{patient.id}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={patient.personalImageURL || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {patient.firstName?.charAt(0) ?? ""}
                        {patient.lastName?.charAt(0) ?? ""}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {[
                          patient.firstName,
                          patient.secondName,
                          patient.thirdName,
                          patient.lastName,
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {patient.firstName} {patient.lastName}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {getAge(patient.birthDate)}{" "}
                  {t(PATIENTS_KEYS.details.years, {
                    ns: NAMESPACE_KEYS.patient,
                  })}
                </TableCell>
                <TableCell>
                  {patient.gender === 0
                    ? t(COMMON_KEYS.gender.male, {
                        ns: NAMESPACE_KEYS.common,
                      })
                    : t(COMMON_KEYS.gender.female, {
                        ns: NAMESPACE_KEYS.common,
                      })}
                </TableCell>
                <TableCell>{patient.callPhoneNumber}</TableCell>
                <TableCell>
                  {patient.nationalIdNumber ? (
                    <div>
                      <div className="text-sm">
                        {t(PATIENTS_KEYS.table.nationalId, {
                          ns: NAMESPACE_KEYS.patient,
                        })}
                      </div>
                      <div className="font-mono text-xs">
                        {patient.nationalIdNumber}
                      </div>
                    </div>
                  ) : patient.passportNumber ? (
                    <div>
                      <div className="text-sm">
                        {t(PATIENTS_KEYS.table.passport, {
                          ns: NAMESPACE_KEYS.patient,
                        })}
                      </div>
                      <div className="font-mono text-xs">
                        {patient.passportNumber}
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">
                      {t(PATIENTS_KEYS.table.noDocument, {
                        ns: NAMESPACE_KEYS.patient,
                      })}
                    </span>
                  )}
                </TableCell>
                <TableCell>{patient.nationalityName}</TableCell>
                <TableCell className="text-start">
                  <PatientMenuAction id={patient.id} patient={patient} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
