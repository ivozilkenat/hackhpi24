from typing import Dict
from models import trafficDataItem

trafficDataDict: Dict[str, trafficDataItem.TrafficDataItem] = dict()

# Example traffic data (you would fetch or compute this data in a real application)
trafficDataDict = {
    "1": trafficDataItem.TrafficDataItem(
        id="1",
        type="Bus",
        subType="City Bus",
        position=trafficDataItem.Position(lat=40.7128, lon=-74.0060),
        line="Line 1",
        direction="North",
        utilization=trafficDataItem.Utilization(abs=30, rel=0.6)
    ),
    # Add more items as needed...
}