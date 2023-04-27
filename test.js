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
test() */

const dataBase = require('./database');

const client = dataBase.connectElastic();

// async function getIndexMapping(indexName) {
//     const body = await client.indices.getMapping({
//         index: indexName,
//     });

//     const mappings = body[indexName].mappings;
//     console.log(mappings);
// }

async function main() {
    const inputIndex = 'fe_hsoc_crawler_setting';
    const outputIndex = 'fe_hsoc_secnews_2023';

    const data = {
        /* website: 'https://www.cve.org',
        topic_name: 'cve',
        topic_link: 'https://www.cve.org/Media/News/AllNews',
        link_start: 'class="media-content"',
        link_end: 'class=""',
        title_start: 'class="title">',
        title_end: '<',
        author_start: '',
        author_end: '',
        language: 'en',
        is_rss: 'false' */
        website: 'https://en.secnews.gr',
        topic_name: 'vulnerabilities',
        topic_link: 'https://en.secnews.gr/security/',
        link_start: 'class="td-post-category">security</a>',
        link_end: 'rel="bookmark"',
        title_start: 'class="tdb-title-text">',
        title_end: '<',
        author_start: '',
        author_end: '',
        language: 'en',
        is_rss: 'false'
    };
    // deleteIndex(outputIndex);
    // createOutputIndex(outputIndex);
    await  dataBase.sendInputSetting(inputIndex, data);
    // getIndexMapping(inputIndex)
}

main()
