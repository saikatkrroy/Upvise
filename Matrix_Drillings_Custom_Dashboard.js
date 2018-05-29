Projects.writeGlobalDashboard = function(id) {

List.addHeader(["Project","Download Invoice","Download Report",""])
var projects = Query.select("Projects.projects","*","status = 0");
for (i=0;i<projects.length;i++){
var project = projects[i];
var onclick1 =  _func("Engine.eval","downloadInvoice("+esc(project.id)+")");
var button1 = '<button id="1" type="button" onclick="'+onclick1+'">Download Invoice</button>';

var onclick2 =  _func("Engine.eval","downloadCSV("+esc(project.id)+")");
var button2 = '<button id="2" type="button" onclick="'+onclick2+'">Download Report</button>';

var onclick3 =  _func("Engine.eval","emailreport("+esc(project.id)+")");
var button3 = '<button id=="3" type="button" onclick="'+onclick3+'">Email Report</button>';

List.add([project.name,button1,button2,""],"");
}
}

function getQuoteName(status) {
var prefix = String(new Date().getFullYear()) + "-";
var initials = (AccountSettings.get("sales.initials") == "1") ? User.getInitials() + "-" : "";
var key = "nextid." + status;
var newid = AccountSettings.get(key, "");
var idlen = newid.length;
nextid = 1 + parseInt(newid, 10);
nextid = padNumber(nextid, idlen);
var key = "nextid." + status;
AccountSettings.set(key, nextid);
return prefix + initials + newid;
} 
function padNumber(number, length) {
var str = '' + number;
while (str.length < length) {
str = '0' + str;
}
return str;
}

function validateInvoice(id){
var pro = Query.selectId("Projects.projects",id);
var invoice = Query.select("Sales.quotes","*","status = 1 AND projectid ="+esc(id));
if(invoice.length == 0){
var inv = {};
inv.name = getQuoteName(1);
inv.date = Date.today();
inv.projectid = id;
inv.companyid = pro.companyid;
inv.status = 1;
inv.owner = User.getName();
inv.currency = "AUD";
inv.vat = "10";
inv.contactid = pro.contactid;
inv.duedate = Date.addDays(Date.today(),5);
var id1 = Query.insert("Sales.quotes",inv);
addOrUpdateProducts(id,id1);
return id1;
}
else{
addOrUpdateProducts(id,invoice[0].id);
return invoice[0].id;
}
}

function validateProduct(Iid){
var map = new Map();
var inv = Query.select("Sales.quoteproducts","*","quoteid ="+esc(Iid));
for(i=0;i<inv.length;i++){
map.set(inv[i].productid,inv[i].quantity);
}
return map;
}

function addOrUpdateProducts(pid,Iid){
var jobs = Query.select("Jobs.jobs","*","projectid = "+esc(pid));

for(i=0;i<jobs.length;i++){
var job = jobs[i];
if(job =="" || job == null){}
else{
var prods = Query.select("Jobs.jobproducts","*","jobid = "+esc(job.id));
var check3 = validateQty(job.id);
for(j=0;j<prods.length;j++){
var check1 = validateProduct(Iid);
if(check1.has(prods[j].productid) == false){
var pro = {};
pro.quoteid = Iid;
pro.productid = prods[j].productid;
pro.quantity = prods[j].quantity;
pro.productname = prods[j].name;
pro.price = prods[j].price;
pro.currency = "AUD";
pro.vat = "10";
pro.unitid = prods[j].unitid;
pro.date = prods[j].date;
Query.insert("Sales.quoteproducts",pro);

}
else {

var check2 = Query.select("Sales.quoteproducts","*","quoteid = "+esc(Iid)+" AND productid = "+esc(prods[j].productid));
var tqty =parseFloat(check2[0].quantity)+parseFloat(prods[j].quantity);
if(check3.get(prods[j].productid) < tqty)
Query.updateId("Sales.quoteproducts",check2[0].id,"quantity",tqty)

}
}
}
}
}

function validateQty(jid){
var map = new Map();
var inv = Query.select("Jobs.jobproducts","*","jobid ="+esc(jid));
for(i=0;i<inv.length;i++){

if(map.has(inv[i].productid)==true){
var exist = inv[i].quantity+map.get(inv[i].productid)
map.set(inv[i].productid,exist);
}
else
map.set(inv[i].productid,inv[i].quantity);
}
return map;

}


function downloadInvoice(id){
var inv = validateInvoice(id);
var inv1 = Query.selectId("Sales.quotes",inv);
Pdf2.init();
Pdf2.setHeader();
Pdf2.setFilename('Invoice #'+inv1.name+'.pdf')
Pdf2.setWatermark(AccountSettings.get("sales.watermark"), AccountSettings.get("sales.watermarkcolor"));
var color = AccountSettings.get("quote.color", "#4766A7");

var company = Query.names("Contacts.companies",inv1.companyid);
var comp = Query.selectId("Contacts.companies",inv1.companyid);

Pdf2.add('<style>table, th, td { border: 1px solid black; border-collapse: collapse;}</style><table width="100%"> <tr> <th align="center" width="30%">Client</th> <th align="left" width="30%">',company,'</th> <th align="left" width="40%" rowspan="6">Tax Invoice: ',inv1.name,'</br> Date:',friendlyDate(inv1.date),'</br>PO#:',getCustomField("Projects.projects",id,"F1"),'</br></br>Contract:',getCustomField("Projects.projects",id,"F2"),'</th> </tr> <tr> <th rowspan ="5"> Address</th> </tr> <tr><th>',comp.street,'</th></tr> <tr><th>',comp.city,'</th></tr> <tr><th>',comp.state+"-"+comp.zipcode,'</th></tr> <tr><th>',comp.country,'</th></tr></table></br><table width="100%"> <tr> <th width= "30%" align="center">Job No./Ref</th> <th align="center" >Details</th> <th align="center" >Rate</th> <th align="center" >Amount</th> </tr> ',invoiceLineItems(inv),' </table><table width="29%" align= "right"> <tr> <th align="left" >Sub-Total</th> <th>',inv1.totalex,'</th> </tr> <tr> <th align="center" >GST &nbsp </th> <th>10%</th> </tr> <tr> <th align="center" >Total</th> <th>',inv1.total,'</th> </tr></table></br><table width="100%"> <tr> <th align="left" >Credit Terms: Net 14 Days from date of Invoice </br> </br> Direct Deposit: </br> </br> Bank: </br> BSB: </br> Account No: </br> Name: </br> </th> </tr> </table></br>')

Pdf2.download();
}

function validateJob(){

}

function invoiceLineItems(id){
var str ="";
var prods = Query.select("Sales.quoteproducts","*","quoteid = "+esc(id));
for(i=0;i<prods.length;i++){
var prod = prods[i];

str += '<tr> <th>&nbsp</th> <th>'+prod.productname+'</th> <th>'+prod.price+'</th> <th>'+(parseFloat(prod.price)*parseFloat(prod.quantity))+'</th> </tr>';


}
return str;
}

function grabDates(id){

var dates = ["Item","Category","description","Cost","Unit"];
var jobs = Query.select("Jobs.jobs","*","projectid ="+esc(id),"duedate")
for(i=0;i<jobs.length;i++){
var job = jobs[i];
if(dates.indexOf(friendlyDate(job.duedate))== -1)
dates.push(friendlyDate(job.duedate))
}
dates.push("Total")
return dates
}

function allDates(id){
var dates = [];
var jobs = Query.select("Jobs.jobs","*","projectid ="+esc(id),"duedate")
for(i=0;i<jobs.length;i++){
var job = jobs[i];
if(dates.indexOf(friendlyDate(job.duedate))== -1)
dates.push(friendlyDate(job.duedate))
}
return dates;
}

 

function countProducts(id) {
    
var bulk = [];
    var alldates = allDates(id);

    var jobDates = [];
    for (j = 0; j < alldates.length; j++) {
            var hmap = new Map();
        var date1 = new Date(alldates[j]);
        var date2 = date1.getTime();
        var date3 = Date.addDays(date2, 1);
        var prods = Query.select("Jobs.jobproducts", "*", "date >=" + esc(date2) + " AND date < " + esc(date3));
      
        for (i = 0; i < prods.length; i++) {
            var obj = {};
            var prod = prods[i];
            if (prod == "" || prod == null) {} else {
                if (hmap.has(prod.productid) == false) {
                    obj.date = date2;
                    obj.qty = prod.quantity;
                    hmap.set(prod.productid, obj)
                } else {
                    var obj1 = hmap.get(prod.productid);
                    if (obj1 == "" || obj1 == null) {} else {
                        obj.date = date2;
                        obj.qty = obj1.qty + prod.quantity;
                        hmap.set(prod.productid, obj);
                    }
                }
            }
        }
      bulk.push(hmap)
    }
    return bulk;
}

function downloadCSV(id){
var prods = countProducts(id);


var alldates = allDates(id);
var jobDates = [];
for(j=0;j<alldates.length;j++){
	var date1 = new Date(alldates[j]);
	var date2 = date1.getTime();
         jobDates.push(date2);
}
var csv = new CsvFile();

csv.writeLine(grabDates(id));
var allcats = ['01CC45B3517A8AF345171FC6CA4DCD','DFF8B3E3B7DBE5AF7F7C6AE534A0C8','D7A6F49E06F5E425A4AE9AD849BE8A','D27375AC00EC722A30B8FB91E89148','52388F9F397822C2F8735627DD1998','C6687C9E22B8A92CCD7063EA62945D','C6AE70D16B64D362870B40D591BB97','C8359033207F6982DC44AE988FE2A3','8AD1D1FDD968ECD134C5C649B572CF','CF94FA21A99B95AACF25424FAE4027','F91D6C4144495B9F19988779D80624'];

var cat = Query.select("Sales.categories","*","id IN ("+esc(allcats)+")")
for(i=0;i<cat.length;i++){
if(cat[i] == "" || cat[i] == null){}
else{
var products = Query.select("Sales.products","*","categoryid ="+esc(cat[i].id),"code");
for(j=0;j<products.length;j++){
if(products[j]=="" || products[j]==null){}
else{
var a = parseInt(i+1)+"."+parseFloat(j);
var data = [a,cat[i].name,products[j].name,products[j].price,Query.names("Sales.units",products[j].unitid)];
var total=0.0;
for(k=0;k<jobDates.length;k++){
var pid = prods[k].get(products[j].id)
if(pid== "" || pid == null){ data.push("0")}
else{
total += pid.qty
data.push(pid.qty);
}
}

data.push(total*products[j].price)

csv.writeLine(data);
}
}
}
}
  	var excel = new ExcelFile();
       excel.addSheet("Daily Break Down", csv.getContent());
        excel.download(Query.names("Projects.projects",id)+".xlsx");
}

function emailreport(){


}

function friendlyDate(dateObj)
{
  var mydate = new Date(parseInt(dateObj));
  var date1= (mydate.toString()).split(" ");
  return date1[0]+" "+date1[1]+" "+date1[2]+" "+date1[3];
}

function getCustomField(table, id, name) {
   if (table == null || table == "" || id == "" || id == null)
       return "";
   var obj = Query.selectId(table, id);
   if (obj == null || obj.custom == null)
       return;
   var custom = (obj.custom != "") ? JSON.parse(obj.custom) : {};
   var value = custom[name];
   return (value != null) ? value : "";
}