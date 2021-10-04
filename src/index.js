const queue = require('fastq');
const axios = require('axios');

const CONCURRENCY = 2;

const worker = async (argument, callback) => {
    try {
        const { data: cep } = await axios.get(`https://viacep.com.br/ws/${argument}/json/`);

        console.log('response',cep);
    
        return cep;
    } catch (error) {
        console.error(error.message);
    }

};

const queueInstance = queue.promise(worker, CONCURRENCY);


const run = async () => {
    let initialcep = 52131300;
    let index = 0;

    while (index < 20) {

        console.log('request cep', initialcep);
        
        const cep = await queueInstance.push(initialcep);

        console.log('response cep', cep);

        initialcep++;
        index++;
    }
};

run();