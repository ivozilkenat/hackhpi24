import L from 'leaflet';
import busIconUrl from '../resources/bus_icon.png';
import trainIconUrl from '../resources/train_icon.png';
import tramIconUrl from '../resources/tram_icon.png';
import subwayIconUrl from '../resources/subway_icon.png';
import ferryIconUrl from '../resources/ferry_icon.png';
import expressIconUrl from '../resources/express_icon.png';
import suburbanIconUrl from '../resources/suburban_icon.png';

const busIcon = L.icon({
  iconUrl: busIconUrl,
  iconSize: [40, 40],
});

const trainIcon = L.icon({
  iconUrl: trainIconUrl,
  iconSize: [25, 41],
});

const tramIcon = L.icon({
  iconUrl: tramIconUrl,
  iconSize: [25, 41],
});

const subwayIcon = L.icon({
  iconUrl: subwayIconUrl,
  iconSize: [25, 41],
});

const ferryIcon = L.icon({
  iconUrl: suburbanIconUrl,
  iconSize: [25, 41],
});

const expressIcon = L.icon({
  iconUrl: expressIconUrl,
  iconSize: [25, 41],
});

const suburbanIcon = L.icon({
  iconUrl: ferryIconUrl,
  iconSize: [25, 41],
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
