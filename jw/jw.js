const JustWatch = require('justwatch-api');
const JSONQuery = require('json-query');

function printResult(name, result) {
    // console.log(name + ': ');
    console.log(JSON.stringify(result, null, 4));
    // console.log('\n\n\n\n\n');
}

(async function() {
    let jw = new JustWatch({
        locale: 'en_US'
    });

    let searchResult = await jw.search({
        query: 'the ring'
    });
    // printResult('search', searchResult);

    let providerId = searchResult.items[0].offers[0].provider_id;
    // console.log('provider id:' + provider);

    var providerName = JSONQuery()

    // let providerName = await jw.getProviders({
    //     query: provider
    // });

    // printResult('provider', providerName)
    // console.log('providerName: ' + providerName);

    // let type = searchResult.items[0].object_type;
    // console.log(`type: ${type}`)
    // var episodes = await jw.getEpisodes(searchResult.items[0].id);
    // printResult('episodes', episodes);

    // var providers = await jw.getProviders();
    // printResult('providers', providers);

    // var title = await jw.getTitle(searchResult.items[0].object_type, searchResult.items[0].id)
    // printResult('title', title);



})();