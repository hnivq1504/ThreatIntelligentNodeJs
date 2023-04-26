const { Client } = require('@elastic/elasticsearch')
const client = connectElastic()

function connectElastic(){
    const client = new Client({
        node: 'http://localhost:9200',
        auth: {
            username: 'elastic',
            password: 'F6GFOXB7Alko=L+Qd5F1'
        }
    })
    return client;
}

async function createInputIndex(indexName) {
    try {
        const indexExists = await client.indices.exists({ index: indexName });
        if (indexExists) {
            console.log(`Index '${indexName}' already exists`);
            return;
        }
        const { body: indexResult } = await client.indices.create({
            index: indexName,
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
                        author_end: { type: 'text' },
                        is_rss: {type: 'boolean'},
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

async function createOutputIndex(indexName) {
    try {
        const indexExists = await client.indices.exists({ index: indexName });
        if (indexExists) {
            console.log(`Index '${indexName}' already exists`);
            return;
        }
        const { body: indexResult } = await client.indices.create({
            index: indexName,
            body: {
                mappings: {
                    properties: {
                        website: { type: 'keyword' },
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

async function deleteIndex(indexName) {
    const body = await client.indices.delete({
        index: indexName,
    });
    console.log(body);
}

async function getIndexStats(indexName) {
    const body = await client.indices.stats({
        index: indexName,
    });
    console.log(body);
}

async function getIndexMapping(indexName) {
    const body = await client.indices.getMapping({
        index: indexName,
    });

    const mappings = body[indexName].mappings;
    console.log(mappings);
}

async function sendInputSetting(indexName, document) {
  await client.update({
    index: indexName,
    id: document.topic_link,
    body: {
      doc: document,
      upsert: document,
    },
    retry_on_conflict: 3,
  });
  console.log(`Document sent to index '${indexName}' with ID '${document.topic_link}'`);
}

async function sendOutputDoc(indexName, document) {
    await client.update({
      index: indexName,
      id: document.Link,
      body: {
        doc: document,
        upsert: document,
      },
      retry_on_conflict: 3,
    });
    console.log(`Document sent to index '${indexName}' with ID '${document.Link}'`);
  }

async function deleteDoc(indexName, id) {
    const body = await client.delete({
        index: indexName,
        id: id
    });
    console.log(body);
}

async function loadInputSetting(){
    const body = await client.search({
        index: 'fe_hsoc_crawler_setting',
        size: 1000
    });
    const inputs = body.hits.hits;
    return inputs;
}

module.exports = {
    sendInputSetting,
    sendOutputDoc,
    connectElastic,
    loadInputSetting
};