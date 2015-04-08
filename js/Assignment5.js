function MenuChoice()
{
var menu=document.getElementById("menu").value;

if (menu == "Customer Orders")
{
document.getElementById("section1").style.visibility = "visible";
document.getElementById("section2").style.visibility = "hidden";
document.getElementById("section3").style.visibility = "hidden";
}
else if (menu == "Customer Orders History")
{
document.getElementById("section1").style.visibility = "hidden";
document.getElementById("section2").style.visibility = "visible";
document.getElementById("section3").style.visibility = "hidden";
}
else if (menu == "All Customer")
{
document.getElementById("section1").style.visibility = "hidden";
document.getElementById("section2").style.visibility = "hidden";
document.getElementById("section3").style.visibility = "visible";
}
else
{
document.getElementById("section1").style.visibility = "hidden";
document.getElementById("section2").style.visibility = "hidden";
document.getElementById("section3").style.visibility = "hidden";
}
}

function GetInfo()
{
var menu=document.getElementById("menu").value;
var objRequest = new XMLHttpRequest(); //Create AJAX request object
//Create URL and Query string
if (menu == "Customer Orders"){
var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
url += document.getElementById("custid").value;

}
else if (menu == "Customer Orders History"){
var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
url += document.getElementById("custid2").value;
}
else if (menu == "All Customer"){
var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
}

//Checks that the object has returned data
objRequest.onreadystatechange = function()
{
if (objRequest.readyState == 4 && objRequest.status == 200)
{
var output = JSON.parse(objRequest.responseText);

if (menu == "Customer Orders"){
GenerateOutputGetOrders(output);
}
else if (menu == "Customer Orders History"){
GenerateOutputOrderHistory(output);
}
else if (menu == "All Customer"){
GenerateOutputAllCustomers(output);
}
}
}
//Initiate the server request
objRequest.open("GET", url, true);
objRequest.send();
}
function GenerateOutputAllCustomers(result)
{
var count = 0;
var displaytext = "<table><tr><th>#</th><th>Customer Name</th><th>ID</th><th>City</th></tr>"; 
//Loop to extract data from the response object
for (count = 0; count < result.GetAllCustomersResult.length; count++)
{
displaytext += "<tr><td>"+(count+1)+"</td><td>" + result.GetAllCustomersResult[count].CompanyName +"</td><td>"+result.GetAllCustomersResult[count].CustomerID + "</td><td>" + result.GetAllCustomersResult[count].City+ "</td></tr>";
}
result += "</table>";
document.getElementById("customerdisplay").innerHTML = displaytext;
}


function GenerateOutputOrderHistory(result)
{
var count = 0;
var displaytext = "<table><tr><th>#</th><th>Product Name</th><th>Quantity</th></tr>";  
//Loop to extract data from the response object
for (count = 0; count < result.length; count++)
{
displaytext +=  "<tr><td>"+(count+1)+"</td><td>"+result[count].ProductName+ "</td><td>"+result[count].Total+ "</td></tr>";
}
result += "</table>";
document.getElementById("customerorderdisplay").innerHTML = displaytext;
}


function GenerateOutputGetOrders(result)
{
var count = 0;
var displaytext = "<table><tr><th>#</th><th>Order Date</th><th>Order ID</th><th> Address</th><th> City</th><th>Name</th><th>Postal Code</th><th>Shipped Date</th></tr>"; 
//Loop to extract data from the response object
for (count = 0; count < result.GetOrdersForCustomerResult.length; count++)
{
displaytext += "<tr><td>"+(count+1)+"</td><td>"+result.GetOrdersForCustomerResult[count].OrderDate + "</td><td>" + result.GetOrdersForCustomerResult[count].OrderID +"</td><td>" + result.GetOrdersForCustomerResult[count].ShipAddress + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipName + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipPostcode + "</td><td>" + result.GetOrdersForCustomerResult[count].ShippedDate + "</td></tr>";
}
result += "</table>";
document.getElementById("orderdisplay").innerHTML = displaytext;
}

