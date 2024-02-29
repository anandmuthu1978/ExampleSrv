
using CS from '../db/cs';
using APPLICATION from '../db/cs';
using SUBAPPLICATION from '../db/cs';
using TABLELIST from '../db/cs';
using JUMPVIEW from '../db/cs';
using TABLEFIELDLABEL from '../db/cs';

@cds.query.limit: { default: 10000, max: 100000 }
@(requires:'authenticated-user')
service CatalogService {

@readonly
entity ApplicationSet as projection on APPLICATION;

@readonly
entity SubApplicationSet as projection on SUBAPPLICATION;

@readonly
entity TableSet as projection on TABLELIST;

@readonly
entity JumpViewSet as projection on JUMPVIEW;

@readonly
entity TableFieldLabelSet(P1: String(255), P2: String(13)) as select from TABLEFIELDLABEL(IP_TABNAME : :P1, IP_DDLANGUAGE : :P2 ){*} ORDER BY MANDATORY desc,POSITION asc;

}