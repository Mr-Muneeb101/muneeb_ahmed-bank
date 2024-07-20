#! /usr/bin/env node
import { faker } from "@faker-js/faker";
import chalk from "chalk";
import inquirer from "inquirer";

// import inquirer, { ListQuestion } from "inquirer";
// import { ChoiceCollection } from "inquirer";
class Coustomer {
    name: string;
    gender: string;
    phoneNumber: number;
    accountnumber: number;
    balance: number;
    constructor(name: string, gender: string, phoneNumber: number, accountNumber: number, balance: number) {
        this.name = name;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.accountnumber = accountNumber;
        this.balance = balance
    }
    tranaction(val: number) {
        this.balance -= val;
    }
    deposit(val: number) {
        this.balance += val;
    }
    viewBalance() {
        console.log(chalk.whiteBright.bold(`\t\t Your Balance is : $${this.balance} \n`));
    }
    showinfo() {
        console.log(chalk.white.italic(`Name:${this.name}\nGender: ${this.gender}\nPhoneNumber: ${this.phoneNumber}\nAccountNumber:${this.accountnumber}\nBalance${this.balance}`));
    }
}
// interface account {
//     accountNumber: number,
//     balance: number;
// }
class bank {
    Coustomers: Coustomer[] = [];
    // accounts: account[] = [];
    Transaction(id: number, ammonut: number) {
        let Person = this.Coustomers.find((coustomer) => coustomer.accountnumber == id);
        if (Person) {
            Person.tranaction(ammonut)
            console.log(chalk.blue.bold(`Your Transaction have been Done \n\t your current Ammount is ${chalk.white(`$${Person.balance}`)}`));

        } else {
            console.log(chalk.red.italic(`cannot find an account`));

        }
    }
    Deposit(id: number, ammonut: number) {
        let Person = this.Coustomers.find((coustomer) => coustomer.accountnumber == id);
        if (Person) {
            Person.deposit(ammonut);
            console.log(Person.balance);
            console.log(chalk.blue.bold(`Your ammount have been Deposit \n\t your current Ammount is ${chalk.white(`$${Person.balance}`)}`));

        } else {
            console.log(chalk.red.italic(`cannot find an account`));

        }
    }
    viewBalance(id: number) {
        let Person = this.Coustomers.find((coustomer) => coustomer.accountnumber == id);
        if (Person) {
            Person.viewBalance();
        } else {
            console.log(chalk.red.italic(`cannot find an account`));
        }
    }
    showinfo(id: number) {
        let Person = this.Coustomers.find((coustomer) => coustomer.accountnumber == id);
        if (Person) {
            Person.showinfo();
        } else {
            console.log(chalk.red.italic(`cannot find an account`));
        }
    }


}
let HBL = new bank();

for (let i = 0; i < 3; i++) {
    let P_firtname = faker.person.firstName();
    let P_Gender = faker.person.sexType();
    let P_number = parseInt('3' + faker.string.numeric(10))
    let P_accountnumber = 1000 + i;
    let P_balance = 1000 * i;
    let newCoustomer = new Coustomer(P_firtname, P_Gender, P_number, P_accountnumber, P_balance);
    HBL.Coustomers.push(newCoustomer);
};
async function Bank_Operator() {
    console.log(chalk.blue.bold(`\n\n\t\tWelcome to My \n\n`));

    do {
        let userInput = await inquirer.prompt([
            {
                name: "answer",
                message: "Select operation",
                type: "list",
                choices: ["Trasaction", "Deposit", "ViewBalance", "MyInfo", chalk.red.italic("Exit")],
            }
        ]);

        switch (userInput.answer) {
            case "Trasaction":
                let UserId = await inquirer.prompt([
                    {
                        name: "ID",
                        message: "Enter your account number",
                        type: "input",
                    }, {
                        name: "ammount",
                        message: "Enter ammount",
                        type: "input",
                    }
                ]);
                HBL.Transaction(UserId.ID, parseInt(UserId.ammount));
                break;
            case "Deposit":
                let account = await inquirer.prompt([
                    {
                        name: "ID",
                        message: "Enter your account number",
                        type: "input",
                    }, {
                        name: "ammount",
                        message: "Enter ammount",
                        type: "input",
                    }
                ]);
                HBL.Deposit(account.ID, parseInt(account.ammount));
                break;
            case "ViewBalance":
                let userInput = await inquirer.prompt([
                    {
                        name: "id",
                        type: "input",
                        message: "please Enter your account Number",
                    }
                ]);
                HBL.viewBalance(userInput.id);
                break;
            case "MyInfo":
                let Input = await inquirer.prompt([
                    {
                        name: "id",
                        type: "input",
                        message: "please Enter your account Number",
                    }
                ]);
                HBL.showinfo(Input.id);
                break;
            case "Exit":
                return false;
            default:
                break;
        }
    } while (true);

}
Bank_Operator();
