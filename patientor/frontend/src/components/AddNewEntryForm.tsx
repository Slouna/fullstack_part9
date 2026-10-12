import { useState } from "react";
import type {
  Patient,
  Diagnosis,
  EntryType,
  HealthCheckRating,
  NewEntry,
} from "../types";
import patientService from "../services/patients";
import { isAxiosError } from "axios";
import "../index.css";
import Input from "@mui/material/Input";
import {
  Button,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Select from "@mui/material/Select";

type AddNewEntryProps = {
  id: string;
  patient: Patient;
  diagnoses: Diagnosis[];
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
};
//Siirrä omaan tiedostoon
const AddNewEntry = ({
  id,
  diagnoses,
  patient,
  setPatient,
  setErrorMessage,
}: AddNewEntryProps) => {
  const [addNewEntry, setAddNewEntry] = useState(false);
  const [checkType, setCheckType] = useState<EntryType>("HealthCheck");
  const [entryDate, setEntryDate] = useState("");
  const [description, setDescription] = useState<string>("");
  const [specialist, setSpecialist] = useState("");
  const [healthRating, setHealthRating] = useState<HealthCheckRating>(0);
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const baseEntry = {
      date: entryDate,
      description: description,
      specialist: specialist,
      diagnosisCodes: diagnosisCodes,
    };

    let newEntry: NewEntry;

    switch (checkType) {
      case "HealthCheck":
        newEntry = {
          ...baseEntry,
          type: checkType,
          healthCheckRating: healthRating,
        };
        break;
      case "OccupationalHealthcare":
        if ((sickLeaveStartDate === "") !== (sickLeaveEndDate === "")) {
          setErrorMessage(
            "You have to fill both start and end date, or leave them both empty",
          );
          setTimeout(() => setErrorMessage(""), 5000);
          return;
        }
        if (Date.parse(sickLeaveEndDate) < Date.parse(sickLeaveStartDate)) {
          setErrorMessage(
            "Sick leave start date has to be before the end date",
          );
          setTimeout(() => setErrorMessage(""), 5000);
          return;
        }
        if (sickLeaveStartDate === "" && sickLeaveEndDate === "") {
          newEntry = {
            ...baseEntry,
            type: checkType,
            employerName: employerName,
          };
        } else {
          newEntry = {
            ...baseEntry,
            type: checkType,
            employerName: employerName,
            sickLeave: {
              startDate: sickLeaveStartDate,
              endDate: sickLeaveEndDate,
            },
          };
        }
        break;
      case "Hospital":
        newEntry = {
          ...baseEntry,
          type: checkType,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;
      default:
        return assertNever(checkType);
    }

    try {
      const addedEntry = await patientService.createEntry(
        id as string,
        newEntry,
      );
      setPatient({
        ...patient,
        entries: [...(patient.entries ?? []), addedEntry],
      });
      resetForm();
    } catch (e) {
      if (isAxiosError(e)) {
        setErrorMessage(
          e.response?.data?.error?.[0]?.message ??
            e.response?.data?.error ??
            e.message,
        );
      } else {
        setErrorMessage("something went wrong");
      }
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  const resetForm = () => {
    setAddNewEntry(false);
    setCheckType("HealthCheck");
    setEntryDate("");
    setDescription("");
    setSpecialist("");
    setHealthRating(0);
    setEmployerName("");
    setSickLeaveStartDate("");
    setSickLeaveEndDate("");
    setDischargeDate("");
    setDischargeCriteria("");
    setDiagnosisCodes([]);
  };

  return (
    <div>
      {!addNewEntry && (
        <Button variant="outlined" onClick={() => setAddNewEntry(true)}>
          Add New Entry
        </Button>
      )}

      {addNewEntry && (
        <form onSubmit={handleSubmit} className="EntryForm">
          <Select
            fullWidth
            label="Type of the check"
            name="typeOfCheck"
            value={checkType}
            defaultChecked={false}
            onChange={(e) => setCheckType(e.target.value as EntryType)}
          >
            <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
            <MenuItem value={"OccupationalHealthcare"}>
              Occuptaional Check
            </MenuItem>
            <MenuItem value={"Hospital"}>Hospital Check</MenuItem>
          </Select>

          <InputLabel htmlFor="entry-date">Date</InputLabel>
          <Input
            id="entry-date"
            type="Date"
            required
            fullWidth
            value={entryDate}
            onChange={({ target }) => setEntryDate(target.value)}
          />
          <TextField
            label="Description"
            required
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="Specialist"
            required
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <InputLabel htmlFor="diagnosis">Diagnosis</InputLabel>
          <Select
            id="diagnosis"
            multiple
            fullWidth
            value={diagnosisCodes}
            input={<OutlinedInput label="Diagnosis" />}
            onChange={(e) => setDiagnosisCodes(e.target.value as Array<string>)}
          >
            {diagnoses.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code}
              </MenuItem>
            ))}
          </Select>

          {checkType === "HealthCheck" && (
            <>
              <InputLabel>Select Health Rating</InputLabel>
              <Select
                fullWidth
                label="Health rating"
                name="healthRatingValue"
                value={healthRating}
                onChange={(e) =>
                  setHealthRating(Number(e.target.value) as HealthCheckRating)
                }
              >
                <MenuItem value={0}>Healthy</MenuItem>
                <MenuItem value={1}>Low Risk</MenuItem>
                <MenuItem value={2}>High Risk</MenuItem>
                <MenuItem value={3}>Critical Risk</MenuItem>
              </Select>
            </>
          )}
          {checkType === "Hospital" && (
            <>
              <p>Discharge</p>
              <TextField
                fullWidth
                required
                type="Date"
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
              />
              <TextField
                fullWidth
                required
                label="Criteria"
                value={dischargeCriteria}
                onChange={({ target }) => setDischargeCriteria(target.value)}
              />
            </>
          )}
          {checkType === "OccupationalHealthcare" && (
            <>
              <TextField
                fullWidth
                required
                label="Employer Name"
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
              />
              <p>Sick Leave</p>
              <TextField
                type="Date"
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                onChange={({ target }) => setSickLeaveStartDate(target.value)}
              />
              <TextField
                type="Date"
                label="End Date"
                InputLabelProps={{ shrink: true }}
                onChange={({ target }) => setSickLeaveEndDate(target.value)}
              />
            </>
          )}
          <p></p>
          <Button variant="outlined" type="submit">
            Add New Entry
          </Button>
        </form>
      )}
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

export default AddNewEntry;
