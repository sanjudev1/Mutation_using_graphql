import { useParams } from "react-router-dom"
import {gql,useQuery} from '@apollo/client';
import ClipLoader from "react-spinners/ClipLoader";


const UNIQUE_MESSAGES=gql`

query message_id($id:String!){
  message(id:$id){
    id
     body
  is_solution
  
  }
}
`

const UserDetails=()=>{
   
const {id} =useParams()
 console.log(id)
   

  const {data,loading,error}=useQuery(UNIQUE_MESSAGES,{variables:{

    id:id,
    
  }});
  
  if (loading) return <ClipLoader
  color="blue"
  size={150}
  width={100}
  aria-label="Loading Spinner"
  data-testid="loader"
/>
  if(error) return <h1>{error}</h1>

    return(
        <>
        {data && <>
           <div className="flex_container_unique">
            <h1>ID: {data.message.id}</h1>
            <p>BODY: {data.message.body}</p>
            <p>SOLUTION: {data.message.is_solution}</p>
           
            </div>
            </>}
       
        </>
        
        
    )

}
export default UserDetails