let lastData = [];
let WebsiteData = [];
let previewingWebsite=function(){console.log('Your In Preview Mode, You Can Not Play Background Music For The Preview.')}
function download(data,name) {
		var a = document.createElement("a");
		a.download = name;
		a.href = data;
		a.click();
}

//tabs
let tabs = [
	document.getElementById("website"),
	document.getElementById("files"),
	document.getElementById("info")
]
document.getElementById("websiteTab").onclick = function () {
	switchTab(0);
};
document.getElementById("filesTab").onclick = function () {
	switchTab(1);
};
document.getElementById("infoTab").onclick = function () {
	switchTab(2);
};

//switch tabs
function switchTab(tabId) {
	var i = 0;
	while (i < tabs.length) {
		tabs[i].style.display = "none";
		i += 1;
	}
	tabs[tabId].style.display = "block";
}

//website Window
let mouseX = 0,mouseY = 0,mouseDown = false;
document.getElementById("website").onmousemove = function (event) {
	mouseX = event.x;
	mouseY = event.y;
}
document.getElementById("website").onmousedown = function (event) {
	mouseDown = true;
}
document.getElementById("website").onmouseup = function (event) {
	mouseDown = false;
}
function addelement(type) {
	let elmt = document.createElement(type);
	elmt.style.fontFamily = document.getElementById("Font").value;
	if (type == "a") {
		elmt.innerHTML = window.prompt("The Links Text","my Link");
		elmt.href = window.prompt("The Link","https://");
		elmt.style.color = "blue";
		elmt.style.textDecoration = "underline";
	}
	if (type == "div") {
		elmt.innerHTML = window.prompt("HTML:","<p>Text</p>");
	}
	if (type == "script") {
		elmt.innerHTML = window.prompt("JS Script:","window.alert('yay!')");
	}
	if (type == "button") {
		elmt.innerHTML = window.prompt("The Buttons Text","My Button");
		elmt.onclick = window.prompt("JS","window.alert('Hello World!');");
	}
	if (type == "h1") {
		elmt.innerHTML = window.prompt("Text:","My Header");
	}
	if (type == "p") {
		elmt.innerHTML = window.prompt("Text:","My Text");
	}
	if (type == "iframe") {
		elmt.src = window.prompt("Link","https://");
		elmt.width = 480;
		elmt.height = 360;
	}
	if (type == "audio") {
		try{ elmt.src = files[document.getElementById("FileSelector").value].dataURL; }catch(e) {
			setTimeout(function () {
				document.getElementById("Undo").click();
			},1)
		}
		elmt.controls = true;
	}
	if (type == "video") {
		try{ elmt.src = files[document.getElementById("FileSelector").value].dataURL; }catch(e) {
			setTimeout(function () {
				document.getElementById("Undo").click();
			},1)
		}
		elmt.controls = true;
		elmt.style.maxWidth = "900px";
		elmt.style.maxHeight = "900px";
	}
	if (type == "img") {
		elmt.style.maxWidth = "900px";
		elmt.style.maxHeight = "900px";
		try{ elmt.src = files[document.getElementById("FileSelector").value].dataURL; }catch(e) {
			setTimeout(function () {
				document.getElementById("Undo").click();
			},1)
		}
	}
	if (type == "bgm") {
		try{ elmt = document.createElement("script"); elmt.innerHTML = "try{previewingWebsite()}catch(e){bgm = document.createElement('audio');bgm.src='"+files[document.getElementById("FileSelector").value].dataURL+"';loop=function(){bgm.play();setTimeout(loop,1);};setTimeout(loop,1);}"; }catch(e) {
			setTimeout(function () {
				document.getElementById("Undo").click();
			},1)
		}
	}
	elmt.ondragstart = function(){return false;};
	elmt.onselectstart = function(){return false;};
	WebsiteData.push(elmt);
	return elmt;
}
document.getElementById("AddElement").onclick = function () {
	lastData.push({
		web:document.getElementById("currentWebsite").innerHTML,
		data: WebsiteData
	});
	var Element = addelement(document.getElementById("Element").value);
	document.getElementById("currentWebsite").appendChild(Element);
};
document.getElementById("Undo").onclick = function () {
	try {
		document.getElementById("currentWebsite").innerHTML = lastData[lastData.length - 1].web;
		WebsiteData = lastData[lastData.length - 1].data;
		delete lastData[lastData.length - 1];
	}catch(e){}
};
document.getElementById("pgColor").oninput = function () {
	document.getElementById('centerPage').style.backgroundColor = document.getElementById("pgColor").value;
};

//File Importer
let filetypesIMG = [
	"png",
	"jpg",
	"gif",
	"ico",
	"svg",
	"bmp"
]
let filetypesAUD = [
	"mp3",
	"wav",
	"ogg"
]
let filetypesVID = [
	"avi",
	"mp4",
	"webm"
]
let currentFile = {
	name:"undefined.txt",
	dataURL:"data:text/txt,"
};
document.getElementById("fileimport").accept ="."+filetypesIMG.concat(filetypesAUD.concat(filetypesVID)).join(",.");
let files = [];
let filenames = [];
let filedata = [];
function addFilesByArray(fls) {
	var i = 0;
	document.getElementById("FileSelect2").innerHTML = "";
	document.getElementById("FileSelect").innerHTML = "";
	document.getElementById("ImportedFiles").innerHTML = "";
	while (i < fls.length) {
		addFile(fls[i].dataURL,fls[i].name)
		i += 1;
	}
}
function addFile(url,name) {
	filetype = name.toLowerCase().split('.').pop();
	fileIsAudio = (filetypesAUD.indexOf(filetype) > -1);
	fileIsImage = (filetypesIMG.indexOf(filetype) > -1);
	fileIsVideo = (filetypesVID.indexOf(filetype) > -1);
	filename = name.split('.').slice(0, name.split('.').length -1).join(".");
	
	fileoption = document.createElement("option");
	fileoption.value = filename;
	fileoption.innerHTML = filename;
	document.getElementById("FileSelect").appendChild(fileoption);
	fileoption = document.createElement("option");
	fileoption.value = filename;
	fileoption.innerHTML = filename;
	document.getElementById("FileSelect2").appendChild(fileoption);
	
	if (fileIsAudio || fileIsImage || fileIsVideo) {
		var div = document.createElement("div");
		div.name = filename
		files[name.split('.')[0]] = {
			dataURL: url,
			name:filename
		}
		filedata.push({
			dataURL: url,
			name:name
		});
		filenames.push(filename);
		div.innerHTML = filename;
		if (fileIsAudio) {
			var audio = document.createElement("audio");
			audio.controls = true;
			audio.volume = 1;
			audio.src = url;
			div.appendChild(audio);
		}
		if (fileIsImage) {
			var img = document.createElement("img");
			img.src = url;
			img.style.maxWidth = "400px";
			img.style.maxHeight = "400px";
			div.appendChild(img);
		}
		if (fileIsVideo) {
			var video = document.createElement("video");
			video.src = url;
			video.style.maxWidth = "400px";
			video.style.maxHeight = "400px";
			video.controls = true;
			div.appendChild(video);
		}
		document.getElementById("ImportedFiles").appendChild(div);
	} else {
		window.alert("File type Is Not Supported!!");
	}
	
}
function fileImported(el) {
	const reader = new FileReader();
	reader.onload = function(evt) {
		currentFile = {
			name:el.files[0].name,
			dataURL:evt.target.result
		};
		addFile(evt.target.result,el.files[0].name);
	};
	reader.readAsDataURL(el.files[0]);
}

//info tab

document.getElementById("exportHTML").onclick = function () {
	var favicon = "";
	if (files[document.getElementById("favicon").value]) {
		favicon = files[document.getElementById("favicon").value].dataURL;
	}
	download(websiteToHTMLBlob({
		favicon:favicon,
		title:document.getElementById("title").value,
		code:document.getElementById("currentWebsite").innerHTML,
		color:document.getElementById("pgColor").value
	}),document.getElementById("title").value);
}
document.getElementById("exportHTA").onclick = function () {
	var favicon = "";
	if (files[document.getElementById("favicon").value]) {
		favicon = files[document.getElementById("favicon").value].dataURL;
	}
	var confirmed = window.confirm("some things won't be compadible with the converted data.")
	if (confirmed) {
		download(websiteToHTMLBlob({
			favicon:favicon,
			title:document.getElementById("title").value,
			code:document.getElementById("currentWebsite").innerHTML,
			color:document.getElementById("pgColor").value
		}),document.getElementById("title").value + ".hta");
	}
}
document.getElementById("save").onclick = function () {
	download(websiteToJSON(),document.getElementById("title").value + ".gwmf");
}
document.getElementById("load").onclick = function () {
	document.getElementById("loadfile").click();
}

function fileLoaded(el) {
	const reader = new FileReader();
	reader.onload = function(evt) {
		JSONtoWebsite(evt.target.result);
	};
	reader.readAsText(el.files[0]);
}