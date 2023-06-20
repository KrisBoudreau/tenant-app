import React, { useState, useEffect } from 'react'
import { fetchUsers } from '../../actions/Actions';

export default function Users() {

  const [users, setUsers] = useState('none');
  const [refreshUsers, setRefreshUsers] = useState(false);


  //get users
  useEffect(() => { 
    fetchUsers(setUsers);
    setRefreshUsers(r => false);
  }, [refreshUsers])
  if (users === 'none'){
    return <h1>loading</h1>
  }


  return (
    <div>users</div>
  )
}
