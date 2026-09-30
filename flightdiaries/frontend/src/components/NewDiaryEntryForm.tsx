import { type NewEntryFormProps } from "../types";
const NewDiaryEntryForm = (props: NewEntryFormProps) => {
    return(
        <div>
            <h2>Add new flight</h2>
        <form onSubmit={props.addNewDiary}>
          date: <input type='date' onChange={(event) => props.setNewDate(event.target.value)}/>
          <p></p>
            visibility: 
            Great <input type='radio' name='visibility' value='great' defaultChecked={true}/> |
            Good <input type='radio' name='visibility' value='good'/> |
            OK <input type='radio' name='visibility' value='ok'/> |
            Poor <input type='radio' name='visibility' value='poor'/> |
          <p></p>
            weather: 
            Sunny <input type='radio' name='weather' value='sunny' defaultChecked={true}/> |
            Rainy <input type='radio' name='weather' value='rainy'/> |
            Cloudy <input type='radio' name='weather' value='cloudy'/> |
            Stormy <input type='radio' name='weather' value='stormy'/> |
            Windy <input type='radio' name='weather' value='windy'/>|

          <p></p>
          comment: <input value={props.newComment} onChange={(event) => props.setNewComment(event.target.value)} />
          <p></p>
          <button type='submit'>Submit</button>
        </form>
        </div>
    )
}

export default NewDiaryEntryForm;