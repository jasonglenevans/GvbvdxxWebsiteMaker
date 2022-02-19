function websiteToHTMLBlob(options) {
	var htmlcode = "<!DOCTYPE HTML>\n<link rel='icon' href='"+options.favicon+"'>\n<title>"+options.title+"</title>\n<html style='background-color:"+options.color+";'><center>\n"+options.code+"\n</center></html>";
	return URL.createObjectURL(new Blob([htmlcode], {type: 'text/html'}));
}
function websiteToJSON() {
	var data = JSON.stringify({
		fls:filedata,
		html:document.getElementById("currentWebsite").innerHTML,
		title:document.getElementById("title").value,
		color:document.getElementById("pgColor").value,
		favicon:document.getElementById("favicon").value
	});
	return URL.createObjectURL(new Blob([data], {type: 'text/json'}));
}
function JSONtoWebsite(data) {
	try {
	addFilesByArray(JSON.parse(data).fls);
	document.getElementById("currentWebsite").innerHTML = JSON.parse(data).html;
	document.getElementById("title").value = JSON.parse(data).title;
	document.getElementById("pgColor").value = JSON.parse(data).color;
	document.getElementById('centerPage').style.backgroundColor = JSON.parse(data).color;
	try { document.getElementById("favicon").value = JSON.parse(data).favicon} catch(e){ }
	} catch(e) {
		window.alert("there was an error when loading the file, please \ncontact gvbvdxx for more info.");
	}
}