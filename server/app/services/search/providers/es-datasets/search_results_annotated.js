'use strict';

exports.index = 'search_results_annotated';
exports.queryField = 'title';
exports.formatHit = function (hit) {
    const source = hit._source;
    //const snippet = source['content'].replace(/\s+/g, " ").substr(0, 200);
    const title = source.title ? source.title.replace(/\s+/g, " ") : "";

    // Todo: adapt result specification to work for datasets without url.
    return {
        id: hit._id,
        name: source['title'],
        source: source['url'],
        text: source['snippet'],
        viewpoint: source['viewpoint'],
        //snippet: snippet
    };
};
