import url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default function(){
    return {
        addtask : addTask
    }

    async function addTask(req, rsp){
        let data = req.body
        console.log(data)
        rsp.send('Data Received: ' + JSON.stringify(data));
    }

    function sendFile(fileName, rsp) {
        const fileLocation = __dirname + fileName
        rsp.sendFile(fileLocation)
    }
}