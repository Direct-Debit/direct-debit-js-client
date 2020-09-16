const should = require('should');
const DirectDebitClient = require('../index')

const auth = {
    user: 'TTTT',
    password: "Paste an API password for TTTT here when you test"
}

describe('Testing And Monitoring', function() {
    it('Create a client', function() {
        let client = new DirectDebitClient(false, auth.user, auth.password);

        should.exist(client);
        client.should.have.property('baseURL')
        client.baseURL.should.startWith('https://dos-dr')
    })

    it('Know who I am', async function() {
        let client = new DirectDebitClient(false, auth.user, auth.password);
        let response = await client.WhoAmI()

        response.should.have.property('user_code').which.equal("TTTT")
    })
})
