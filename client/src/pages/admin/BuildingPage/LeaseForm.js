import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

export default function LeaseForm( {
    building_id, 
    unit_id, 
    curUser, 
    setRefreshLeases,
    setDisplayLeaseForm} ) {

    const {register, handleSubmit } = useForm();
  return (
    <div>
        LeaseForm

        <form onSubmit={handleSubmit(
            (data)=> {
                axios.post(`http://localhost:3001/buildings/${building_id}/units/${unit_id}/leases`,{
                    tenant_name: data.tenant_name,
                    tenant_phone: data.tenant_phone,
                    tenant_email: data.tenant_email,
                    storage: data.storage,
                    start_date: data.start_date,
                    end_date: data.end_date,
                    building_id: building_id,
                    unit_id: unit_id,
                    creator: curUser.name
                    }
                );
                setRefreshLeases(r => true);
                setDisplayLeaseForm(r => !r);
            }
        )}>

            <label>
                tenant_name
                <input {...register("tenant_name")}/>
            </label>
            <label>
                tenant_phone
                <input type='number' {...register("tenant_phone")}/>
            </label>
            <label>
                tenant_email
                <input type='email' {...register("tenant_email")}/>
            </label>
            <label>
                storage
                <input type='checkbox' {...register("storage")}/>
            </label>
            <label>
                start_date
                <input type='date' {...register("start_date")}/>
            </label>
            <label>
                end_date
                <input type='date'{...register("end_date")}/>
            </label>
            <input type="submit" value="submit"/>
        </form>




    </div>
  )
}
