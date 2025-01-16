const buttonID = `${chrome.runtime.id}_youtube_open_button`;

const onURLChanged = () => {
	document.getElementById(buttonID)?.remove();
	if (location.href.match(/youtube\.com\/watch\?v=/)) {
		const videoID = location.href.match(/\?v=([^\&]+)/)?.[1];
		const button = document.createElement("button");
		button.id = buttonID;
		button.innerHTML = "open";
		button.style.cssText = `
			position: absolute;
			top: 8px;
			left: 200px;
			width: 32px;
			height: 32px;
			background: #f00;
			z-index: 9999;
		`;
		const currentTime = Math.floor(document.getElementsByTagName("video")?.[0]?.currentTime) ?? 0;
		button.addEventListener("click", () => {
			document.getElementsByTagName("video")?.[0]?.pause();
			open(`https://www.youtube.com/embed/${videoID}?autoplay=1&start=${currentTime}`, "", "width=640,height=506");
		});
		document.body.append(button);
	}
}

onURLChanged();
chrome.runtime.onMessage.addListener(() => {
	onURLChanged();
});
