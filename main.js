//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
	//GEt form values
	var siteName = document.getElementById('siteName').value;
	var siteURL = document.getElementById('siteURL').value;
	
	if(!validateForm(siteName,siteURL)){
		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteURL
	}

	/*
	localStorage.setItem('test', 'hello wod');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));

	*/

	if(localStorage.getItem('bookmarks') === null){
		//Init array
		var bookmarks = [];
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	}
	else
	{
		//get book marks from local storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//modify
		bookmarks.push(bookmark);
		//save
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	//clear form
	document.getElementById('myForm').reset();

	//without refresh
	fetchBookmarks();

	//prevent form from submitting
	e.preventDefault();
}

//delete bookmarks
function deleteBookmark(url){
	//get bookmarks from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	for (var i = 0; i < bookmarks.length; i++) {
		if(bookmarks[i].url == url)
		{
			bookmarks.splice(i,1);
		}
	}
	//save (reset)
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	//without refresh
	fetchBookmarks();
}	

//fetch bookmarks
function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//Get output id
	var bookmarksResults = document.getElementById('bookmarksResults');

	//Build output
	bookmarksResults.innerHTML = '';

	for(var i=0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well">'+
									   '<h3>'+name+
									   ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> '+
									   ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Remove</a> '
									   '</h3>'+
									   '</div>';
	}
	
}

//validate form
function validateForm(siteName,siteURL){
	if(!siteName || !siteURL){
		alert("please fill in the form");
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteURL.match(regex)){
		alert("Please use a valid URL!");
		return false;
	}
	return true;
}