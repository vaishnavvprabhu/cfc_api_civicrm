const express = require('express');
const app = express();
const https = require('https')
var request = require('request');

//CiviCRM
var config = {
  server:'https://charterforcompassion.org',
  path:'/administrator/components/com_civicrm/civicrm/extern/rest.php',
  key:'a5ed065d4b54fe8f8bd77b0fb3cc5aa2',
  api_key:'rglLlzLnzxxhyPddllSC5KNp'
};

var crmAPI = require('civicrm')(config);

// crmAPI.get ('contact',{contact_type:'Individual',return:'display_name,email,phone'},
//   function (result) {
//     for (var i in result.values) {
//       val = result.values[i];
//      console.log(val.id +": "+val.display_name+ " "+val.email+ " "+ val.phone);
//      console.log(val);
//     }
//   }
// );

// crmAPI.create ('contact',{contact_type:'Organization','first_name':'Test api1','last_name':'school api','display_name':'Test School api1','organization_name':'Test School API1'},
//   function (result) {
//     if (result.is_error) {
//        console.log('ERROR '+ result.error_message);
//     } else {
//       crmAPI.create ('address',{contact_id:result.id,'geo_code_1':'2.12','geo_code_2':'2.22'},
//       function(address){
//         if (address.is_error) {
//           console.log('ERROR Inserting Address: ' + address.error_message);
//         }
//         else {
//           console.log('PUSHED ADDRESS TO ' + result.id);
//           crmAPI.create ('GroupContact',{contact_id:result.id,'group_id': 'Schools_Signed_Compassion_Char_95'},
//           function(GroupContact){
//             if (GroupContact.is_error){
//               console.log('ERROR Inserting GroupContact: ' + GroupContact.error_message);
//             }
//             else {
//               console.log('PUSHED CONTACT ' + result.id + ' TO ContactGROUPS')
//             }
//           })  
//         }
//       })
//        console.log('CREATED CONTACT '+ result.id);
//     }
//   }
// );


//Allow from all sources
const cors = require('cors');

app.use(cors());
app.get('/api/api/getdata', function (req, res) {
  //Call with option eg.
  //{"sequential":1,"return":"display_name,geo_code_1,geo_code_2,postal_code,custom_47,custom_93,custom_34,custom_123","contact_type":"Organization","options":{"limit":10,"join":"address"},

  let url='https://charterforcompassion.org/administrator/components/com_civicrm/civicrm/extern/rest.php?entity=Contact&action=get&json=' + 
  req.query.options + '}&api_key=rglLlzLnzxxhyPddllSC5KNp&key=a5ed065d4b54fe8f8bd77b0fb3cc5aa2'

  const request = https.request(url, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data = data + chunk.toString();
    });
    response.on('end', () => {
      res.status(200).json(JSON.parse(data));
      });
    })
    request.on('error', (error) => {
      console.log('An error', error);
    });
    request.end()
  })

  app.post('/api/api/postdata', function (req,res){
      // console.log(req.body)
        //Call with option eg.
    //{"sequential":1,"return":"display_name,geo_code_1,geo_code_2,postal_code,custom_47,custom_93,custom_34,custom_123","contact_type":"Organization","options":{"limit":10,"join":"address"},

    // let url='https://charterforcompassion.org/administrator/components/com_civicrm/civicrm/extern/rest.php?entity=Contact&action=create&json=' + 
    // req.query.options + '&api_key=rglLlzLnzxxhyPddllSC5KNp&key=a5ed065d4b54fe8f8bd77b0fb3cc5aa2'
    // console.log(url);

    // const request = https.request(url, (response) => {
    //   let data = '';
    //   response.on('data', (chunk) => {
    //     data = data + chunk.toString();
    //   });
      
    //   response.on('end', () => {
    //     res.status(200).json(JSON.parse(data));
    //     });
    //   })

    //   console.log(response)
      
    //   request.on('error', (error) => {
    //     console.log('An error', error);
    //   });
      
    //   request.end()

    // LINK
    // {
    //            "organization_name":"test","custom_123":"test","email":"vvp@gmail.com","custom_93":"Early childhood (up to ~5)","custom_47":"0-100",                            
    //  TODO:"TOBEDECIDED":"Public School",
    // ADDRESS - "country":"India","state_province":"Uttar Pradesh","city":"delhi","postal_code":"201014","street_address":"616-D, Shipra Suncity, Indirapuram",
    // OTHERS - "about":"nothing as of now",
    // "lat":20.593684,"lng":78.96288,"lang":"en","contact_type":"Organization","contact_sub_type":"Partner","tag":"Educational Institution"
    //  }

    //{"organization_name":"test","custom_123":"test","email":"vvp@gmail.com","custom_93":"Early childhood (up to ~5)","custom_47":"0-100","custom_136":"Public School","country":"India","state_province":"Uttar Pradesh","city":"delhi","postal_code":"201014","street_address":"616-D, Shipra Suncity, Indirapuram","about":"nothing as of now","lat":20.593684,"lng":78.96288,"lang":"en","contact_type":"Organization","contact_sub_type":"Partner","tag":"Educational Institution"}




//     crmAPI.create ('contact',{contact_type:'Organization','first_name':'Test api1','last_name':'school api','display_name':'Test School api1','organization_name':'Test School API1'},
//   function (result) {
//     if (result.is_error) {
//        console.log('ERROR '+ result.error_message);
//     } else {
//       crmAPI.create ('address',{contact_id:result.id,'geo_code_1':'2.12','geo_code_2':'2.22'},
//       function(address){
//         if (address.is_error) {
//           console.log('ERROR Inserting Address: ' + address.error_message);
//         }
//         else {
//           console.log('PUSHED ADDRESS TO ' + result.id);
//           crmAPI.create ('GroupContact',{contact_id:result.id,'group_id': 'Schools_Signed_Compassion_Char_95'},
//           function(GroupContact){
//             if (GroupContact.is_error){
//               console.log('ERROR Inserting GroupContact: ' + GroupContact.error_message);
//             }
//             else {
//               console.log('PUSHED CONTACT ' + result.id + ' TO ContactGROUPS')
//             }
//           })  
//         }
//       })
//        console.log('CREATED CONTACT '+ result.id);
//     }
//   }
// );





var requestData = JSON.parse(req.query.options)
    console.info('-------------Starting Contact Entry Procedure-------------------')
    crmAPI.create ('contact',{'contact_type':'Organization','display_name':requestData.organization_name,'organization_name':requestData.organization_name,'custom_93':requestData.custom_93,'custom_47':requestData.custom_47,'custom_106':requestData.about,'custom_134':requestData.country,'custom_135':requestData.state_province, 'custom_136':requestData.custom_136, 'custom_137':requestData.custom_137, 'custom_138':requestData.custom_138, 'website':requestData.custom_140},
  function (result) {
    if (result.is_error) {
       console.error('ERROR '+ result.error_message);
    } else {
      crmAPI.create ('Email',{"contact_id":result.id,"email":requestData.email,"is_primary":1},
      function (email) {
        if (email.is_error){
          console.error('ERROR ' + email.error_message);
        } else {
          console.info('PUSHED EMAIL TO ' + result.id);
          crmAPI.create ('address',{contact_id:result.id,"is_primary":1,'geo_code_1':requestData.lat,'geo_code_2':requestData.lng,'city':requestData.city,'postal_code':requestData.postal_code,'street_address':requestData.street_address},
          function(address){
            if (address.is_error) {
              console.error('ERROR Inserting Address: ' + address.error_message);
            }
            else {
              console.info('PUSHED ADDRESS TO ' + result.id);
              crmAPI.create ('GroupContact',{contact_id:result.id,'group_id': 'Schools_Signed_Compassion_Char_95'},
              function(GroupContact){
                if (GroupContact.is_error){
                  console.error('ERROR Inserting GroupContact: ' + GroupContact.error_message);
                }
                else {
                  console.info('PUSHED CONTACT ' + result.id + ' TO ContactGROUPS')
                  crmAPI.create ('EntityTag',{"entity_table":"civicrm_contact","tag_id":"Educational Institution","entity_id":result.id},
                  function(EntityTags){
                    if(EntityTags.is_error){
                      console.error('ERROR Inserting ' + result.id + ' TO Tag: Educational Institution: '+ EntityTags.error)
                    }
                    else{
                      console.info('OK Inserted ' + result.id + ' TO Tag Educational Institution')
                      console.log('-------------Closing Contact Entry Procedure-------------------')
                    }
                  })
                }
              })
            }
          })
        }
      })
       console.log('CREATED CONTACT '+ result.id);
    }
  }
);




// var options = {
//   'method': 'POST',
//   'url': url,
// };
  
//     request(options, function (error, response) {
//       console.log(response);
//       if (error) throw new Error(error);
//       console.log(response.body);
//     });
  })




  app.put(async function (req, res) {
    console.log(req.body)
    
    // do yor stuff
  })  

  app.post('/api/api/deletedata', function (req,res) {

  var requestData = JSON.parse(req.query.options)
  crmAPI.get ('contact',{contact_type:'Organization',email:requestData.email,return:'contact_id,display_name,email,phone'},
  function (result) {
    for (var i in result.values) {
      val = result.values[i];
     console.log(val.id +": "+val.display_name+ " "+val.email+ " "+ val.phone);
     console.log(val);

     crmAPI.delete ('contact',{id:val.id},
      function (result) {
    if (result.is_error) {
       console.log('ERROR '+ result.error_message);
    } else {
       console.log('DELETED CONTACT '+ result.id);
    }

  }
);
    }
  }
);
  })

  var server = app.listen(1080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("server listening on port 1080")
})



