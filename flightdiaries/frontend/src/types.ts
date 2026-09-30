export interface Diary {
  id: string;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type newDiaryEntry = Omit<Diary, 'id'>

export interface Message {
    message: string,
    success: boolean
}

export interface NewEntryFormProps {
  newComment: string,
  setNewComment: (newComment: string) => void,
  setNewDate: React.Dispatch<React.SetStateAction<string>>,
  addNewDiary: (event: React.SubmitEvent<HTMLFormElement>) => Promise<void>
}
