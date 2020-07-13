# SmartHop Full Stack Dev test

This project shows bike sharing data in the city of Miami, Florida. The client app shows how many stations and how many bicycles per station currently are. Every time it gets updated, a new button appears in the change history. When you click one of the buttons, the maps just shows how the availability was at that point of time and a "continue" button that lets you go back to real time status.

## To include later on

For improving UX/UI I would suggest adding timestamps for buttons and comparing every new state with the previous one before saving it, to realize if there was a real change in the info, right now I am saving every new update from the socket but it doesn't mean that there is a change.

I decided not to improve styles because the main challenge was described without it, but obviously the best improvement would be to add proper stylesheets.

## Comments

Since it is just a small test I decided to work at master branch without any special sintactics or flows.

## Folder Structure

There are two parts for the web app:

The server

`cd /citibike-server`

This is the node socket.io Server app to start :

`node server.js`

Then run the client app

`cd /citibike-client`

That is the client React Application to start :

`npm strat`




