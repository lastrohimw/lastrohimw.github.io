$(function () {

	const init = async() => {
		let urlParams = new URLSearchParams(window.location.search);
		let teamId = parseInt(urlParams.get('id'));
		let isSaved;
		let team;

		await getById(teamId).
		then(dataTeam => {
			console.log(dataTeam);
			if (dataTeam === undefined || dataTeam === "" || dataTeam === null) {
				isSaved = false;
			} else {
				isSaved = true;
			}
		})

		console.log(isSaved);
		if (isSaved) {
			team = getFavoriteTeamById(teamId)
			$('#save').find('i').html('favorite');
			$('#save').attr('data-saved', true);
		} else {
			team = getTeam(teamId);
			$('#save').find('i').html('favorite_border');
			$('#save').attr('data-saved', false);
		}


		$('#save').on('click', function () {
			let isSaved = $(this).attr('data-saved');

			if (isSaved == 'true') {
				$('#save').find('i').html('favorite_border');
				$(this).attr('data-saved', false);
				team.then(teamData => {
					console.log(teamData);
					remove(teamData.id);
				})
				M.toast({html: 'Dihapus dari favorit!'})
			} else {
				team.then(teamData => {
					console.log(teamData);
					addToFavorite(teamData);
				})
				$('#save').find('i').html('favorite');
				$(this).attr('data-saved', true);
				M.toast({html: 'Ditambah ke favorit!'})
			}
		})

	}

	init();
})