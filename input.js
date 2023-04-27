const inputs = [
    {
        website: 'https://www.cve.org',
        topic_name: 'cve',
        topic_link: 'https://www.cve.org/Media/News/AllNews',
        link_start: 'class="media-content"',
        link_end: 'class=""',
        title_start: 'class="title">',
        title_end: '<',
        author_start: '',
        author_end: '',
        language: 'en',
        is_rss: 'false'
    },
    
    {
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
    },
    
    {
        website: 'https://www.cve.org',
        topic_name: 'cve',
        topic_link: 'https://www.cve.org/Media/News/AllNews',
        link_start: 'class="media-content"',
        link_end: 'class=""',
        title_start: 'class="title">',
        title_end: '<',
        author_start: '',
        author_end: '',
        language: 'en',
        is_rss: 'false'
    }
]

module.exports = { inputs }