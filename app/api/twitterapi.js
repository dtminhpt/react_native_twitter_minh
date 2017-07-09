 
import twitter, {auth} from 'react-native-twitter';

const tokens = {
            consumerKey: 'LGEvzx2CFjplU2TaFDHjb7s0b',
            consumerSecret: 'NMP2yFRoWviPKEC8UgMlBszj0RrAp1cx0v2z3ytaVGPm1Qc6yi',
            accessToken: "4335576924-UBPzLn1uDirIZshITtfUBH5hYbpZLFoTyVsMWOA",
            accessTokenSecret: "1nuVNBhHNCMrh1mrm0BZD0QUt53NYnPyRIcgN2eLNBeno" 
}

export const twitterAPI = {
    async getHomeTimeLine() {
        var data = await getMethod('statuses/home_timeline',{count:50});
        return data;
    },
     async getUserProfile(id) {
        var data = await getMethod('users/show',{user_id:id});
        return data;
    },
    async createTweet(text) {
        var data = await postMethod('statuses/update',{status: text});
        return data;
    },
     async getAccountSettings() {
        var data = await getCategory();
        console.log(data[0]);
        return data;
    },
     async favoriteTweet(id) {
        var data = await postMethod('favorites/create',{id:id});
        return data;
    }, 
    async getAccountVerify(params) {
        var data = await getMethod('account/verify_credentials',{include_entities:true});
        return data;
    },
    async getSuggestions(params) {
        var data = await getMethod('users/suggestions',{});
        return data;
    },

}

async function getMethod(url, params) {
    const {rest, stream} = twitter(tokens);

    return await rest.get(url, params).then((result) => {
            console.log("RESULT==="+ result)
            return result;
         }).catch(console.log('done'));
};

async function postMethod(url, params) {
    const {rest, stream} = twitter(tokens);

    return await rest.post(url, params).then((result) => {
            //console.log(result);
            return result;
         }).catch(console.log('done'));
}
