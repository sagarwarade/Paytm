const checksum_lib = require('./paytm/checksum/checksum')
const config = require('./config/config')

exports.startPayment=(req, res)=>{
    (async function startPayment(){
        try{
            let params ={}
            params['MID'] = 'pkShnQ20776009873923',
            params['WEBSITE'] = 'WEBSTAGING',
            params['CHANNEL_ID'] = 'WEB',
            params['INDUSTRY_TYPE_ID'] = 'Retail',
            params['ORDER_ID'] = 'ORD0020',
            params['CUST_ID'] = 'CUST0018',
            params['TXN_AMOUNT'] = '1',
            params['CALLBACK_URL'] = 'http://localhost:'+config.port+'/callback',
            params['EMAIL'] = 'xyz@gmail.com',
            params['MOBILE_NO'] = '8482897497'
    
            checksum_lib.genchecksum(params,'2uC75XODsJJSumNU',function(err,checksum){
                let txn_url = "https://securegw-stage.paytm.in/order/process "
    
                let form_fields = ""
                for(x in params)
                {
                    form_fields += "<input type='hidden' name='"+x+"' value='"+params[x]+"'/>"
    
                }
    
                form_fields+="<input type='hidden' name='CHECKSUMHASH' value='"+checksum+"' />"
    
                var html = '<html><body><center><h1>Please wait! Do not refresh the page</h1></center><form method="post" action="'+txn_url+'" name="f1">'+form_fields +
                '</form><script type="text/javascript">document.f1.submit()</script></body></html>'
                res.writeHead(200,{'Content-Type' : 'text/html'})
                res.write(html)
                res.end()
            });
        }
    
      
            
          
        
    
    catch (error) {
            console.log('error while transaction'+error);
           }
    }());


};




