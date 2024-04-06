import L from 'leaflet';

import busIconGrayUrl from '../resources/bus_icon_gray.png';
import busIconGreenUrl from '../resources/bus_icon_green.png';
import busIconOrangeUrl from '../resources/bus_icon_orange.png';
import busIconRedUrl from '../resources/bus_icon_red.png';
import trainIconGrayUrl from '../resources/train_icon_gray.png';
import trainIconGreenUrl from '../resources/train_icon_green.png';
import trainIconOrangeUrl from '../resources/train_icon_orange.png';
import trainIconRedUrl from '../resources/train_icon_red.png';
import tramIconGrayUrl from '../resources/tram_icon_gray.png';
import tramIconGreenUrl from '../resources/tram_icon_green.png';
import tramIconOrangeUrl from '../resources/tram_icon_orange.png';
import tramIconRedUrl from '../resources/tram_icon_red.png';
import subwayIconGrayUrl from '../resources/subway_icon_gray.png';
import subwayIconGreenUrl from '../resources/subway_icon_green.png';
import subwayIconOrangeUrl from '../resources/subway_icon_orange.png';
import subwayIconRedUrl from '../resources/subway_icon_red.png';
import ferryIconGrayUrl from '../resources/ferry_icon_gray.png';
import ferryIconGreenUrl from '../resources/ferry_icon_green.png';
import ferryIconOrangeUrl from '../resources/ferry_icon_orange.png';
import ferryIconRedUrl from '../resources/ferry_icon_red.png';
import expressIconGrayUrl from '../resources/express_icon_gray.png';
import expressIconGreenUrl from '../resources/express_icon_green.png';
import expressIconOrangeUrl from '../resources/express_icon_orange.png';
import expressIconRedUrl from '../resources/express_icon_red.png';
import suburbanIconGrayUrl from '../resources/suburban_icon_gray.png';
import suburbanIconGreenUrl from '../resources/suburban_icon_green.png';
import suburbanIconOrangeUrl from '../resources/suburban_icon_orange.png';
import suburbanIconRedUrl from '../resources/suburban_icon_red.png';

// Updated icon function that uses the color parameter
const busIcon = (color) => {
  let url;
  switch(color) {
    case 'gray':
      url = busIconGrayUrl;
      break;
    case 'green':
      url = busIconGreenUrl;
      break;
    case 'orange':
      url = busIconOrangeUrl;
      break;
    case 'red':
      url = busIconRedUrl;
      break;
  }
  return L.icon({
    iconUrl: url,
    iconSize: [50, 50],
    className: ""
  });
};

const trainIcon = (color) => {
  let url;
  switch(color) {
    case 'gray':
      url = trainIconGrayUrl;
      break;
    case 'green':
      url = trainIconGreenUrl;
      break;
    case 'orange':
      url = trainIconOrangeUrl;
      break;
    case 'red':
      url = trainIconRedUrl;
      break;
  }
  return L.icon({
    iconUrl: url,
    iconSize: [50, 50],
    className: ""
  });
};

const tramIcon = (color) => {
  let url;
  switch(color) {
    case 'gray':
      url = tramIconGrayUrl;
      break;
    case 'green':
      url = tramIconGreenUrl;
      break;
    case 'orange':
      url = tramIconOrangeUrl;
      break;
    case 'red':
      url = tramIconRedUrl;
      break;
  }
  return L.icon({
    iconUrl: url,
    iconSize: [50, 50],
    className: ""
  });
};

const subwayIcon = (color) => {
  let url;
  switch(color) {
    case 'gray':
      url = subwayIconGrayUrl;
      break;
    case 'green':
      url = subwayIconGreenUrl;
      break;
    case 'orange':
      url = subwayIconOrangeUrl;
      break;
    case 'red':
      url = subwayIconRedUrl;
      break;
  }
  return L.icon({
    iconUrl: url,
    iconSize: [50, 50],
    className: ""
  });
};

const ferryIcon = (color) => {
  let url;
  switch(color) {
    case 'gray':
      url = ferryIconGrayUrl;
      break;
    case 'green':
      url = ferryIconGreenUrl;
      break;
    case 'orange':
      url = ferryIconOrangeUrl;
      break;
    case 'red':
      url = ferryIconRedUrl;
      break;
  }
  return L.icon({
    iconUrl: url,
    iconSize: [50, 50],
    className: ""
  });
};

const expressIcon = (color) => {
  let url;
  switch(color) {
    case 'gray':
      url = expressIconGrayUrl;
      break;
    case 'green':
      url = expressIconGreenUrl;
      break;
    case 'orange':
      url = expressIconOrangeUrl;
      break;
    case 'red':
      url = expressIconRedUrl;
      break;
  }
  return L.icon({
    iconUrl: url,
    iconSize: [50, 50],
    className: ""
  });
};

const suburbanIcon = (color) => {
  let url;
  switch(color) {
    case 'gray':
      url = suburbanIconGrayUrl;
      break;
    case 'green':
      url = suburbanIconGreenUrl;
      break;
    case 'orange':
      url = suburbanIconOrangeUrl;
      break;
    case 'red':
      url = suburbanIconRedUrl;
      break;
  }
  return L.icon({
    iconUrl: url,
    iconSize: [50, 50],
    className: ""
  });
};


export function getIcon(subtype, color) {
  switch (subtype) {
    case "suburban":
      return suburbanIcon(color);
    case "subway":
      return subwayIcon(color);
    case "tram":
      return tramIcon(color);
    case "bus":
      return busIcon(color);
    case "ferry":
      return ferryIcon(color);
    case "express":
      return expressIcon(color);
    case "regional":
      return trainIcon(color);
    default:
      return busIcon(color);
  }
}

export function getColor(products) {
  if (products.suburban) {
    return "green";
  } else if (products.subway) {
    return "red";
  } else if (products.tram) {
    return "blue";
  } else if (products.suburban) {
    return "yellow";
  } else if (products.ferry) {
    return "purple";
  } else {
    return "black";
  }
}
