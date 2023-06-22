import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

export default function BuildingForm( {
    curUser, 
    setRefreshBuildings, 
    setDisplayBuildingForm} ) {

    const {register, handleSubmit } = useForm();
    return (
        <div>
            Building Form
            <form onSubmit={handleSubmit(
                (data)=> {
                    axios.post(`http://localhost:3001/buildings`,{
                        name: data.name,
                        creator: curUser.name,
                        insurance_email: 'none'
                        }
                    );
                    setRefreshBuildings(r => true);
                    setDisplayBuildingForm(r => !r);
                }
            )}>

                <label>
                    Building name
                    <input {...register("name")}/>
                </label>

                <input type="submit" value="submit"/>
            </form>


        </div>
    )
}

