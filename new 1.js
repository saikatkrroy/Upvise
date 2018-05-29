Projects.writeGlobalDashboard = function(id) {

    List.addHeader(["Project", "Download Invoice", "Download Report", "Email"])
    var projects = Query.select("Projects.projects", "*", "status = 0");
    for (i = 0; i < projects.length; i++) {
        var project = projects[i];
        var onclick1 = _func("Engine.eval", "downloadInvoice(" + esc(project.id) + ")");
        var button1 = '<button id="1" type="button" onclick="' + onclick1 + '">Download Invoice</button>';

        var onclick2 = _func("Engine.eval", "downloadCSV(" + esc(project.id) + ")");
        var button2 = '<button id="2" type="button" onclick="' + onclick2 + '">Download Report</button>';

        var onclick3 = _func("Engine.eval", "emailreport(" + esc(project.id) + ")");
        var button3 = '<button id=="3" type="button" onclick="' + onclick3 + '">Email Report</button>';

        List.add([project.name, button1, button2, button3], "");
    }
}

function downloadInvoice() {
    Pdf2.init();
    Pdf2.setHeader();
    Pdf2.setFilename('Invoice' + '.pdf')
    Pdf2.setWatermark(AccountSettings.get("sales.watermark"), AccountSettings.get("sales.watermarkcolor"));
    var color = AccountSettings.get("quote.color", "#4766A7");

    Pdf2.add('<style>table, th, td { border: 1px solid black; border-collapse: collapse;}</style><table width="100%"> <tr> <th align="center" width="30%">Client</th> <th align="left" width="30%"> Client</th> <th align="left" width="40%" rowspan="6">Tax Invoice: </br> Date:</br>PO#:</br></br>Contract:</th> </tr> <tr> <th rowspan ="5"> Address</th> </tr> <tr><th>&nbsp</th></tr> <tr><th>&nbsp</th></tr> <tr><th>&nbsp</th></tr> <tr><th>&nbsp</th></tr></table></br><table width="100%"> <tr> <th width= "30%" align="center">Job No./Ref</th> <th align="center" >Details</th> <th align="center" >Rate</th> <th align="center" >Amount</th> </tr> <tr> <th>&nbsp</th> <th>&nbsp</th> <th>&nbsp</th> <th>&nbsp</th> </tr> </table><table width="29%" align= "right"> <tr> <th align="left" >Sub-Total</th> <th>&nbsp</th> </tr> <tr> <th align="center" >GST &nbsp 10%</th> <th>&nbsp&nbsp</th> </tr> <tr> <th align="center" >Total</th> <th>&nbsp</th> </tr></table></br><table width="100%"> <tr> <th align="left" >Credit Terms: Net 14 Days from date of Invoice </br> </br> Direct Deposit: </br> </br> Bank: </br> BSB: </br> Account No: </br> Name: </br> </th> </tr> </table></br>')

    Pdf2.download();
}

function grabDates(id) {

    var dates = ["Item", "Category", "description", "Cost", "Unit"];
    var jobs = Query.select("Jobs.jobs", "*", "projectid =" + esc(id), "duedate")
    for (i = 0; i < jobs.length; i++) {
        var job = jobs[i];
        if (dates.indexOf(friendlyDate(job.duedate)) == -1)
            dates.push(friendlyDate(job.duedate))
    }
    dates.push("Total")
    return dates
}

function allDates(id) {
    var dates = [];
    var jobs = Query.select("Jobs.jobs", "*", "projectid =" + esc(id), "duedate")
    for (i = 0; i < jobs.length; i++) {
        var job = jobs[i];
        if (dates.indexOf(friendlyDate(job.duedate)) == -1)
            dates.push(friendlyDate(job.duedate))
    }
    return dates;
}

function countProducts(pid) {
    var map = new Map();

    var jobs = Query.select("Jobs.jobs", "*", "projectid =" + esc(pid));
    for (i = 0; i < jobs.length; i++) {
        var obj1 = [];
        var job = jobs[i];
        var products = Query.select("Jobs.jobproducts", "*", "jobid = " + esc(job.id))
        for (j = 0; j < products.length; j++) {
            var pro = products[j];
            var obj = {};
            obj.productid = pro.productid;
            var check1 = map.get(friendlyDate(job.duedate))
            //console.log(check1)
            obj.qty = pro.quantity;
            obj1.push(obj);
        }
        map.set(friendlyDate(job.duedate), obj1)
    }
    return map
}

function downloadCSV(id) {
    var csv = new CsvFile();
    var prodcount = countProducts(id)
    var alldates = allDates(id);
    console.log(alldates)
    csv.writeLine(grabDates(id))
    var allcats = ['01CC45B3517A8AF345171FC6CA4DCD', 'DFF8B3E3B7DBE5AF7F7C6AE534A0C8', 'D7A6F49E06F5E425A4AE9AD849BE8A', 'D27375AC00EC722A30B8FB91E89148', '52388F9F397822C2F8735627DD1998', 'C6687C9E22B8A92CCD7063EA62945D', 'C6AE70D16B64D362870B40D591BB97', 'C8359033207F6982DC44AE988FE2A3', '8AD1D1FDD968ECD134C5C649B572CF', 'CF94FA21A99B95AACF25424FAE4027', 'F91D6C4144495B9F19988779D80624'];

    var cat = Query.select("Sales.categories", "*", "id IN (" + esc(allcats) + ")")
    for (i = 0; i < cat.length; i++) {
        if (cat[i] == "" || cat[i] == null) {} else {
            var products = Query.select("Sales.products", "*", "categoryid =" + esc(cat[i].id), "code")
            for (j = 0; j < products.length; j++) {
            var totalprice=0;
                if (products[j] == "" || products[j] == null) {} else {
                    var a = i + "." + parseFloat(j) + parseFloat(1);
var tempdate=new Date(allDates[j]);
var jobidduedate;
var productidjobproduct;
var c;
for(c=0;c<tempdate.length; c++){
	if(tempdate[c]==null||tempdate[c]==""){jobidduedate.push(0)}else{
	jobidduedate.push(Query.select("Jobs.jobs","id", "duedate>"+esc(tempdate[c].getTime()-10)+"AND duedate<"+esc(tempdate[c].getTime()+10)))
	}
}
for(c=0; c<jobidduedate.length;c++){
	if(jobidduedate[c]==null;jobidduedate[c]==""||jobidduedate[c]==0){productidjobproduct.push(0)}else{
	productidjobproduct.push(Query.select("Jobs.jobproducts","productid","jobid="+esc(jobidduedate[c])))
	}
}
console.log(productidjobproduct[c]);
var qtyjobproduct=[];
var pricesalesproduct=[];
var data1=[];
for(c=0;c<productidjobproduct.length;c++){
		if(productidjobproduct[c]==null||productidjobproduct[c]==""||productidjobproduct[c]==0){
			qtyjobproduct[c]=0;
			pricesalesproduct[c]=0;
			}
	else{
		for(p=0;p<tempdate.length;p++){
		qtyjobproduct[p]=Query.select("Jobs.jobproducts","*", "productid="+esc(productidjobproduct[c])+"AND jobid="+esc(jobidduedate[c])+"AND date<"+esc(tempdate[p].getTime()+1000+"AND date>"+esc(tempdate[p].getTime()-1000)));
		data1.push(qtyjobproduct[p]);//got 3 data
		}
		pricesalesproduct[c]=Query.select("Sales.products","purchaseprice","id="+esc(productidjobproduct[c]));
	}
	totalprice=totalprice+(data1[c]*pricesalesproduct[c]);
}
	var data = [products[j].code,cat[i].name,products[j].name,products[j].price,Query.names("Sales.units", products[j].unitid)];
	for(t=0;t<data1.length;t++){
		data.push(data1[t]);
	}
	data.push(totalprice);
	csv.writeLine(data);
}
//csv.writeLine([products[j].code, cat[i].name, products[j].name, products[j].price, Query.names("Sales.units", products[j].unitid),qtyjobproduct.quantity,totalprice])
//csv.writeLine([products[j].code, cat[i].name, products[j].name, products[j].price, Query.names("Sales.units", products[j].unitid),Query.select("Job.jobproducts",qtyjobproduct[c],"productid="+esc(products[j].id)+"AND date<"+esc(allDates[j]+1000+"AND date>"+esc(allDates[j]-1000))))

                }

            }
        }
     var excel = new ExcelFile();
     excel.addSheet("Daily Break Down", csv.getContent());
     excel.download(Query.names("Projects.projects",id)+".xlsx");
}

function emailreport() {


}

function friendlyDate(dateObj) {
    var mydate = new Date(parseInt(dateObj));
    var date1 = (mydate.toString()).split(" ");
    return date1[0] + " " + date1[1] + " " + date1[2] + " " + date1[3];
}