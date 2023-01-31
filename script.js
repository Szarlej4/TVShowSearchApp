const form = document.querySelector("form");
const input = form.elements.query;
const results = document.querySelector(".results");
const loading = document.querySelector(".loading");
const noResults = document.querySelector(".noResults");

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	deleteShows();
	if (!noResults.classList.contains("hidden")) {
		switchNoResultsVisibility();
	}
	switchLoadingVisibility();
	const response = await getData(input.value);
	const data = response.data;
	if (!isEmpty(data)) {
		for (let show of data) {
			const name = show.show.name;
			console.log(name);
			const thumbnail = show.show.image?.medium || null;
			results.append(createShow(name, thumbnail));
		}
	} else {
		switchNoResultsVisibility();
	}
	switchLoadingVisibility();
	resetInput();
});

const resetInput = () => {
	input.value = "";
};

const getData = (queue) => {
	return axios.get(`https://api.tvmaze.com/search/shows?q=${queue}`);
};

const isEmpty = (array) => {
	return array.length === 0;
};

const createShowThumbnail = (name, src) => {
	const img = new Image();
	if (src) {
		img.src = src;
		img.alt = `${name} show thumbnail`;
	} else {
		img.src = "noImageAvailable.svg";
		img.alt = "no thumbnail";
	}
	img.classList.add("thumbnail");
	return img;
};

const createShowTitle = (title) => {
	const showTitle = document.createElement("h3");
	showTitle.classList.add("showName");
	showTitle.innerText = title;
	return showTitle;
};

const switchNoResultsVisibility = () => {
	noResults.classList.toggle("hidden");
};

const deleteShows = () => {
	const shows = document.querySelectorAll(".showContainer");
	shows.forEach((show) => {
		show.remove();
	});
};

const createShow = (title, src) => {
	const showContainer = document.createElement("div");
	showContainer.classList.add("showContainer");
	const name = createShowTitle(title);
	const image = createShowThumbnail(title, src);
	showContainer.append(image, name);
	return showContainer;
};

const switchLoadingVisibility = () => {
	loading.classList.toggle("hidden");
};
