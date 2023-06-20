
import axios from 'axios';


export const fetchUser = (curUserEmail, setCurUser) =>  {
    axios.get(`http://localhost:3001/users/${curUserEmail}`)
    .then(res => {
      if (res.data.length == 0){
        axios({
          method: 'post',
          url: 'http://localhost:3001/users',
          data: {
            name: 'no name',
            email: curUserEmail,
            role: 'blocked'
          }
        });
      }
      else {
        setCurUser(u => ({
          name: res.data[0].name,
          role: res.data[0].role,
          email: res.data[0].email
        }))
      }
    });
  }


export const fetchBuildings = (setBuildings) => {
  axios.get('http://localhost:3001/buildings')
    .then(req => setBuildings(r => req.data)) 
}

export const fetchUsers = (setUsers) => {
  axios.get('http://localhost:3001/users')
    .then(req => setUsers(r => req.data)) 
}