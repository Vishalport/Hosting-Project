import { DataGrid } from "@mui/x-data-grid";
import { useEffect , useState} from 'react';
import { agentColumns,agentRows } from "../datatable/datatable";
import './Datatable.css'
import axios from "axios";
import { useAuth } from "../../context/auth";
import BasicModal from "./BasicModal";
export default function Datatable() {

  const [auth, setAuth] = useAuth();
    // useState
    const [data, setData] = useState([]);

    useEffect(()=> {
      getAgentData();
    }, [])

    const getAgentData = async() => {
      try{
        console.log("---pending list below");
         const {data} = await axios.get('/admin/ListPendingAgent',{
          headers : {
            token : auth?.token
          }
         });
         console.log("---pending list data-->", data?.result);
         setData(data?.result); 
      }catch(err){
        console.log(err);
      }
    }
  return (
    <div>
      <DataGrid
      data={data.result}
        rows={data}
        getRowId={(data)=>data._id}
        columns={agentColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
