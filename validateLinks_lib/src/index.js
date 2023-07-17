import fs from 'fs';
import chalk from 'chalk';
import { get } from 'http';


function findLinks(text){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const matches = [...text.matchAll(regex)];

    const links = matches.map((match) => ({[match[1]]: match[2]}));

    return links.length !== 0 ? links : chalk.red('Não foram encontrados links');
}


function trataErro(erro){
    throw new Error(chalk.red(erro.code, erro.message));
}

async function getFiles(path){
    try{
        const encoding = 'utf8';
        const texto = await fs.promises.readFile(path, encoding);
        return findLinks(texto);
        
    }catch(erro){
        trataErro(erro);
    }
}

export default getFiles;
