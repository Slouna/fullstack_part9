import { type Message } from "../types";
import '../../styles.css'
const Notificationmessage = ({message}: {message: Message}, ) => {
  if(message.success){
    return (
      <div className="success-message">
        {message.message}
      </div>
    )
  }
  else {
    return (
      <div className="error-message">
        {message.message}
      </div>
    )
  }
    
}

export default Notificationmessage;