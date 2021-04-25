const aws4 = require("aws4")
const apigClientFactory = require('aws-api-gateway-client').default;

export const signedRequest = () => {
    //pathParams = params to be submitted with request
    //apiParams.pathTemplate = resource path
    //apiParams.invokeUrl = all api endpoint url before resource
    const credentials = {
        "secretKey": "8y7prG6GlN25i4kDrnbPZtERh9WXHzquS920SFRa",
        "accessKey": "ASIAW4LZZGHMKWECJWJ2",
        "sessionToken": "IQoJb3JpZ2luX2VjEIb//////////wEaCXVzLWVhc3QtMSJHMEUCIARmlOs6BVsth1hcQQV3t/f8/WzHRHXOdbut6790xvY9AiEAnwYV5bsE7+28PDzB7+zK6NZoL06vEiUARYKSQP25WtEqqgQI3///////////ARABGgw0NzMyMzg2ODAwMjQiDIq06DByw8JOKdGcTCr+A/tOWKnam3UbIDPCcQa4+nERq0nOa2Cn9DYDgaVYb6Lprp2mL9gJcI5JAyjRAjSOda8QsUeYsfnzi/2O2fNUG4FFDhZM2IiP5++wuLpOZEltLZVfdv30BjFDVQf2Vwryqh9TY1jXcy7LJpPwHtwzNVO4sFDTEvhTd2pv7aGwqVGMNZReMijLXMHrMteG7EDBdugsC3+phdy726aGdGa+1SfdsTWtYPzer9i66XspVWl9jxDD566qbK2qo2C3gcV6hIPlzXVFYw5qKWDA5rxtUD7FOwdi7f3/G0zpW7FbAjx6x0xsLm3NtVM8gj0agWh3TCJdPpc7SzR9Bkfg7S476lsLIYRM+LHXzc6NkXdjRHQ+4//CjLA/okWostumu6i0Xv0VWJ7nB2HQDOU9wo/PKPaEGo/+U8kVdrEz5T3WTmV48pEzealwYEPFUqHgbcGrW82NeLcmlzJEz1f0sGruRjwmcY5BdwUV1JXMu/LQKmtk29GUqSH29iMy+6sB/y0jtl08fZnNOveibu9tmiVo5OoUtETFvGWCTkMhm3XfjA0OikspWQX2Zh+OUqBE7JfFq1IH+oPXT2sPGd6en5vkDz+5k/iK2mn2N6EV9kCH4P8s3BDPOsFVbTED57715p2DmqtvxlCoJn3h5os7AYcoeaIv0zMrluPCFfHueXO7NjCunNiDBjqFAmuG7RQJY/ZoBJYSBXHWvNErv5ZBk0ySqUnkImbrZSaQq6bk1mSbbNzrv6caJ5dG+HIjpLl5cSrzh/jnf1groQgcTt4nTWJb5uiLq4US9sIuizBXookXHExgIJj47GjlSDOZkStD954Wz0WTwVoRSId3DfYrmnLfvfqwrTpfja75AkUx5vlbFBEb2jB8NHW8rb1Ui/OTXMTPCupacTL4bUL3R2FRkkbn0WUcM1aacS4xu6nHOWtLn6kDz8zgD98/w6BO9PhegXeQIG8QGjXk3VFB5PnR73UipElQGVtkAAa7UIKBWrgGnlgcTt5P1ua/AN6s5h/ZM6nzr/atiyqfwTohawM+aQ=="
    }
    const apiParams = 
        {
            "invokeUrl": "https://9fqebvawee.execute-api.us-east-1.amazonaws.com/dev",
            "pathTemplate": "/teuploadcheckstatus"
        }
    const pathParams = {}

    var apigClient = apigClientFactory.newClient({
        invokeUrl: apiParams.invokeUrl,
        accessKey: credentials.accessKey,
        secretKey: credentials.secretKey,
        sessionToken: credentials.sessionToken,
        region: "us-east-1"
    });

    var resp = apigClient.invokeApi(pathParams, apiParams.pathTemplate, "GET")
        .then(resp => {
            console.log(resp)
            return resp
        })
        .catch(err => {
            console.log(err)
        })

}