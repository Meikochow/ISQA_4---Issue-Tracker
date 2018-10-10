**FreeCodeCamp**- Information Security and Quality Assurance
------

Project Issue Tracker

1) Cross site scripting(XSS attack) prevention achieved by using HelmetJS;
2) User data stored and accessed by using MongoDB database;
3) 11 functional tests performed using Mocha framework with the Chai assertion library;
4) You can POST /api/issues/{projectname} with form data containing required issue_title, issue_text, created_by, and optional assigned_to and status_text.
5) You can PUT /api/issues/{projectname} with a \_id and any fields in the object with a value to object said object. Returned will be 'successfully updated' or 'could not update '+\_id. This should always update updated_on. If no fields are sent return no updated field sent.
6)You can DELETE /api/issues/{projectname} with a \_id to completely delete an issue. If no \_id is sent return '\_id error', success: 'deleted '+\_id, failed: 'could not delete '+\_id.
7) You can  GET /api/issues/{projectname} for an array of all issues on that specific project with all the information for each issue as was returned when posted.

**Project Link**
https://rainbow-jump.glitch.me/


