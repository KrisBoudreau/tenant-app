import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

export default function UnitForm( 
    {curUser, building_id, setRefreshUnits, setDisplayUnitForm} ) {

    const {register, handleSubmit } = useForm();

    return (
        <form onSubmit={handleSubmit((data)=> {
            axios.post(`http://localhost:3001/buildings/${building_id}/units`,{
                building_id: building_id,
                creator: curUser.name,
                unit_number: data.unit_number,
                tenant_name: data.tenant_name,
                type: data.type,
                size: data.size,
                price_per_sqft: data.price_per_sqft,
                vacant: data.vacant,
                base_rate: data.base_rate,
                end_of_lease: data.end_of_lease,
                end_of_insurance: data.end_of_insurance
                }
            );
            setRefreshUnits(r => true);
            setDisplayUnitForm(r => !r);
            }
        )}>
            <label>
                Unit number
                <input type="number" {...register("unit_number")}/>
            </label>
            <label>
                Tenant name
                <input {...register("tenant_name")}/>
            </label>
            <label>
                Type
                <input {...register("type")}/>
            </label>
            <label>
                Size
                <input type="number" {...register("size")}/>
            </label>
            <label>
                Price/sqft
                <input type="number" {...register("price_per_sqft")}/>
            </label>
            <label>
                Vacant
                <input type="checkbox" {...register("vacant")}/>
            </label>
            <label>
                Base Rate
                <input type="number" {...register("base_rate")}/>
            </label>
            <label>
                End of Insurance
                <input type="date" {...register("end_of_insurance")}/>
            </label>
            <label>
                End of Lease
                <input type="date" {...register("end_of_lease")}/>
            </label>

            <input type="submit" value="submit"/>
        </form>         
    )
}
