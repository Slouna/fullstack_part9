import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

    useEffect(() => {
    axios.get<Diary[]>('http://localhost:3000/api/diaries').then(response => {
      setDiaries(response.data)
    })
  }, [])

  return (
    <div>
      <h1>Flight Diary</h1>
      {diaries.map(d => 
        <div key={d.id} className='diary-entry'>
          <p>Date: {d.date}</p>
          <p>Visibility: {d.visibility}</p>
          <p>Weather: {d.weather}</p>
          <p>Comments: {d.comment}</p>
        </div>
      )}
    </div>
  )
}
interface Diary {
  id: string;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}
export default App
