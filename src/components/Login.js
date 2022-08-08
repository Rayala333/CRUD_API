import React, { useState,useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';

const Login = () => {
    const [state,setState]=useState({
        username:"",
        password:"",
        email:"",
        phonenumber:""
    })
    const [data,setData]=useState('')
  
    // console.log(data,"data")

    const [edite,setEdite]=useState(null)

    const changeHandler = (e)=>{
        setState({...state,[e.target.name]:e.target.value})
    }
    const fatchData = async()=>{
        const finalData = await axios.get(`http://localhost:5000/userdata`)
    
        const newdata = finalData.data
        // console.log(newdata,"newdata")
        if(newdata){
            setData(newdata)
        }else{
            setData([])
        }
    }
    const submitHandler =  (e)=>{
                e.preventDefault();
                if(!state.username && !data.password && !data.email && !data.phonenumber){
                    alert("No Date")
                }
                else{ 
                    const mydaat = axios.post('http://localhost:5000/userdata',state)
                    // setData([...data,state])
                }
                
    }
    useEffect(()=>{
        
            fatchData()
        
    },[])

    const deleteHandler = (id)=>{

        const deleData =  axios.delete(`http://localhost:5000/userdata/${id}`)  
    }


    const EditeHandler = (id)=>{
            let EditId = data.find((element)=>{
                return element.id===id
            })
            console.log(EditId.username)
            setState({
                username:EditId.username,
                password:EditId.password,
                email:EditId.email,
                phonenumber:EditId.phonenumber
            })
            setEdite({id})
    }
  return (
        <React.Fragment>
            <form
                style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                margin: "1rem",
                }}
             onSubmit={submitHandler}
            >
                <TextField id="username" label="Enter Username" 
                                        variant="outlined"
                                        name="username"
                                        value={state.username}
                                        onChange={changeHandler} sx={{margin:"1rem"}}/>
                
                <TextField id="password" label="Enter Password" 
                                        variant="outlined"
                                        name="password"
                                        value={state.password}
                                        onChange={changeHandler} sx={{margin:"1rem"}}/>
                
                <TextField id="email" label="Enter Email" 
                                        variant="outlined"
                                        name="email"
                                        value={state.email}
                                        onChange={changeHandler} sx={{margin:"1rem"}}/>
                
                <TextField id="phonenumber" label="Enter Phonenumber" 
                                        variant="outlined"
                                        name="phonenumber"
                                        value={state.phonenumber}
                                        onChange={changeHandler} sx={{margin:"1rem"}}/>
                
                <button>Submit</button>
        
        </form>
        {data.length <= 0 ? <h1>Enter User Details</h1>:
      <table>
        <thead>
          <tr>
          {/* <th>S.No</th> */}
            <th>username</th>
            <th>password</th>
            <th>email</th>
            <th>phonenumber</th>
            <th colSpan={2}>actons</th>
          </tr>
        </thead>
        <tbody>
        {data.isLoding ? <h1>Loding...</h1>:
          data.map((user,index)=>(
            <tr key={index}>
              {/* <td>{index}</td> */}
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.email}</td>
              <td>{user.phonenumber}</td>
              <td onClick={()=>EditeHandler(user.id)}>Edit</td>
              <td onClick={()=>{deleteHandler(user.id)}}>Delete</td>
            </tr>
          ))
        }
        {/* <tr><td colSpan={7}>
        <button onClick={()=>setLocal([])} className="button" >RemoveAll</button></td></tr> */}
        </tbody>
      </table>}

        </React.Fragment>
  )
}

export default  React.memo(Login)