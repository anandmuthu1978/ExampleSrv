using APPLICATION from '../db/cs';
using SUBAPPLICATION from '../db/cs';
using TABLELIST from '../db/cs';

extend APPLICATION with {
    App1: Association to many SUBAPPLICATION on App1.APPLICATIONID = APPLICATIONID;
}

extend SUBAPPLICATION with {
    App2: Association to many TABLELIST on App2.SUBAPPLICATIONID = SUBAPPLICATIONID;
}