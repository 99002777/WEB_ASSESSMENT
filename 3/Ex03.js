
const app = require('express')();
const parser = require("body-parser");
const fs = require("fs");
const dir = __dirname;


app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());


let users = []; 
let flag = 1;

function readData() {
    const filename = "data.json"; 
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    users = JSON.parse(jsonContent);
}

function saveData() {
    const filename = "data.json";
    const jsonData = JSON.stringify(users);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}
app.get("/users", (req, res) => {
    readData();
    res.send(JSON.stringify(users));
})

app.get("/users/:id", (req, res) => {
    const userid = req.params.id;
    if (users.length == 0) {
        readData();
    }
    let foundRec = users.find((e) => e.usersId == userid);
    if (foundRec == null)
        throw "users not found";
    res.send(JSON.stringify(foundRec))
})

app.put("/users", (req, res) => {
    if (users.length == 0)
        readData(); 
    let body = req.body;
   
    for (let index = 0; index < users.length; index++) {
        let element = users[index];
        if (element.usersId == body.userId) { 
            element.usersName = body.userName;
            element.usersAddress = body.userAddress;
            element.usersSalary = body.userSalary;
            saveData();
            res.send("users updated successfully");
        }
    }
    
})

app.post('/users', (req, res) => {
    if (users.length == 0)
        readData(); 
    let body = req.body; 



    for (let index = 0; index < users.length; index++) {
        let element = users[index];
        if (element.usersName == body.userName) { 
            res.send("user name already exists");
            flag = 0;
        }

    }


    if (flag >= 1) {
        employees.push(body);
        saveData();
        res.send("user added successfully");
    }

})
app.delete("/users/:id", (req, res) => {
    throw "Do it UR Self!!!!";
})

app.listen(1234, () => {
    console.log("Server available at 1234");
})