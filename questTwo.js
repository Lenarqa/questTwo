// для локального прочтения файла использовал Node.js File System
const fs = require('fs');

let data = fs.readFileSync('testTxt.txt', 'utf8');
let stringArray = data.replace(/\r/g, '').split('\n');

let users = [];
class userStruct {
    constructor(name, requestPerHour, numberOfHours, inform) {
        this.name = name;
        this.requestPerHour = requestPerHour;
        this.numberOfHours = numberOfHours;
        this.sumOfRequests = requestPerHour * numberOfHours;
        this.inform = inform;
    }

    
}

stringArray.forEach((el)=> {
    let name = el.split(' ')[0];
    let requestPerHour = parseInt(el.split(' ')[1]);
    let numberOfHours = parseInt(el.split(' ')[2]);
    let inform = el.split(' ')[3];
    users.push(new userStruct (name, requestPerHour, numberOfHours, inform));
});

// console.log(users[0].name);

let finishUsers = []
for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < users.length; j++) {
        if(users[i].name == users[j].name && i != j) {
            users[i].requestPerHour += users[j].requestPerHour;
            users[i].numberOfHours += users[j].numberOfHours;
            users[i].sumOfRequests += users[j].sumOfRequests;
            users.splice(j, 1);
        }   
    }
}

// сортируем по алфафиту
users.sort((a,b)=> a.name > b.name ? 1 : -1);

let logger = fs.createWriteStream('finishText.txt', {flags: 'a'});
users.map((user) => {
    let userString = `${user.name} ${user.requestPerHour} ${user.numberOfHours} ${user.sumOfRequests} ${user.inform}`;
    logger.write(userString + '\n');
});