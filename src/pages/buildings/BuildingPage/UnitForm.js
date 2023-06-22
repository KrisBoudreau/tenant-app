import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Button } from '@mui/material';

export default function UnitForm( {curUser, building_id, setRefreshUnits, setDisplayUnitForm} ) {

    const {register, handleSubmit } = useForm();

    return (
        <div>
            UnitForm

            <form onSubmit={handleSubmit(
                (data)=> {
                    axios.post(`http://localhost:3001/buildings/${building_id}/units`,{
                        building_id: building_id,
                        creator: curUser.name,
                        unit_number: data.unit_number,
                        }
                    );
                    setRefreshUnits(r => true);
                    setDisplayUnitForm(r => !r);
                }
            )}>

                <label>
                    Unit number
                    <input {...register("unit_number")}/>
                </label>

                <input type="submit" value="submit"/>
            </form>




            

            
        
        
        </div>
    )
}
