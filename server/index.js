import axios from "axios";
import rl from "readline-sync";

async function getAllUsers() {
  try {
    let resp = await axios.get("http://127.0.01:6789/getallusers");
    console.log(resp.data);
    console.log(resp.statusText);
  } catch (error) {
    console.log(error.message);
  }
}

async function getUserById() {
  try {
    let id = rl.question("Please enter the id of the user: ");
    let resp = await axios.get(`http://127.0.0.1:6789/getuser/${id}`);
    console.log(resp.data);
    console.log(resp.statusText);
  } catch (error) {
    console.log(error.message);
  }
}

async function createUser() {
  try {
    let name = rl.question("Please enter your name: ");
    let age = rl.question("Please enter your age: ");
    let mobile = rl.question("Please enter your mobile number: ");
    await axios.post(`http://127.0.0.1:6789/adduser`, {
      name,
      age,
      mobile,
    });
    await getAllUsers();
  } catch (error) {
    console.log(error.message);
  }
}

let req;
while (true) {
  req = rl.question("Please enter the API you want to call: ");
  switch (req) {
    case "allusers":
      await getAllUsers();
      break;

    case "byid":
      await getUserById();
      break;

    case "create":
      await createUser();
      break;

    case "exit":
      process.exit();

    default:
      console.log("Invalid input given.");
      break;
  }
}