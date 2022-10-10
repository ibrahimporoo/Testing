const bookForm =  document.getElementById("book-form");
const outputList =  document.getElementById("output-list");

document.addEventListener("DOMContentLoaded", getBookmarks)

bookForm.addEventListener("submit", saveBookmark);

function saveBookmark(e) {
	e.preventDefault();

	let siteName = document.getElementById("site-name").value
	let siteUrl = document.getElementById("site-url").value

	if(!validateForm(siteName, siteUrl)) {
		return false
	}

	document.getElementById('book-form').reset()

	let bookmark = {
		name: siteName,
		siteUrl: siteUrl
	}


	if (localStorage.getItem("bookmarks") === null) {
		let bookmarks = [];
		bookmarks.push(bookmark)
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
	} else {
		let bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
		bookmarks.push(bookmark);
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
	}
	getBookmarks()
}

function deleteBookmark(url) {
	const allBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
	const filteredBookmarks = allBookmarks.filter(bookmark => {
		return bookmark.siteUrl !== url;
	})
	localStorage.removeItem('bookmarks')
	localStorage.setItem('bookmarks', JSON.stringify(filteredBookmarks))
	getBookmarks();
}

function getBookmarks() {
	const allBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
	outputList.innerHTML = '';
	if(localStorage.getItem("bookmarks") !== null) {
		allBookmarks.map((bookmark) => {
			let html = `<article class="bookmark">
				<p class="name">${bookmark.name}</p>
				<div class="btns">
					<a class='btn btn-visit' href=${bookmark.siteUrl} target="_blank">visit</a>
					<button class='btn btn-delete' onclick="deleteBookmark('${bookmark.siteUrl}')" >delete</button>
				</div>
			</article>`
			outputList.innerHTML += html;
		})
	} else {
		outputList.innerHTML += "";
	}
}


function validateForm(siteName, siteUrl) {
	if(!siteName || !siteUrl) {
		alert("Please Enter what in the form")
		return false
	}

	let expression = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i
	let regex = new RegExp(expression)

	if (!siteUrl.match(regex)) {
		alert("Enter a Valide URL");
		return false
	}

	let resultOfReturn = true;
	if (localStorage.getItem("bookmarks") !== null) {
		JSON.parse(localStorage.getItem('bookmarks')).forEach(element => {
			if (element.siteUrl === siteUrl) {
				resultOfReturn = false;
			}
		});
		if (!resultOfReturn) {
			alert("This Site is Already in You Bookmark.")
		}
	}
	return resultOfReturn
}