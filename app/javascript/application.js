// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import * as bootstrap from "bootstrap"

// import { Fancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener('scroll', updateSplitImages);

function updateSplitImages() {
	let num = (window.scrollY/window.innerHeight)*16;

	if (num < 10) {
		document.getElementById('floating-logo').style.transform = 'scale(' + (1 - num / 100) + ')'
		document.getElementById('bg_image').style.transform = 'translateX(-50%) scale(' + (1 - num / 100) + ')'
		document.getElementById('bg_image').style.webkitFilter = 'blur(' + num + 'px) brightness(' + (1 - (num / 15)) + ')'
	}
}

//document.addEventListener("turbo:load", updateSpacerHeight);
//document.addEventListener("load", updateSpacerHeight);
//window.addEventListener("resize", updateSpacerHeight);
//function updateSpacerHeight() {
//  const image = document.getElementById("bg_image");
//  const spacer = document.getElementById("dynamic_spacer");
//  if (image.offsetHeight === 0)
//    spacer.style.height = `65vw`;
//    else
//    spacer.style.height = `${image.offsetHeight * 0.75}px`;
//}

function getAverageColor(img) {
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');

	canvas.width = img.width;
	canvas.height = img.height;
	context.drawImage(img, 0, 0, img.width, img.height);

	const imageData = context.getImageData(0, 0, img.width, img.height);
	const data = imageData.data;
	let r = 0, g = 0, b = 0;

	for (let i = 0; i < data.length; i += 4) {
		r += data[i];
		g += data[i + 1];
		b += data[i + 2];
	}

	const pixelCount = data.length / 4;
	r = Math.floor(r / pixelCount);
	g = Math.floor(g / pixelCount);
	b = Math.floor(b / pixelCount);

	return { r, g, b };
}

document.addEventListener("turbo:load", () => {
	const galleries = document.querySelectorAll('.masonry');
	initMasonry(galleries);
	const collapseGalleries = document.querySelectorAll('.masonry.collapse');

	collapseGalleries.forEach((gallery) => {
		gallery.addEventListener('shown.bs.collapse', () => { initMasonry([gallery]); });
	});
});

function initMasonry(galleries) {
	galleries.forEach((gallery) => {
		imagesLoaded(gallery, () => {
			new Masonry(gallery, {
				itemSelector: '.col',
				percentPosition: true
			});
		});
	});
};

window.notify = function(type = "notice", message, duration = 5000) {
  let container = document.getElementById("notification-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "notification-container";
    const wrapper = document.querySelector("main.wrapper");
    if (wrapper) {
      wrapper.insertBefore(container, wrapper.firstChild);
    } else {
      document.body.appendChild(container);
    }
  }

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  container.appendChild(notification);

  // Trigger fade-in on next animation frame
  requestAnimationFrame(() => {
    notification.classList.add("visible");
  });

  // After duration, fade out
  setTimeout(() => {
    notification.classList.remove("visible");
    notification.classList.add("fade-out");

    // Wait for transition to finish before removing element
    notification.addEventListener("transitionend", () => {
      notification.remove();
      if (container.children.length === 0) {
        container.remove();
      }
    }, { once: true });
  }, duration);
};
