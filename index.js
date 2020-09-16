const axios = require('axios')

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
}
