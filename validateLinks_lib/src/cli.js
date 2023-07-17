import getFiles from "./index.js";
import fs from 'fs';
import chalk from 'chalk';
import validateList from "./http-validate.js";



const path = process.argv[2];
const validate = process.argv[3] === '--validate';
textProcess(path, validate);

async function printList(validate, list, id=""){


    if(validate){
        console.log(
            chalk.blue('Lista validada'),
            chalk.black.bgGreen(id),
            await validateList(list)
        )
    }else{
        console.log(
            chalk.blue('Lista de links'),
            chalk.black.bgGreen(id),
            list
        )
    }

}

async function textProcess(path, validate=false){

    try{
        fs.lstatSync(path);
    }catch(erro){
        if(erro.code === 'ENOENT'){
            console.log('Arquivo ou diretório não encontrado');
            return;
        }
    }


    if(fs.lstatSync(path).isFile()){
        const result = await getFiles(path);
        printList(validate, result);
    }else if(fs.lstatSync(path).isDirectory()){
        const files = await fs.promises.readdir(path);
        files.forEach( async (nameFile) => {
            const list = await getFiles(`${path}/${nameFile}`);
            printList(validate, list, nameFile)
        })
    }

}
