from typing import Dict, List
from models import trafficDataItem, station, core

trafficDataDict: Dict[str, trafficDataItem.TrafficDataItem] = dict()
stationDataDict: Dict[str, station.StationDataItem] = dict()


# Example traffic data (you would fetch or compute this data in a real application)
# trafficDataDict = {
#     "1": trafficDataItem.TrafficDataItem(
#         id="1",
#         type="Bus",
#         subType="City Bus",
#         position=core.Position(lat=40.7128, lon=-74.0060),
#         line="Line 1",
#         direction="North",
#         utilization=core.Utilization(abs=30, rel=0.6)
#     ),
#     # Add more items as needed...
# }