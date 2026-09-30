import { useState, useEffect } from 'react';
import '../styles.css';
import { type Diary, type newDiaryEntry, type Message, type NewEntryFormProps } from './types';
import diaryService from './services/diaryService';
import Notificationmessage from './components/NotificationMessage';
import { isAxiosError } from 'axios';
import NewDiaryEntryForm from './components/NewDiaryEntryForm';


const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newComment, setNewComment] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(true);
  const notification: Message = {message, success};


    useEffect(() => {
    diaryService.getAll().then(
      initialEntries => {
        setDiaries(initialEntries)
      }
    )
  }, []);

  const addNewDiary = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const visibility =formData.get('visibility');
    const weather = formData.get('weather');
    if(typeof weather !== 'string' || typeof visibility !== 'string'){
      return;
    }
    const newEntry: newDiaryEntry = {
      weather,
      visibility,
      date: newDate,
      comment: newComment,
    }

  try{
    const response = await diaryService.create(newEntry)
    setDiaries(diaries.concat(response))
    setMessage('added new entry!');
    setSuccess(true);
  
  } catch (error){
    if(isAxiosError(error)){
      setMessage('Error happened: ' + error.response?.data?.error[0].message);
      setSuccess(false)
    }
    else{
      console.log(error);
    }
    
  }
    
    
    setNewDate('');
    setNewComment('');

    setTimeout(() => {setMessage('')}, 5000);

  }


  return (
    <div className='app'>
      <div>
        <Notificationmessage message={notification}/>
        <NewDiaryEntryForm newComment={newComment} setNewDate={setNewDate} setNewComment={setNewComment}  addNewDiary={addNewDiary}/>
      </div>
      <div>
        <h1>Flight Diary</h1>
      </div>
      <div className='flights'>
      {diaries.map(d => 
        <div key={d.id} className='diary-entry'>
          <p>Date: {d.date}</p>
          <p>Visibility: {d.visibility}</p>
          <p>Weather: {d.weather}</p>
          <p>Comments: {d.comment}</p>
        </div>
      )}
      </div>
    </div>
  )
}


export default App
