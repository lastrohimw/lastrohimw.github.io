const loadNav = () => {
	$.get({
		url: 'json/nav.json',
		dataType: 'json',
		success: async res => {
			if (res.length > 0) {
				await $.each(res, (index, data) => {
					addNavItem(data);
				})
				await pageLinkEvent();
			}
		}
	})
}

const clearNav = () => {
	$('.sidenav').find('.top-sidenav').siblings('li').remove();
}

const addNavItem = data => {
	let html = `
		<li><a class="waves-effect page-link" href="${data.href}">${data.title}</a></li>`;
	$('.sidenav').append(html);
	$('.topnav').append(html);
}

const pageLinkEvent = () => {
	$('.page-link').on('click', () => {
		setTimeout(() => {
			let page = window.location.hash.substr(1);
			if (page === '') {
				page = 'standings';
			}
			loadPage(page)
			.then(() => {
				if (page === 'standings') {
					getStandings();

					$('#save').hide();
				} else {
					console.log($('#favorites').length);
					getFavoriteTeams();
				}
				$('#nav').html(`
					<span class="hamburger-slice"></span>
					<span class="hamburger-slice"></span>
					<span class="hamburger-slice"></span>`);
				$('#nav').attr('href', '#');
				$('#nav').attr('class', 'hamburger-nav sidenav-trigger show-on-medium');
				$('#nav').attr('data-target', 'sidenav');
				console.log('change');
			});
		}, 200)
	})
}

const loadPage = async page => {
	await $.get({
		url: `pages/${page}.html`,
		success: res => {
			$('#content').html(res);
			pageLinkEvent();
		},
		error: res => {
			$('#content').html = `<p align="center">Laman tidak ditemukan</p>`;
		}
	})
}


const initSideNav = () => {
	$('#sidenav').sidenav();
}

$(function(){
	clearNav();
	loadNav();
	pageLinkEvent();
	initSideNav();
})