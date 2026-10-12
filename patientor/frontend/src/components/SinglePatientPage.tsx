import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { useEffect, useState } from "react";
import { Diagnosis, Entry, Patient } from "../types";
import { isAxiosError } from "axios";
import AddNewEntry from "./AddNewEntryForm";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import "../index.css";

type SinglePatientPageProps = {
  diagnoses: Diagnosis[];
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

const SinglePatientPage = ({
  diagnoses,
  setErrorMessage,
}: SinglePatientPageProps) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loadingErrorMessage, setLoadingErrorMessage] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;

      try {
        const response = await patientService.getById(id);
        setPatient(response);
      } catch (e) {
        if (isAxiosError(e)) {
          setLoadingErrorMessage(e.message);
        }
      }
    };

    fetchPatient();
  }, [id]);

  if (loadingErrorMessage) {
    console.log(loadingErrorMessage);
    return <div>{loadingErrorMessage}</div>;
  }

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{patient?.name}</h2>
      <p>gender: {patient.gender}</p>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>date of birth: {patient.dateOfBirth}</p>
      {id && (
        <AddNewEntry
          id={id}
          patient={patient}
          setPatient={setPatient}
          diagnoses={diagnoses}
          setErrorMessage={setErrorMessage}
        />
      )}
      <h3>entries</h3>
      <div>
        {patient.entries.map((e) => (
          <div key={e.id} className="Entry">
            <EntryDetails entry={e} />
            <h4> {e.date}</h4>

            <p>{e.description}</p>

            {e.type === "HealthCheck" && (
              <p>Health Rating: {e.healthCheckRating}</p>
            )}

            {e.type === "Hospital" && (
              <>
                <h5>Discharge</h5>
                <p>Discharge date: {e.discharge.date}</p>
                <p>{e.discharge.criteria}</p>
              </>
            )}
            {e.diagnosisCodes !== undefined && e.diagnosisCodes.length > 0 && (
              <div>
                <h5>Diagnosis codes:</h5>
                <ul>
                  {e.diagnosisCodes.map((dc) => (
                    <li>
                      {dc} -{" "}
                      {diagnoses.find((diagnose) => diagnose.code === dc)?.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <div>
          <MedicalInformationIcon />
        </div>
      );
    case "OccupationalHealthcare":
      return <div>{<WorkIcon />}</div>;
    case "Hospital":
      return (
        <div>
          <LocalHospitalIcon />
        </div>
      );
    default:
      return assertNever(entry);
  }
};
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

export default SinglePatientPage;
