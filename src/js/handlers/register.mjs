
import { register } from "../api/auth/register.mjs"

//  Old way of doing this, all made in a function. This is just for me to refer back to if needed. 


// const form = document.querySelector("#registerForm"); 

// form.addEventListener("submit", (event) => {

//     event.preventDefault()
//     const form = event.target; 
//     // const name = form.name.value;
//     // const password = form.password.value
//     // const email = form.email.value;
//     // const banner = form.banner.value;
//     // const avatar = form.avatar.value;

//     // const profile = { 
//     //     name, 
//     //     email, 
//     //     password, 
//     //     banner, 
//     //     avatar
//     // }


//     // Trick from course assignment video - Creates an object with the keys and values with a single line of code. 
//     const formData = new FormData(form); 
//     const profile = Object.fromEntries(formData.entries())

// } 
// )


 // Trick from course assignment video - Creates an object with the keys and values with a single line of code. 
export function setRegisterFormListener() { 
const form = document.querySelector("#registerForm"); 


if (form) { 
form.addEventListener("submit", (event) => {

    event.preventDefault()
    const form = event.target; 
    const formData = new FormData(form); 
    const profile = Object.fromEntries(formData.entries())

    // send it to the API
    register(profile)
})
}  
}


