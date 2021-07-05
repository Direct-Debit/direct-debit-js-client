const should = require('should');
const DirectDebitClient = require('../index')

const auth = {
    user: 'TTTT',
    password: "Paste an API password for TTTT here when you test"
}

describe('Testing And Monitoring', function() {
    it('Create a client', function () {
        let client = new DirectDebitClient(false, auth.user, auth.password);

        should.exist(client);
        client.should.have.property('baseURL')
        client.baseURL.should.startWith('https://dos-dr')
    })

    it('Know who I am', async function () {
        let client = new DirectDebitClient(false, auth.user, auth.password);
        let response = await client.WhoAmI()

        response.should.have.property('user_code').which.equal("TTTT")
    })
})

describe('EFT Batches', function() {
    it("Upload a string as a file", async function() {
        let client = new DirectDebitClient(false, auth.user, auth.password);
        let data = "This data should still get a 200 response from the API, but the batch will be in an error state" + (Math.random()).toString()

        let response = await client.UploadEFTFile(data)

        response.should.have.property('id')
    })
})
