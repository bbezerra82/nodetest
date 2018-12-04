const JustWatch = require('./justWatchAPI.js');
const JSONQuery = require('json-query');
// const jq = require('node-jq');

function printResult(name, result) {
    // console.log(name + ': ');
    console.log(JSON.stringify(result, null, 4));
    // console.log('\n\n\n\n\n');
}

(async function () {
    let jw = new JustWatch({
        locale: 'en_GB'
    });
    // printResult('', searchResult);

    // let title = await jw.getTitle(top5[0].contentType, top5[0].id)

    // printResult('', title);

    // let providerId = searchResult.items[0].offers[0].provider_id;
    // console.log('provider id:' + provider);

    let searchResult = await jw.search({
        query: 'the ring',
        page_size: 5
        // providers: 'Netflix'
    });

    let arraySize = JSONQuery('.page_size', {data:searchResult}).value;
    let title = JSONQuery('[items].title', {data:searchResult}).value;
    let release = JSONQuery('[items].original_release_year', {data:searchResult}).value;
    let short_description = JSONQuery('[items].short_description', {data:searchResult}).value;

    // console.log(JSON.stringify(title, null, 4));
    // console.log(JSON.stringify(release, null, 4));
    // console.log(JSON.stringify(short_description, null, 4));
    // console.log(JSON.stringify(offers, null, 4));
    // console.log(offers.length)

    let movies = []
    for (i = 0; (i < arraySize); i++) {
        let item = {
            title: title[i],
            release: release[i],
            description: short_description[i],
            offers: []
        }
        let offersList = JSONQuery(`[items][title=${title[i]}].offers`, {data:searchResult}).value;
        // console.log(JSON.stringify(offersList, null, 4));
        let monetization_type = JSONQuery(`.monetization_type`, {data:offersList}).value;
        console.log(JSON.stringify(monetization_type, null, 4));
        for (j = 0; (j < offersList.length); j++) {
            // console.log(JSON.stringify(offersList[j], null, 4));
            item.offers[j] = offersList[j];
        }
        
        // console.log(JSON.stringify(item, null, 4));
            

        movies.push(item)
    }

    // console.log(JSON.stringify(movies, null, 4))
    
    
    // console.log(JSON.stringify(offers, null, 4))
     var provider = {
        "providerA": {
            "heardAs": "Netflix",
            "resolved": "Netflix",
            "ERstatus": "ER_SUCCESS_MATCH"
        },
        "providerB": {
            "heardAs": "BBC",
            "resolved": "BBC iPlayer",
            "ERstatus": "ER_SUCCESS_MATCH"
        },
        "providerC": {
            "heardAs": "",
            "resolved": "",
            "ERstatus": ""
        }
    }

    // let providers = []
    // var result = JSONQuery('[*][resolved]', {data: provider}).value

    // for (i = 0; (i < result.length) && (result[i] !== ''); i++) {

    //     providers.push({
    //         "id": i,
    //         "name" : result[i]
    //     });
    // }
    // console.log(providers)




    // // var result = JSONQuery('[**][*country=NZ]', {data: data}).value
    // var result = JSONQuery('[*][resolved]', {data: provider}).value

    // for (i = 0; (i < result.length) && (result[i] !== ''); i++) {
    //     console.log(result[i])
    // // }

    // let favourites = ['a', 'b', 'c'];

    // let check = ['b', 'd', 'e', 'a'];

    // for (i = 0; i < favourites.length; i++) {
    //     if(check.includes(favourites[i])) {
    //         check.splice(check.indexOf(favourites[i]), 1)
    //     }
    //     // console.log(`check inclueds ${favourites[i]}? ${check.includes(favourites[i])}`)
    // }
    // console.log(check)

    // let data = await jw.getProviders({});

    // console.log(JSON.stringify(data, null, 4));


    // let providersList = JSONQuery('[id]', {
    //     data: data
    //     // data: await jw.getProviders({})
    //   }).value;

    //   console.log(providersList)

    // console.log(JSON.stringify(searchResult, null, 4))
    
    
    // const filterMovie = '[.items | .[] | {title, release: .original_release_year, description: .short_description, offers: [(.offers | .[] | select(.monetization_type | contains("rent")))? | {monetization_type, provider_id, presentation_type, retail_price, currency}]}]';
    // const options = {
    //     input: 'json'
    // }

    // let listMovie = await jq.run(filterMovie, searchResult, options)
    // // console.log(list);


    // let providers = await jw.getProviders({});
    // // console.log(providers);
    
    // const filterProvider = '[.[] | {id, clear_name, short_name}]';

    // let listProvider = await jq.run(filterProvider, providers, options);
    // console.log(listProvider);

    // try {
    //     let providersName = await jq.run(filter2, providersList, {input: 'json'})
    //     console.log(providersName)
    // } catch (error) {
    //     console.error(error)
    // }

    // let data = [
    //     {
    //         "id": 8, 
    //         "profile_id": 13, 
    //         "technical_name": "netflix", 
    //         "short_name": "nfx", 
    //         "clear_name": "Netflix",
    //     },
    //     {
    //         "id":192,
    //         "profile_id":590,
    //         "technical_name":"youtube",
    //         "short_name":"yot",
    //         "clear_name":"YouTube"
    //     }
    // ]

    // let providerName = JSONQuery(`[clear_name][short_name]`, {
    //     data: data
    //     // data: await jw.getProviders({})
    // }).value;

    // console.log(providerName)

    // var data = {
    //     grouped_people: {
    //       'friends': [
    //         {name: 'Steve', country: 'NZ'},
    //         {name: 'Jane', country: 'US'},
    //         {name: 'Mike', country: 'AU'},
    //         {name: 'Mary', country: 'NZ'},
    //       ],
    //       'enemies': [
    //         {name: 'Evil Steve', country: 'AU'},
    //         {name: 'Betty', country: 'NZ'},
    //       ]
    //     }
    //   }
    
    //     var result = JSONQuery('grouped_people[**][*country=NZ]', {data: data}).value

    //     console.log(result)



    // var data = {
    //     people: [
    //       {name: 'Matt', country: 'NZ'},
    //       {name: 'Pete', country: 'AU'},
    //       {name: 'Mikey', country: 'NZ'}
    //     ]
    //   }
       
    //   let providerName = JSONQuery('people[country=NZ].name', {
    //     data: data
    //   }).value

    // for (i = 0; i < providerName.length; i++) {
    //     console.log(providerName[i]);
    // }
    // console.log(`providerName = ${providerName}`);
    // printResult('', providerName);
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




    // let favourites = ['a', 'b', 'c'];

    // let check = ['b', 'd', 'e', 'a'];

    // for (i = 0; i < favourites.length; i++) {
    //     if(check.includes(favourites[i])) {
    //         check.splice(check.indexOf(favourites[i]), 1)
    //     }
    //     // console.log(`check inclueds ${favourites[i]}? ${check.includes(favourites[i])}`)
    // }
    // console.log(check)

})();