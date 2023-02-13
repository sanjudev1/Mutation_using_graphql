import { useState } from 'react';
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import Listitems from '../component/listitems'
import "../App.css"
import ClipLoader from "react-spinners/ClipLoader";

import "../App.css";
// import Query from '../assets/Query';

const GET_SELECTED_MESSAGES= gql`


query message($limit:Int){
  
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
  "limit":10 },{"limit":20},{"limit":50},{"limit":80},{"limit":100
}]



const Home=()=> {

  const [number,setNumber]=useState(100);

//  const  eventHandler=(value)=>{
//     setNumber(value)
//   }
//   const selection=(e)=>{
//      if (e.target.value==number){
//       console.log(true)
//      }
//      console.log(false)
//   }
// ,{variables:{limit:number},notifyOnNetworkStatusChange: true,}
  
const initial_query =useQuery(GET_SELECTED_MESSAGES,{variables:{limit:10},fetchPolicy:"network-only",notifyOnNetworkStatusChange: true,});
const [Subsequent, subsequent_query]= useLazyQuery(GET_SELECTED_MESSAGES,{fetchPolicy:"cache-and-network"});


console.log(".....render")
// if (networkStatus === NetworkStatus.refetch) return(console.log("Refetching")) ;
if(initial_query.loading || subsequent_query.loading) return (<ClipLoader
  color="blue"
  
  size={150}
  aria-label="Loading Spinner"
  data-testid="loader"
/>)

if(initial_query.error ) return (<>{initial_query.error}</>)
if(subsequent_query.error) return (<>{subsequent_query.error}</>)



  return (
    <div>
     <div> 
      
      <label id="messages" htmlFor='message_options' className='label'>Message_Options</label>      
        <select name="messages" id="mesage_options" onChange={(e)=>setNumber(e.target.value)}>

        {SELECTED_MESSAGES.map(e=>
             <option  key={e.limit} value={e.limit} selected={e.limit==number}>
                {e.limit}
             </option>)
             
        }
        </select>
        
        
        <button className='confirm_button' onClick={()=>Subsequent({variables:{limit:number}})}>enter</button>
     </div>
     <div className='container'>
     
    <div className='container'>
    {subsequent_query.data && <>
        {subsequent_query.data.messages.items.map((each) =>
          <Listitems key={each.id} list={each}/>
        )}
        </>}
        {initial_query.data && <>
        {initial_query.data.messages.items.map((each) =>
          <Listitems key={each.id} list={each}/>
        )}
        </>}
        </div>
 

     
     </div>
     </div>

  )
    
}

export default Home