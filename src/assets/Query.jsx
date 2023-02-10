import { useLazyQuery,gql } from '@apollo/client'
import Listitems from '../component/listitems'
import "../App.css"
import ClipLoader from "react-spinners/ClipLoader";

console.log("...1")
const GET_SELECTED_MESSAGES= gql`

query hhgcfgvbhj($limit:Int){
  
  messages(limit:$limit)
  {
    items{
      id
      subject
      videos{
        items{
          height
        }
      }
    }
  }
}`;

const Query=(props)=>{
    

    

    const {count}=props
    

    const [count]=useLazyQuery(GET_SELECTED_MESSAGES,{variables:{

        limit:count,
        
      }});
      
      if (loading) return (<><ClipLoader
        color="blue"
        
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></>)
      if(error) return <h1>{error}</h1>
      
 return(
    <div className='container'>
    {data && <>
        {data.messages.items.map((each) =>
          <Listitems key={each.id} list={each}/>
        )}
        </>}
        </div>
 )


}
export default Query

