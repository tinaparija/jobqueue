// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

db.Mood.remove({}, function(err, moods){
	db.Song.remove({}, function (err, songs) {
		moods_list.forEach(function(moods) {
			db.Song.create(moods.songs, function (err, savedSongs) {
				moods.songs = savedSongs;
				db.Mood.create(moods, function (err, savedList){
					console.log("saved list", savedList.name)
				});
			});
		});
	});
});
