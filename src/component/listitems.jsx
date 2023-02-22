import"../App.css"
import { Link } from "react-router-dom"
const Listitems =(props)=>{
    const {list}=props

    const {id,subject,view_href,conversation} =list 
    const {messages_count,last_post_time_friendly}=conversation
    
    return(

      <Link to={`/user/${id}`}>  
      <div className="flex_container">
     <h1>ID: {id}</h1>
     <p>SUBJECT: {subject.substr(0,25)}</p>
     <p>LINK: {view_href.substr(0,30)}</p>
     <a>view_more</a>
     <div>POSTBY: {last_post_time_friendly}</div>
     </div>
     </Link>)
}
export default Listitems
