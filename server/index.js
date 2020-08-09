const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

const uri = process.env.MONGODB_URI|| "";
const port = process.env.PORT || 5000;


const mongoose = require('mongoose');
const ColorState = require('./ColorState')

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

io.on('connection', (socket) => {

	ColorState.find().exec((err, colorStates) => {
    if (err) return console.error(err);

    // Send the last messages to the user.
    socket.emit('init', colorStates);
  });



	socket.on('colors',(colors)=>{
		console.log(colors)
		const colorState= new ColorState({
			colors: colors
		})

		colorState.save((err)=> {
			if (err) {console.log("error saving")}
		})

	})

 console.log("A user has connected")
});

http.listen(port, () => {
  console.log('listening on *:' + port);
});