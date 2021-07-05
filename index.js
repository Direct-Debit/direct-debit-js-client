const axios = require('axios')
const FormData = require("form-data")

module.exports = class DirectDebitClient {
    constructor(production, userCode, password) {
        let subdomain = production ? "dos" : "dos-dr"
        this.baseURL = `https://${subdomain}.directdebit.co.za:31143/v2/`

        this.auth = {
            username: userCode,
            password: password
        }
    }

    async WhoAmI() {
        return new Promise((resolve, reject) => {
            let url = this.baseURL + 'whoami'

            axios.get(url, {auth: this.auth})
                .then(r => resolve(r.data))
                .catch(r => reject(r))
        });
    }

    async UploadEFTFile(content, fileName) {
        fileName || (fileName = "file_data.csv")

        let form = new FormData()
        form.append("file_data", content, {
            filename: fileName
        })

        return new Promise((resolve, reject) => {
            let conf = {
                headers: form.getHeaders(),
                auth: this.auth
            }
            axios.post(this.baseURL + "batch/eft/csv", form.getBuffer(), conf)
                .then(r => resolve(r.data))
                .catch(r => reject(r))
        });
    }
}
