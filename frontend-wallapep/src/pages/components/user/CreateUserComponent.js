import { useState, useRef } from "react";
import { modifyStateProperty} from "../../../utils/UtilsState";

let CreateUserComponent = () => {

    let [formData,setFormData] = useState({
        email: '',
        password : '',
    })



    let clickCreate = async () => {
        let response = await fetch(process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/users", {
            method: "POST",
            headers: { "Content-Type" : "application/json "},
            body: JSON.stringify(formData)
        })

        if (response.ok){
            let responseBody = await response.json();
            console.log("ok "+responseBody)
        } else {
            let responseBody = await response.json();
            let serverErrors = responseBody.errors;
            serverErrors.forEach( e => {
                console.log("Error: "+e.msg)
            })
        }
    }

    return (
        <div>
            <h2>Create User</h2>
            <input type="text" name="email" onChange={(i) => {
                modifyStateProperty(formData, setFormData, "email", i.currentTarget.value)
            }}/>
            <input type="password" name="password" onChange={(i) => {
                modifyStateProperty(formData, setFormData, "password", i.currentTarget.value)
            }}/>
            <button onClick={clickCreate}>Create User</button>
        </div>
    )
}


export default CreateUserComponent;
