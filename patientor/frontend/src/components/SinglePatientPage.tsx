import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { useEffect, useState } from "react";
import { Patient } from "../types";
import { isAxiosError } from "axios";
const SinglePatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;

      try {
        const response = await patientService.getById(id);
        setPatient(response);
      } catch (e) {
        if (isAxiosError(e)) {
          setErrorMessage(e.message);
        }
      }
    };
    fetchPatient();
  }, [id]);

  if (errorMessage) {
    console.log(errorMessage);
    return <div>{errorMessage}</div>;
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
    </div>
  );
};

export default SinglePatientPage;
