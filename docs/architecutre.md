# Architecture of Travel Journal App

I'm not going with any fancy architecture, as I already mentioned on the readme that this is a learning project, I'm trying to practice with my current knowledge level.

I created a MapManager class diagram to handle all the logic for Map. This is just the starting things may change as I progress. Reason behind creating a separate class for map is that there are so many things just happening with map. From getting the position, loading the map and also attributes like zoom level of map. When I first designed the flowchart I thought if the geoLocation isn't supported or user deny the location acces I'll show an error alert. But while start coding (just the map part, before organizing), I find that it'd be better to get the position from the user directly if he wants to open the map in different location or somehow we can't get the position. There is so many things for map that's why I thought it'd be great if I create separate class for Map.

![Class to manage Map](/docs/class-mapmanager.png)
