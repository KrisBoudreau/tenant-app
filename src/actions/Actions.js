
import axios from 'axios';



export const updateUser = async ( {name, email, role, _id} ) => {
  axios.post(`http://localhost:3001/users/update/${_id}`, {
    name: name, email: email, role: role});
}



export const fetchUser = (curUserEmail, setCurUser) =>  {
    axios.get(`http://localhost:3001/users/email/${curUserEmail}`)
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
        setCurUser(u => ({
          name: 'no name',
          role: 'blocked',
          email: curUserEmail
        }))
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
export const fetchBuilding = (id, setBuilding) => {
  axios.get(`http://localhost:3001/buildings/${id}`)
    .then(req => setBuilding(r => req.data[0])) 
}

export const fetchUsers = (setUsers) => {
  axios.get('http://localhost:3001/users')
    .then(req => setUsers(r => req.data)) 
}

export const fetchUnits = (building_id, setUnits) => {
  axios.get(`http://localhost:3001/buildings/${building_id}/units`)
    .then(req => setUnits(r => req.data)) 
}

export const removeUnit = (unit_id, building_id) => {
  axios.delete(`http://localhost:3001/buildings/${building_id}/units/${unit_id}`)
  
}

export const removeBuilding = (building_id) => {
  axios.delete(`http://localhost:3001/buildings/${building_id}`)
  
}


export const fetchLeases = (building_id, unit_id, setLeases) => {
  axios.get(`http://localhost:3001/buildings/${building_id}/units/${unit_id}/leases`)
    .then(req => setLeases(r => req.data)) 
}

export const removeLease = (unit_id, building_id, lease_id) => {
  axios.delete(`http://localhost:3001/buildings/${building_id}/units/${unit_id}/leases/${lease_id}`)
}

export const fetchLease = (id, setLease) => {
  axios.get(`http://localhost:3001/buildings/lease/${id}`)
    .then(req => setLease(r => req.data[0])) 
}
