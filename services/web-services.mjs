import url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default function(){
    return {
        home : getHome,
        login : getLogin,
        addtask : addTask
    }

    async function getHome(req, rsp){
        sendFile('./html/home.html', rsp)
    }

    async function getLogin(req, rsp){
        sendFile('./html/login.html', rsp)
    }

    async function addTask(req, rsp){
        console.log(req.body)
    }

    function sendFile(fileName, rsp) {
        const fileLocation = __dirname + fileName
        rsp.sendFile(fileLocation)
    }
}