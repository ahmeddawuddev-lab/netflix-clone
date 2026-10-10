import axios from "axios"

//configuration eyeseran new
let movieInstance = axios.create({
    baseURL:"https://api.themoviedb.org/3"
})//axios.create() returns an object/function with Axios methods and configuration attached to it ... axios.create() is the API Axios give us for creating an independently configured instance ... configured Axios instance = an Axios request-making object with its own default settings
export default movieInstance