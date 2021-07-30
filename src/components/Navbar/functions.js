import { AxiosGetAndPush } from '../../functions/functions';
const config = require("../../config.json")


export const NavbarSearch = ({ e, setMobileSearchBarActive, history}) => {
    e.preventDefault();
    setMobileSearchBarActive(false);  
    
    const search = e.target.search_input.value
    const params = { "search": search }
    const requestUrl = config.queryApiUrl + "/navbar-search"
    const pushUrl = "/searchresults/" + search
    AxiosGetAndPush(params, requestUrl, pushUrl, history)
}