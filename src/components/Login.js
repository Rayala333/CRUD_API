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
    const [id , setId] = useState(null)
    const [update,setUpdate] = useState(false)
  
    const changeHandler = (e)=>{
        setState({...state,[e.target.name]:e.target.value})
    }

    const getdata = async()=>{
      const mydata = await axios.get(`http://localhost:5000/userdata`)
       setData(mydata.data)
    }
    
    const submitHandler = async (e)=>{
                e.preventDefault();
                try{
                  if(!state.username && !state.password, !state.email, !state.phonenumber){
                    alert("No Date")
                  }else if(id){

                    await axios.put(`http://localhost:5000/userdata/${id}`,state)
                    getdata()
                    setState({
                      username:"",
                      password:"",
                      email:"",
                      phonenumber:""
                    })
                    setId(null)
                    setUpdate((pre)=>!pre)
                    // data.map((e)=>{
                    //   if(e.id===id){
                    //    console.log(state)
                    //    try{
                    //     axios.put(`http://localhost:5000/userdata/${id}`,state)
                    //    }catch(err){console.log(err.message)}
                    
                    //   }else{
                    //     alert("Not Update")
                    //   }
                    // })
                  }
                  else{
                    await axios.post(`http://localhost:5000/userdata`,state)
                    getdata()
                    setState({
                      username:"",
                      password:"",
                      email:"",
                      phonenumber:""
                    })
                  }
                }catch(err){
                   console.log(err.message)
                  }
  
    }

    const deleteHandler = async(id)=>{
         await axios.delete(`http://localhost:5000/userdata/${id}`)
         getdata()
    }

    const editHandler = async(id)=>{
     const Edit =  data.find((e)=>{
        return e.id === id
      })
        setState({
          username:Edit.username,
          password:Edit.password,
          email:Edit.email,
          phonenumber:Edit.phonenumber
        })

        setId(id)
        setUpdate((pre)=>!pre)

        // await axios.put(`http://localhost:5000/userdata/${id}`,{"state":{"username":state.username}})
        // getdata()
    }
    useEffect(()=>{
        getdata()
    },[])
    
   
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
                
              {!update? <button>Submit</button> : <button>Update</button>}  
        
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
        {
          data.map((user,index)=>(
            <tr key={index}>
              
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.email}</td>
              <td>{user.phonenumber}</td>
              <td onClick={()=>editHandler(user.id)}>Edit</td>
              <td onClick={()=>deleteHandler(user.id)}>Delete</td>
            </tr>
          ))
        }
       
        </tbody>
      </table>
      }

        </React.Fragment>
  )
}

export default  React.memo(Login)