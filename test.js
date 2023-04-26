/* async function createOutputIndex(indexName) {
    try {
        const { body: indexResult } = await client.indices.create({
            index: indexName,
            body: {
                mappings: {
                    properties: {
                        website: { type: 'text' },
                        link: { type: 'keyword' },
                        title: { type: 'text' },
                        timestamp: { type: 'date' },
                        author: { type: 'text' }
                    },
                },
                settings: {
                    analysis: {
                        analyzer: {
                            lowercase_analyzer: {
                                tokenizer: 'keyword',
                                filter: 'lowercase',
                            },
                        },
                    },
                },
            },
        });

        console.log(`Index ${indexName} has been created with unique_fields`);
        return indexResult;
    } catch (error) {
        console.error(`Error creating index: ${error.message}`);
        throw error;
    }
}
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
    node: 'http://localhost:9200',
    auth: {
        username: 'elastic',
        password: 'F6GFOXB7Alko=L+Qd5F1'
    }
})


async function test(){
    const  body = await client.search({
        index: 'fe_hsoc_crawler_setting',
        size: 1000
      });
    const inputs = body.hits.hits
    console.log(inputs);
}
async function main() {
    const inputIndex = 'fe_hsoc_crawler_setting';
    const outputIndex = 'fe_hsoc_secnews_2023';

    const data = {
        website: 'https://www.cve.org',
        topic_name: '',
        topic_link: 'https://www.cve.org/Media/News/AllNews',
        link_start: 'class="media-content"',
        link_end: 'class=""',
        title_start: 'class="title">',
        title_end: '<',
        author_start: '',
        author_end: ''
    };
    // deleteIndex(outputIndex);
    // createOutputIndex(outputIndex);
    sendDocumentToIndex(inputIndex,data);
    // getIndexMapping(inputIndex)
}
test() */

const dataBase = require('./database')

const client = dataBase.connectElastic();

async function getIndexMapping(indexName) {
    const body = await client.indices.getMapping({
        index: indexName,
    });

    const mappings = body[indexName].mappings;
    console.log(mappings);
}

getIndexMapping('fe_hsoc_secnews_2025');