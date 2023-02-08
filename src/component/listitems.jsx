import"../App.css"
const Listitems =(props)=>{
    const {list}=props

    const {id,subject,videos} =list 
    const {query}=videos 

    return(
        <div className="flex_container">
     <h1>{id}</h1>
     <p>{subject}</p>
     <p>{query}</p>
     </div>)
}
export default Listitems
