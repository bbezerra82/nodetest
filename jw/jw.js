const JustWatch = require('justwatch-api');
const JSONQuery = require('json-query');

function printResult(name, result) {
    console.log(name + ': ');
    console.log(JSON.stringify(result, null, 4));
    // console.log('\n\n\n\n\n');
}

(async function () {
    let jw = new JustWatch({
        locale: 'en_US'
    });

    let searchResult = await jw.search({
        query: 'the ring'
    });
    // printResult('search', searchResult);

    let providerId = searchResult.items[0].offers[0].provider_id;
    // console.log('provider id:' + provider);

    let providers = await jw.getProviders({});

    let providerName = JSONQuery(`[id=${providerId}].clear_name`, {
        data: providers
    }).value;

    console.log(`providerName = ${providerName}`);

    let data = [
        {
            "id": 8, 
            "profile_id": 13, 
            "technical_name": "netflix", 
            "short_name": "nfx", 
            "clear_name": "Netflix",
        },
        {
            "id":192,
            "profile_id":590,
            "technical_name":"youtube",
            "short_name":"yot",
            "clear_name":"YouTube"
        }
    ]
    // var providerName = JSONQuery('[id=192].clear_name', {
    //     data: data
    // })

    // console.log(providerName.value);

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