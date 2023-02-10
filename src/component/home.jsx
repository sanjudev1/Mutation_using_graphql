import { useState } from 'react';
import { gql, useQuery } from '@apollo/client'
import Listitems from '../component/listitems'
import "../App.css"
import ClipLoader from "react-spinners/ClipLoader";
import { NetworkStatus } from '@apollo/client';

import "../App.css";
// import Query from '../assets/Query';

const GET_SELECTED_MESSAGES= gql`


query hhgcfgvbhj($limit:Int){
  
  messages(limit:$limit)
  {
    items{
      id
      subject
      
      view_href
      conversation{
        messages_count
        last_post_time_friendly
      }
      }
    }
  
}`


const SELECTED_MESSAGES=[{
  "limit":100 },{"limit":80},{"limit":50},{"limit":30},{"limit":70
}]



const Home=()=> {

  const [number,setNumber]=useState(100);
  
const {data,loading,refetch,error,networkStatus}=useQuery(GET_SELECTED_MESSAGES,{variables:{limit:number},notifyOnNetworkStatusChange: true,});

console.log(".....render")
if (networkStatus === NetworkStatus.refetch) return(console.log("Refetching")) ;
if(loading) return (<ClipLoader
  color="blue"
  
  size={150}
  aria-label="Loading Spinner"
  data-testid="loader"
/>)

if(error) return (<>{error}</>)



  return (
    <div>
     <div> 
      
      <label id="messages" value="default_100" className='label'>Message_Options</label>      
        <select name="messages" onChange={(e)=>refetch({variables:{limit:e.target.value}})}>
        {SELECTED_MESSAGES.map(e=>
             <option  key={e.limit} value={e.limit}>
                {e.limit}
             </option>)
             
        }
        </select>
        
        
     </div>
     <div className='container'>
     
    <div className='container'>
    {data && <>
        {data.messages.items.map((each) =>
          <Listitems key={each.id} list={each}/>
        )}
        </>}
        </div>
 

     
     </div>
     </div>

  )
    
}

export default Home