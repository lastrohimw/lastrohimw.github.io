let dbPromised = idb.open("football", 1, upgradeDb => {
	let articleObjectStore = upgradeDb.createObjectStore("team", {keyPath: 'id'});
})

const addToFavorite = team => {
	dbPromised
	.then(db => {
		let tx = db.transaction("team", "readwrite");
		let store = tx.objectStore("team");
		console.log(team);
		store.put(team);
		return tx.complete;
	})
	.then(() => {
		console.log("Team berhasil di tambahkan ke favorit.");
	});
}

const getById = id => {
	return new Promise((resolve, reject) => {
		dbPromised
		.then(db => {
			let tx = db.transaction("team", "readonly");
			let store = tx.objectStore("team");
			return store.get(id);
		})
		.then(team => {
			resolve(team);
		})
	})
}

const remove = id => {
	dbPromised
	.then(db => {
		let tx = db.transaction("team", "readwrite");
		let store = tx.objectStore("team");
		console.log(id);
		store.delete(id);
		return tx.complete;
	})
	.then(() => {
		console.log("Berhasil di hapus dari favorit.");
	});
}


const getAll = () => {
	return new Promise((resolve, reject) => {
		dbPromised
		.then(db => {
			let tx = db.transaction("team", "readonly");
			let store = tx.objectStore("team");
			return store.getAll();
		})
		.then(teams => {
			resolve(teams);
		})
	})
}