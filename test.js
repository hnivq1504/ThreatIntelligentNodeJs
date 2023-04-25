const { Client } = require('@elastic/elasticsearch')
const client = new Client({
    node: 'http://localhost:9200',
    auth: {
        username: 'admins',
        password: 'admin123'
    }
})

async function main() {
    const { index } = await client.index({
        index: 'testindex',
        body: {
            title: '1st time create index',
            content: 'this is test index'
        }
    });

    console.log('created');

    const { body } = await client.search({
        index: 'testindex',
        body: {
            query: {
                match: {
                    title: '1st time create index'
                }
            }
        }
    });
    console.log(body.hits.hits);
}

main()