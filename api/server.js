import axios from "axios"

export default axios.create({
  baseURL: "http://prepare.us-east-2.elasticbeanstalk.com/"
})
