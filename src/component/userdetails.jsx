import { useParams } from "react-router-dom"
import {gql,useQuery,useLazyQuery,useMutation} from '@apollo/client';
import ClipLoader from "react-spinners/ClipLoader";
import {useForm } from "react-hook-form"
import "../App.css"
import { useState } from "react";


const UPDATE_MESSAGE =gql`
mutation upadtemessage($data:updateMessageInput!){
  updateMessage(input:$data){
    id
    body
    subject
    
    
  }
}`

const UNIQUE_MESSAGES=gql`
query message_id($id:String!){
  message(id:$id){
    id
     body
     subject
  is_solution
  
  }
}
`

const UserDetails=()=>{

  const { register, formState: { errors }, handleSubmit } = useForm();
  const [formData,setformdata] =useState(null)
  const [responsedata,setresponseData] =useState(null)
  
  // form submitiom......................
  const onSubmit = () =>{
    
    updateData({variables:
      {data:{id:formData.id,subject:formData.subject,body:formData.body}}})
  
  };


 
 // update data .............  
 const [updateData] =useMutation(UPDATE_MESSAGE,{onCompleted :(data)=>{
  console.log(formData)
   setresponseData(data?.updateMessage)
   setformdata({
    ...data,body:"",id:"",subject:""
  })}
 ,onError:(error)=>console.log(error)})
 
  //fetch data using id........
const {id} =useParams()

const Querydata=useQuery(UNIQUE_MESSAGES,{variables:{
    id:id 
  },onCompleted : (Querydata) => {
   
    setformdata(Querydata?.message) 
    // setformdata({id:data.message.id,subject:data.message.subject,body:data.message.body})}});
  },onError :(error)=>{
    console.log(error)
  }
  });
  
  // loader..........
  if (Querydata.loading) return <ClipLoader
  color="blue"
  size={150}
  width={100}
  aria-label="Loading Spinner"
  data-testid="loader"/>
 
  // error......

  if(Querydata.error) return <h1>{Querydata.error}</h1>



// return.....
    return(
        <>
        <div className="Form_container">
          <img className="image" src="https://cdn.pixabay.com/photo/2017/06/10/07/18/list-2389219_960_720.png" alt="image"/>
          <div className="small_container">
        <h4 className="form_headline">Here you can update the subject and body by using the below form:-</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="form_tag" >
        <h1 style={{alignSelf:"center"}}>Upadte your Data</h1>
          <label id="Id_tag">ID</label>
      <input 
        {...register("id", { required:true })} 
        aria-invalid={errors.Id ? "true" : "false"} 
        className="input_tag"
        placeholder="Enter your ID"
        value={Querydata?.data?.message?.id}
        onChange={(e)=>setformdata({id:e.target.value})}
        name="Id_tag"
      />
      {/* {errors.Id?.type === 'required' && <p role="alert">First name is required</p>} */}
      <label id="subject_tag">SUBJECT</label>
      <textarea
        {...register("subject", { required :false})} 
        aria-invalid={errors.subject ? "true" : "false"} 
        className="input_tag"
        placeholder="Subject required..."
        value={formData?.subject}
        onChange={(e)=>setformdata({...formData,"subject":e.target.value})}
        name="subject_tag"
      />
      {/* {errors.mail && <p role="alert">{errors.subject?.message}</p>} */}
      <label id="body_tag">BODY</label>
      <textarea {...register("body",{required:false})}
      aria-invalid={errors.body?"true":"false"}
      className="input_tag"
      placeholder="Body required..."
      value={formData?.body} 
      onChange={(e)=>setformdata({...formData,"body":e.target.value})}
      name="body_tag"
      
      />
      {/* {errors.body && <p role="alert">{errors.body?.message}</p>} */}
      <input type="submit" className="submit_btn" />
    </form>
        {Querydata && <>
           <div className="flex_container_unique">
           {responsedata && <p className="response_data">The data is updated sucessfully the updated cache data is shown below</p>}
            <h1>ID: {Querydata.data.message.id}</h1>
            <h2>BODY: {Querydata.data.message.body.substr(0,1200)}</h2>
            <h2>SUBJECT: {Querydata.data.message.subject}</h2>
            <h2>SOLUTION: {Querydata.data.message.is_solution ?"True":"False"}  </h2>
           
            </div>
            </>}
            
            <>
            <h1>display response</h1>

            <h1>{responsedata?.id}</h1>
            <p>{responsedata?.subject}</p>
            <p>{responsedata?.body}</p>
            
            </>
            </div>
            </div>
        </>
        
        
    )

}
export default UserDetails