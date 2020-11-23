let apiUrl = 'https://api.football-data.org/v2/';

const fetchApi = url => {
	return fetch(url, {
		'headers' : {
			'X-Auth-Token' : '478e64388e214101a69136cf06f89fe0'
		}
	});
}

const status = response => {
	if(response.status != 200) {
		console.log(`Error ${response.status}`);
		return Promise.reject(new Error(response.statusText));
	} else {
		return Promise.resolve(response);
	}
}

const json = response => {
	return response.json();
}

const error = error => {
	console.log(`Error : ${error}`);
}

const standingsTeam = team => {
	let html = `
		<tr>
			<td>${team.position}</td>
			<td>
				<a href="team.html?id=${team.team.id}">
					<img src="${team.team.crestUrl}" alt="${team.team.name}" class="responsive-img mw-30px" />
				</a>
			</td>
			<td>
				<a href="team.html?id=${team.team.id}">
					${team.team.name}
				</a>
			</td>
			<td>${team.playedGames}</td>
			<td>${team.won}</td>
			<td>${team.draw}</td>
			<td>${team.lost}</td>
			<td>${team.points}</td>
			<td class="hide-on-small-only">${team.goalsFor}</td>
			<td class="hide-on-small-only">${team.goalsAgainst}</td>
			<td class="hide-on-small-only">${team.goalDifference}</td>
		</tr>`;
	return html;
}

const favoriteTeam = team => {
	let html = `
		<tr>
			<td>
				<a href="team.html?id=${team.id}">
					<img src="${team.crestUrl}" alt="${team.name}" class="responsive-img mw-30px" />
				</a>
			</td>
			<td>
				<a href="team.html?id=${team.id}">
					${team.name}
				</a>
			</td>
		</tr>`;
	return html;
}


const renderSquad = squad => {
	let squadHtml = '';
	$.each(squad, (i, player) => {
		if(player.role === "PLAYER") {
			squadHtml += `
			<tr>
				<td>${player.name}</td>
				<td>${player.position}</td>
				<td>${player.nationality}</td>
			</tr>`;
		}
	});
	return squadHtml;
}


const renderTeam = data => {
	let teamHtml = `
		<div class="row">
			<div class="col s12 m5">
				<div class="row">
					<div class="col m12 s12">
						<div class="card">
							<div class="card-content p-0">
								<p align="center">
									<img src="${data.crestUrl}" alt="${data.name}" class="mw-100px responsive-img" />
								</p>
								<h4 align="center">
									${data.name}
								</h4>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col m12 s12">
						<div class="card">
							<div class="card-content p-0">
								<span class="card-title"><b>Info</b></span>
								<p>
									<table>
										<tr>
											<th>Alamat</th>
											<td>${data.address}</td>
										</tr>
										<tr>
											<th>Telepon</th>
											<td><a href="tel:${data.phone}">${data.phone}</a></td>
										</tr>
										<tr>
											<th>Situs Web</th>
											<td><a href="${data.website}">${data.website}</a></td>
										</tr>
										<tr>
											<th>Email</th>
											<td><a href="mailto:${data.email}">${data.email}</a></td>
										</tr>
										<tr>
											<th>Didirikan</th>
											<td>Tahun ${data.founded}</td>
										</tr>
										<tr>
											<th>Kandang</th>
											<td>${data.venue}</td>
										</tr>
									</table>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col s12 m7">
				<div class="card">
					<div class="card-content p-0">
						<span class="card-title"><b>Skuat</b></span>
						<div class="overflow-on-med-and-up">
							<table class="striped">
								<thead>
									<tr>
										<th>Nama Pemain</th>
										<th>Posisi</th>
										<th>Kebangsaan</th>
									</tr>
								</thead>
								<tbody>
									${renderSquad(data.squad)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>`;
		return teamHtml;
}



const getStandings = () => {
	if('caches' in window) {
		caches.match(`${apiUrl}competitions/2002/standings`)
		.then(response => {
			if(response) {
				response.json()
				.then(data => {
					let standingsHtml = "";
					$.each(data.standings[0].table, (i, team) => {
						standingsHtml += standingsTeam(team);
					});
					$('#standings').html(standingsHtml);
				})
			}
		})
	}

	fetchApi(`${apiUrl}competitions/2002/standings`)
	.then(status)
	.then(json)
	.then(data => {
		let standingsHtml = "";
		$.each(data.standings[0].table, (i, team) => {
			standingsHtml += standingsTeam(team);
		});
		$('#standings').html(standingsHtml);
	})
	.catch(error);
}


const getTeam = id => {
	return new Promise((resolve, reject) => {
		if('caches' in window) {
			caches.match(`${apiUrl}teams/${id}`)
			.then(response => {
				if(response) {
					response.json()
					.then(data => {
						let teamHtml = renderTeam(data);
						$('#content').html(teamHtml);
						resolve(data);
					})
				}
			})
		}

		fetchApi(`${apiUrl}teams/${id}`)
		.then(status)
		.then(json)
		.then(data => {
			let teamHtml = renderTeam(data);
			$('#content').html(teamHtml);
			resolve(data);
		})
		.catch(error);
	})
}


const getFavoriteTeams = () => {
	getAll()
	.then(data => {
		console.log(data)
		let teamHtml = "";
		if(data.length > 0) {
			$.each(data, (i, team) => {
				teamHtml += favoriteTeam(team);
			});
		} else {
			teamHtml = `
			<tr>
				<td colspan="2" align="center"> Tidak ada </td>
			</tr>`;
		}
		console.log(teamHtml);
		console.log($('#favorites').length);
		$('#favorites').html(teamHtml);
	});
}


const getFavoriteTeamById = id => {
	return new Promise((resolve, reject) => {
		getById(id)
		.then(data => {
			let teamHtml = renderTeam(data);
			$('#content').html(teamHtml);
			resolve(data);
		});
	})
}