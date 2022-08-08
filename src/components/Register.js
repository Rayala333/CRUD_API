import React,{ useState,useEffect  } from 'react';
import axios from 'axios';

const Register = () => {
    const initialState = {
        username:""
    }
    const [mydata,setMyData] = useState(initialState)
    const [user,setUser] = useState([])
    const changeHandler = (e)=>{
        // let {name,value} = e.target
        // setMyData({...mydata,[name]:value})

        setMyData({...mydata,[e.target.name]:e.target.value})
    }
    const submitHandler = (event)=>{
        event.preventDefault();
        console.log(mydata)
        // setUser(mydata)
        axios.post(`http://localhost:5000/userdata`,mydata)

        setTimeout(()=>fetchData(),500) 
    }
    const fetchData = async ()=>{
        const finalData = await axios.get(`http://localhost:5000/userdata`)
        // console.log(finalData.data,'inside')
        setUser(finalData.data)
    }

    useEffect(()=>{ 
        fetchData()
    },[])
    
  return (
    <React.Fragment>
        <form onSubmit={submitHandler}>
            <input type='text' name="username" value={mydata.username} onChange={changeHandler}/>
            <button>Submit</button>
        </form>
            <h1>Hello</h1>
            {
             user.map((e,i)=>(
                <>
                    
                    <li>{e.username}</li>
                </>
                
             ))   
            }
    </React.Fragment>
  )
}

export default Register