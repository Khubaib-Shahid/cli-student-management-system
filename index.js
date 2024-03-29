#! /usr/bin/env node
import inquirer from "inquirer";
let arr = [
    {
        name: "Saqib",
        id: 12345,
        course: "Artificial Intelligence",
        gender: "male",
        phone_number: 1234567890,
        balance: {
            Quarter_1: true,
            Quarter_2: false,
            Quarter_3: false,
            Quarter_4: false,
        },
    },
    {
        name: "Adeel",
        id: 54321,
        course: "Web and App Development",
        gender: "male",
        phone_number: 1234527123,
        balance: {
            Quarter_1: true,
            Quarter_2: false,
            Quarter_3: false,
            Quarter_4: false,
        },
    },
];
let stNames = ["Saqib", "Adeel"];
async function student() {
    let recep = await inquirer.prompt([
        {
            message: "Welcome in Student Management System",
            type: "list",
            name: "enroll",
            choices: ["Get Enroll", "Already a student"],
        },
    ]);
    if (recep.enroll === "Get Enroll") {
        let getEnroll = await inquirer.prompt([
            { message: "Enter your name", type: "input", name: "name" },
            {
                message: "Select your course",
                type: "list",
                name: "course",
                choices: [
                    "Artificial Intelligence",
                    "Graphic Designing",
                    "Web and App Development",
                ],
            },
            {
                message: "Select your gender",
                type: "list",
                name: "gender",
                choices: ["male", "female"],
            },
            {
                message: "Enter your phone number",
                type: "number",
                name: "phoneNumber",
            },
            { message: "your Quarter 1 fee is 3000", type: "confirm", name: "fees" },
        ]);
        let st = {
            name: getEnroll.name,
            id: Math.floor(Math.random() * 1000000),
            course: getEnroll.course,
            gender: getEnroll.gender,
            phone_number: getEnroll.phoneNumber,
            balance: {
                Quarter_1: true,
                Quarter_2: false,
                Quarter_3: false,
                Quarter_4: false,
            },
        };
        arr.push(st);
        stNames.push(st.name);
        console.log("Done", "\nYour id : " + st.id);
        student();
    }
    else if (recep.enroll === "Already a student") {
        let alreadyStudent = await inquirer.prompt([
            {
                message: "Select any action",
                type: "list",
                name: "action",
                choices: ["Student detailes", "Edit student detailes"],
            },
        ]);
        if (alreadyStudent.action === "Student detailes") {
            let detailes = await inquirer.prompt([
                {
                    message: "Select student",
                    type: "list",
                    name: "student",
                    choices: stNames,
                },
            ]);
            for (let i = 0; i < stNames.length; i++) {
                if (stNames[i] === detailes.student) {
                    console.log(arr[i]);
                }
            }
            student();
        }
        else if (alreadyStudent.action === "Edit student detailes") {
            let change = await inquirer.prompt([
                {
                    message: "Select student",
                    type: "list",
                    name: "student",
                    choices: stNames,
                },
                {
                    message: "Select which quarter fee is paid",
                    type: "list",
                    name: "quarter",
                    choices: ["Quarter_1", "Quarter_2", "Quarter_3", "Quarter_4"],
                },
            ]);
            arr[stNames.indexOf(change.student)].balance[change.quarter] = true;
            student();
        }
    }
}
student();
