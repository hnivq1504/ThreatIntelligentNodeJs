const { Client } = require('@elastic/elasticsearch')
const client = new Client({
    node: 'http://localhost:9200',
    auth: {
        username: 'elastic',
        password: 'F6GFOXB7Alko=L+Qd5F1'
    }
})

async function createIndexInput(myindex) {
    try {
        const indexExists = await client.indices.exists({ index: myindex });

        if (indexExists.body) {
            console.log('Index already exists.');
            return;
        }

        const { body: response } = await client.indices.create({
            index: myindex,
            body: {
                mappings: {
                    properties: {
                        website: { type: 'keyword' },
                        topic_name: { type: 'text' },
                        topic_link: { type: 'keyword' },
                        link_start: { type: 'text' },
                        link_end: { type: 'text' },
                        title_start: { type: 'text' },
                        title_end: { type: 'text' },
                        author_start: { type: 'text' },
                        author_end: { type: 'text' }
                    }
                }
            }
        });

        console.log('Index created:', response);
    } catch (error) {
        console.error(error);
    }
}

async function searchDocuments() {
    try {
        const { body } = await client.search({
            index: 'testindex',
            body: {
                query: {
                    match: {
                        Title: 'Example'
                    }
                }
            }
        });
        console.log('Response:', body);
        console.log('Hits:', body.hits);
    } catch (error) {
        console.error(error);
    }
}

async function insertDocument() {
    try {
        const { body } = await client.index({
            index: 'testindex',
            body: {
                Website: 'https://www.example.com',
                Link: 'https://www.example.com/article1',
                Title: 'Example Article 1',
                Timestamp: '2023-04-25T12:34:56.789Z',
                Author: 'John Doe'
            }
        });
        console.log(body);
    } catch (error) {
        console.error(error);
    }
}

async function listIndices() {
    try {
        const { body } = await client.cat.indices({ format: 'json' });
        console.log(body);
        console.log('Indices:', body.map(index => index.index));
    } catch (error) {
        console.error(error.meta.body.error);
    }
}

listIndices();