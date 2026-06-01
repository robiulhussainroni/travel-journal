# A journal to log my work update related the project

May 02, 2026 :

- Plan the Travel Journal project : Created Fake persona for the project, then come up with user stories, from there come up features ideas

- Design v1 Flowchart for the Travel Journal app

- Initialized Files and Folders for the project

May 05, 2026 :

- Designed the initial layout of Travel Journal

May 06, 2026 :

- Markup Travel Form, List and Details
- Give a basic design to Travel Form, List and Details

Note :
Things are not going as what I imagined. Seems like 3 columns layout is bit too much specially on my laptop who is smaller in screen size. I've to come up with different layout ideas. What I'm thinking is that, instead of creating a separate column for Travel details I should wrap it inside a modal and whenever user clicked on the Travel list I can display the modal.

May 07, 2026 :

- Redesigned the travel form, travel list and travel details
- As I mentioned having 3 columns wasn't working that's why I removed travel details column and wrap it inside a modal

Note : My goal with this project isn't practice my design skills but not only for this project almost all my projects I try to design them. Sometimes I feel it's wasting time as my current goal isn't to become a designer rather work on the logic side but again I feel incomplete If I don't do this.

May 08, 2026 :

- Added colors and fonts in the UI and Polished the UI
- Integrated Leaflet Library and Openstreet map

Note : From now on, It should be more about logic, architecting

May 14, 2026 :

- Build a form to collect information if somehow couldn't get the position of the user or if user wants to open the map in different position (This is cool I guess instead of just alerting the user with 'Sorry! could not get your position')

Note : I still haven't think about how to architect (organize) my code yet. I'm just trying to playing out for now.

May 15, 2026 :

- Finally, I've started thinking about the architecture of the app
- I've designed a class diagram to handle Map related code

May 16, 2026 :

- Created the class to manage map related code from MapManager class diagram
- Created the App class and called the MapManager inside it, haven't designed the App class properly yet !

May 17, 2026 :

- Designed TravelManager class to manage code related Travel log
- Implemented TravelManager class and linked it with MapManager

May 19, 2026 :

- Refactored #loadMap() method, created separate method in that process
- Collect travel form input values, render them on the travel list, removing the travel form input value
- Try to work with travel details modal but it ended up being complex to implement

May 23, 2026 :

- Displayed Travel Details when user clicks on Travel List

May 29, 2026 :

- Rendered map marker
- Designed the map marker
- Tried to render the map marker after form submission but things didn't go as expected

June 01, 2026 :

- Discover a crucial bug : after the first travel log, everytime when we create a new travel log an extra travel log creates out of nowhere
- Make the full application Responsive
