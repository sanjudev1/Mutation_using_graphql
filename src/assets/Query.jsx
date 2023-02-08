import { useQuery,gql } from '@apollo/client'

const GET_SELECTED_MESSAGES= gql`

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


const Query=(props)=>{


    const {count}=props

    const {data,loading,error}=useQuery(GET_SELECTED_MESSAGES,{variables:{

        limit:count,
        
      }});
      if (loading) console.log("......loading")
 if(error) return <h1>{error}</h1>


}
export default Query

