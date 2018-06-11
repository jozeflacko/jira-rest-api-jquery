/*
    jquery is required!
    
    you can use this:
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
*/

/**
 * Set domain where to send requests 
 */
var DOMAIN_NAME = "ENTER DOMAIN NAME";

/**
 * Function is basic authentification in Jira 
 * 
 * @param {string} user 
 * @param {string} password 
 * @param {function with 1 parameter which will be response from the server} callback 
 */
function login(user, password, callback) {
		
    var datos = {			
         "username": user, 
         "password": password 
    };
    
    var parameters = JSON.stringify(datos);
    
    $.ajax({
        url: DOMAIN_NAME + '/jira/rest/auth/1/session',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
         data: parameters,	
         crossDomain: true,	        
        success: function (data) {
            if(data && data.session && data.session.value) {
                //webdesk.cookies.set(data.session.name, data.session.value);
                callback();
            }
        },		 
        error: function(jqXHR, textStatus, errorThrown) {		       
            console.log(errorThrown);
        }
    });
}


/**
 * Function will authentificate in Jira and create a new Jira issue.
 * Jira issue will be assigned to the user who will be passed into the function * 
 * 
 * @param {string} issuename    - description of the issue
 * @param {string} project      - must be an existing project!
 * @param {string} enviroment 
 * @param {string} reproduction 
 * @param {string} user 
 * @param {string} password 
 * @param {string} type 
 */
function createJiraIssue(issuename, project, enviroment, reproduction, user, password, type) {
	
    var datos = {
        "username": user,     // authentification
        "password": password, // authentification        
        "fields": {
            "project":
                  {
                      "key": project // must be first defined
                  },
            "summary": issuename,
            "description": reproduction,
            "labels": [ 
                'Cool Label'
            ],
            "components": [ 
                { 
                    name: 'Module_XYZ' // must be first defined
                } 
            ],
            "environment": enviroment, // can be anything
            "issuetype": {
                "name": type
            },
            "assignee": { 
                "name": user // I assume your are Jira user
            }
        }
    };

    var parameters = JSON.stringify(datos);
    webdesk.progressinfo.showProgressInfo();
    
    var req = $.ajax({
        url: DOMAIN_NAME + '/jira/rest/api/2/issue/',
        type: "POST",
        data: parameters,
        contentType: 'application/json',
        dataType: 'json',
        async: false,
        processData: false,
        crossDomain: true, 
        xhrFields: {
            withCredentials: true // to be able to log in
        },
        error: function (errmsg) {
            alert('Ups something went wrong. Open console to see an error');
            console.log(errmsg.responseText);
        },
        success: function (data) {              
            alert('Jira Issue '+data.key+' was created');
        },
    });
}
