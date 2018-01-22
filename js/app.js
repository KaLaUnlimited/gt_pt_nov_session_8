var db = firebase.database();
var movie_ref = db.ref('movies');


movie_ref
	.orderByChild('date')
	// .equalTo('2000')
	.startAt('2000')
	.endAt('2018')
	.once('value')
	.then(function(movie) {
	console.log(movie.val());
});


function addMovie(event) {
	event.preventDefault();
	// return false;
	var title = $('#title').val().trim();
	var date = $('#date').val().trim();

	movie_ref.push({
		title: title,
		date: date
	});

	$('form input').val('');
}

function addMovieToDOM(movie) {
	$('table tbody').append(`
		<tr data-key="${movie.key}">
			<td>${movie.val().title}</td>
			<td>${movie.val().date}</td>
			<td>
				<button class="update">Update</button>
			</td>
		</tr>
	`);
}

function updateItem(key) {
	var title = $('#title').val().trim();
	var date = $('#date').val().trim();

	movie_ref.child(key).set({
		title: title,
		date: date
	});

	$(`tr[data-key="${key}"]`).after(`
		<tr data-key="${key}">
			<td>${title}</td>
			<td>${date}</td>
			<td>
				<button class="update">Update</button>
			</td>
		</tr>
	`).remove();

	$('form input').val('');
	$('#cancel').hide();
	$('#save').unbind().on('click', addMovie);
}

function getItemData(event) {
	event.preventDefault();
	var key = $(this).parents('tr').data('key');

	movie_ref.child(key).once('value').then(function(movie) {
		$('#title').val(movie.val().title);
		$('#date').val(movie.val().date);
	});
	
	$('#save').unbind().on('click', function(event) {
		event.preventDefault();
		updateItem(key);
	});
	$('#cancel').show();
}

function init() {
	movie_ref.on('child_added', addMovieToDOM);
	$(document).on('click', '.update', getItemData);
	$('#save').on('click', addMovie);
}

init(); // Starting the App





// function test(some_string) {
// 	console.log(some_string);
// }
// test('some value')



















// movie_ref.push({
// 	title: 'bob',
// 	age: 38
// });


// movie_ref.child('-L3Pt7r7KCjBIOPWgsQ0').on('value', function(snapshot) {
// 	console.log(snapshot.val());
// })