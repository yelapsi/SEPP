'use strict';

exports.index = 'ab_nyc_2019';
exports.queryField = 'name';
exports.formatHit = function (hit) {
    const source = hit._source;
    //const snippet = source['content'].replace(/\s+/g, " ").substr(0, 200);
    const title = source.title ? source.title.replace(/\s+/g, " ") : "";

    // Todo: adapt result specification to work for datasets without url.
    return {
        id: hit._id,
        name: source['name'],
        source: source['host_name'],
        text: source['neighbourhood_group'],
        //snippet: snippet
    };
};
