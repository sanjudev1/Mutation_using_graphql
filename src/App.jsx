import { Route,Routes} from "react-router-dom";
import UserDetails from "./component/userdetails";

import Home from "./component/home";


function App(){
  return(
    <div>
      
<Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route path="/user/:id" element={<UserDetails/>}/>
     </Routes>
     </div>
  )
  
     
}
export default App 