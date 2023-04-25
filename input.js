const inputs = [
    {
        website: 'https://www.cve.org',
        topic_name: '',
        topic_link: 'https://www.cve.org/Media/News/AllNews',
        link_start: 'class="media-content"',
        link_end: 'class=""',
        title_start: 'class="title">',
        title_end: '<',
        author_start: '',
        author_end: '',
    },
    
    {
        website: 'https://threatpost.com',
        topic_link: 'https://threatpost.com/category/vulnerabilities/',
        link_start: '',
        link_end: '',
        title_start: '',
        title_end: '',
        author_start: '',
        author_end: ''
    },
    
    {
        website: 'https://www.cve.org',
        topic_link: 'https://www.cve.org/Media/News/AllNews',
        link_start: 'class="media-content"',
        link_end: 'class=""',
        title_start: '',
        title_end: '',
        author_start: '',
        author_end: ''
    }
]

module.exports = { inputs }