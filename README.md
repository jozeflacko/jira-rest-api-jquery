# jira-rest-api-jquery

## This is demo of how to connect to jira server and create a jira issue. 

To be able to use the script you have to have jquery in your project, enabled CORS on jira server and provide a domain name for script to where to send requests.

Methods in script are: 
- login(user, password, callback)
- createJiraIssue(issuename, project, enviroment, reproduction, user, password, type);
