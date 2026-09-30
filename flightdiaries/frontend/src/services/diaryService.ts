import axios, { isAxiosError, type AxiosResponse } from "axios";
import { type Diary, type newDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = () => {
  return axios.get<Diary[]>(baseUrl).then((response) => response.data);
};

const create = async (newEntry: newDiaryEntry) => {
  let response: AxiosResponse;
  //console.log(Date.parse(newEntry.date));
  try {
    response = await axios.post<Diary>(baseUrl, newEntry);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.log("error occured: \n", error.response?.data?.error[0].message);
    }
    throw error;
  }
};

export default { getAll, create };
