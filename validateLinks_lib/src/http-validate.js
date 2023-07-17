import chalk from "chalk";

function linkExtractor(linkList){
    return linkList.map( (objectLink) => Object.values(objectLink) )
}

async function checkStatus(urlList){

    const statusList = await Promise
    .all(
        urlList.map(async (url) =>{
            try{
                const response = await fetch(url);
                return `${response.status} - ${response.statusText}`;
            }catch(error){
                return manipulateErrors(error);
            }

        })
    )
    return statusList;
}

function manipulateErrors(erro){

    if(erro.cause.code === 'ENOTFOUND'){
        return '404 - Not Found';
    }else{
        console.log(chalk.red('Algo deu errado'))
    }

}

export default async function validateList(linkList){
    const links = linkExtractor(linkList);
    const status = await checkStatus(links);


    return linkList.map( (obj, index) => ({
        ...obj,
        status: status[index]
    }))

}