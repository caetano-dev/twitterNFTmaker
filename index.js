const fileInput = document.getElementById('file-input')

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const svgElement = document.getElementById('svg');
const { width: hexagonWidth, height: hexagonHeight } = svgElement.getBBox();
const clonedSvgElement = svgElement.cloneNode(true);
const outerHTML = clonedSvgElement.outerHTML;
const blob = new Blob([outerHTML], { type: 'image/svg+xml;charset=utf-8' });
const URL = window.URL || window.webkitURL || window;
const blobURL = URL.createObjectURL(blob);
const hexagon = new Image();
hexagon.src = blobURL;

fileInput.addEventListener('change', (e) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    const image = new Image();

    image.onload = () => {
      const MAX_WIDTH = 400;
      const MAX_HEIGHT = 400;

      let width = image.width;
      let height = image.height;

      let positionx = 0;
      let positiony = 0;
      
      canvas.width = MAX_WIDTH;
      canvas.height = MAX_HEIGHT;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height = height * (MAX_WIDTH / width);
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width = width * (MAX_HEIGHT / height);
          height = MAX_HEIGHT;
        }
      }

      if (height < MAX_HEIGHT) {
        positiony = (MAX_HEIGHT - height) / 2
      } 

      if (width < MAX_WIDTH) {
        positionx = (MAX_WIDTH - width) / 2
      }

      if (height < MAX_HEIGHT && width < MAX_WIDTH) {
        width = MAX_WIDTH
        height = MAX_HEIGHT
        positiony = 0
        positionx = 0
      }

      ctx.drawImage(image, positionx, positiony, width, height);
      ctx.globalCompositeOperation = 'destination-atop';
      ctx.drawImage(hexagon, 5, 27, hexagonWidth, hexagonHeight);

      console.log(width, height)
      console.log(hexagonWidth, hexagonHeight)

      svgElement.remove()

      let nft = canvas.toDataURL();
      let link = document.createElement('a');
      link.download = 'image-nft.png';
      link.style.opacity = "0";

      document.body.append(link);

      link.href = nft;
      link.click();
      link.remove();
    }

    image.src = event.target.result;
  }

  console.log(e.target.files);

  reader.readAsDataURL(e.target.files[0]);

}, false)
