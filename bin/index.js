#!/usr/bin/env node

console.log("Hello, Node.JS!");




// // HELLO PART
// const chalk = require("chalk");
// const boxen = require("boxen");
// const greeting = chalk.white.bold("Hello there!");

// const boxenOptions = {
//  padding: 1,
//  margin: 1,
//  borderStyle: "round",
//  borderColor: "green",
//  backgroundColor: "#555555"
// };
// const msgBox = boxen( greeting, boxenOptions );

// console.log(msgBox);






// // 1 CODE
// const validator = require('validator');
// const axios = require('axios');
// const figlet = require('figlet');

// const { getCode, getName } = require('country-list');
// let holiYear = new Date().getFullYear();
// const api = "https://date.nager.at/api/v2/publicholidays/";
// const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
// const error = chalk.bold.red;



// process.argv.forEach((val, index) => {
// 	if (val.charAt(0) != "/") {
// 		if (validator.isInt(val) && val.length == 4) {
// 			if(val < new Date().getFullYear() + 20 && val > new Date().getFullYear() - 50)
// 			{
// 				holiYear = val;
// 			} 
// 			else 
// 			{	
// 				console.log(error("Year entered is not in the available scope. Using current year instead."));
// 			}
// 		}
// 		else if (validator.isAlpha(val)) {

// 			let code = getCode(val);

// 			if (code == undefined) 
// 			{
// 				console.log("Error. Country name not correctly spelled. Any country code found.")
// 			} 
// 			else
// 			{
// 				figlet('Holidays', {
// 					horizontalLayout: 'default',
// 					verticalLayout: 'default'
// 				}, function (err, data) {
// 					if (err) {
// 						console.log('Something went wrong...');
// 						console.error(err);
// 						return;
// 					}

//                     console.log(boxen(chalk.bold.blue(data), { padding: 1, borderStyle: 'round' }))
// 				})
				
// 				console.log(chalk.bgBlack(`There is the official public Holidays dates for ${val} in ${holiYear}`));
				
// 				let holidays = axios.get(`${api}${holiYear}/${code}`)
// 					.then(response => {
// 						response.data.forEach(day => {
// 							let fixed = "";
// 							let dateHol = new Date(day.date);
// 							console.log(chalk.bold.bgBlack.blueBright(`-- ${days[dateHol.getDay()]} ${dateHol.getDate()} ${months[dateHol.getMonth()]} ${dateHol.getFullYear()} --`));
// 							console.log(chalk.bold.green(day.localName) + ` aka (${day.name}). ${fixed}`);
// 						})
// 					}).catch(error => {
// 						console.error(error);
// 					})
// 			}

// 		}
// 		else 
// 		{
// 			console.log("No correct parameter received. Please enter 'man get-holidays' for more information.");
// 		}
// 	}
// });





//2ND CODE

//requiring the county-list, (only the code of the country) and the axios
// const { getCode } = require('country-list');
// const axios = require('axios');
// const chalk = require('chalk');

//Import à la place des require parce qu'ora ne fonctionne qu'avec import
import { getCode } from 'country-list';
import axios from 'axios';
import chalk from 'chalk';
import ora from 'ora';
import figlet from 'figlet';

//Getting the country and the date given by the user
const year = process.argv[3] || new Date().getFullYear(); //if the user don't give a year it takes the given year, if no, it will take the current year
const country = getCode(process.argv[2]);

const spinner = ora('Fecthing datas').start();


figlet('Holidays', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

//asynch function of axios
const getHolidays = async () =>{
    try{
        const response = await axios.get(`https://date.nager.at/api/v3/publicholidays/${year}/${country}`); //Getting the data in the API
if(response.status === 200){
    spinner.succeed("Datas fetched!");
}
        return response.data;

    }catch(err){
        spinner.fail("This country doesn't exist in our DB")
        console.log(err);
    }
};


const displayHolidays = async () =>{
    const holidays = await getHolidays();
    
    holidays.map((holiday) => {
    console.log(`${chalk.gray.italic.underline(holiday.date)}: ${chalk.cyan(holiday.name)} - aka - ${chalk.yellow.italic(holiday.localName)}`)
    });
};

displayHolidays();