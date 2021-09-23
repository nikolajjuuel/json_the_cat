const axios = require("axios");

const BASE_API = "https://api.thecatapi.com/v1/breeds/search?q=";
const cat_type = 'sib';

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getCats = (type) => {
    const route = BASE_API + type;
    return axios.get(route).then((response) => {
   //     console.log(response.data);
        const data = response.data;
        console.log(data[0].description);
        return response.data;
    });
};


const promptCat = () => {
    return new Promise((resolve, reject) => {
        rl.question("What cat would you like?", (type) => {
            resolve(type);
        });
    }).then((type) => {
        console.log("You have selected", type);
        rl.close();
        return getCats(type);
    }).catch((e)=>{
    console.log("sorry no such cat please try again!");
    rl.close();

    //return promptCat();

    })
};

promptCat();
