import L from 'leaflet';
import busIconUrl from '../resources/bus_icon.png';
import trainIconUrl from '../resources/train_icon.png';
import tramIconUrl from '../resources/tram_icon.png';
import subwayIconUrl from '../resources/subway_icon.png';
import ferryIconUrl from '../resources/ferry_icon.png';
import expressIconUrl from '../resources/express_icon.png';
import suburbanIconUrl from '../resources/suburban_icon.png';

const busIcon = L.divIcon({
  html: `<div class="generic-icon"></div>`,
  iconUrl: busIconUrl,
  iconSize: [40, 40],
});

const trainIcon = L.divIcon({
  iconUrl: trainIconUrl,
  iconSize: [25, 25],
});

const tramIcon = L.divIcon({
  iconUrl: tramIconUrl,
  iconSize: [40, 20],
});

const subwayIcon = L.divIcon({
  iconUrl: subwayIconUrl,
  iconSize: [40, 40],
});

const ferryIcon = L.divIcon({
  iconUrl: ferryIconUrl, 
  iconSize: [40, 40],
});

const expressIcon = L.divIcon({
  iconUrl: expressIconUrl,
  iconSize: [40, 40],
});

const suburbanIcon = L.divIcon({
  iconUrl: suburbanIconUrl,
  iconSize: [32, 32],
});


function getIcon(subtype) {
  switch (subtype) {
    case "suburban":
      return suburbanIcon;
    case "subway":
      return subwayIcon;
    case "tram":
      return tramIcon;
    case "bus":
      return busIcon;
    case "ferry":
      return ferryIcon;
    case "express":
      return expressIcon;
    case "regional":
      return trainIcon;
    default:
      return busIcon;
  }
}

export default getIcon;
