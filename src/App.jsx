

import { useQuery,gql } from '@apollo/client'
import { useState } from 'react';
import { NetworkStatus } from '@apollo/client';
import './App.css'
import Listitems from './component/listitems';






const SELECTED_MESSAGES=[{
  "limit":100 },{"limit":80},{"limit":50},{"limit":30},{"limit":70
}]
function App() {

  const GET_SELECTED_MESSAGES=gql`

query ($limit:Int!){

  messages(limit:$limit)
  {
    items{
      id
      subject
      videos{
        query
      }
    }
  }
}`

//   const [Limit,setLimit] =useState(10);
// console.log(Limit);

// const Selected_limit= (e)=>{
//   setLimit(e.target.value)
// }

const [events,setEvent]= useState(100);

console.log("render....")
console.log(events)

 

  const {data,loading,error}=useQuery(GET_SELECTED_MESSAGES,{variables:{
    limit:events
  }});

  
if (loading) return <h1>......loading to fetch your data</h1>
 if(error) return <h1>{error}</h1>

 
 

  return (
    <div>
     <div> 
      <label id="messages" value="default_100" className='label'>Message_Options</label>
      
        <select name="messages" onChange={(e)=>setEvent(e.target.value)}>
        {SELECTED_MESSAGES.map(e=>
             <option  key={e.limit} value={e.limit}>
                {e.limit}
             </option>)
             
        }
        </select>
        
        
     </div>
     <div className='container'>

{data && <>
    {data.messages.items.map((each) =>
      <Listitems key={each.id} list={each}/>
    )}
    </>}
     
     </div>
     </div>

  )
    
}

export default App
