function Socket() {
    var roomContainer = document.querySelector(".room");
    this.roomContainer = roomContainer;
    this.socket = io.connect('http://two048.herokuapp.com');

    this.socket.on('connect', function() {
        //roomContainer.innerHTML = 'Room: ' + this.socket.sessionid.slice(0, 5);
    });
}

Socket.prototype.setPlayers = function(player, opponent) {
    this.player = player;
    this.opponent = opponent;
    this.player.opponent = opponent;
    this.opponent.opponent = player;
}

Socket.prototype.subscribe = function() {
    var roomContainer = this.roomContainer;
    var player = this.player;
    var opponent = this.opponent;

    this.socket.on('gameJoined', function(data) {
        player.grid.build(data.player.cells)
        opponent.grid.build(data.opponent.cells);
        player.actuate();
        opponent.actuate();
        if(data.room) {
            //roomContainer.innerHTML = 'Room: ' + data.room;
        }
    });

    this.socket.on('opponentMoved', function(data) {
        opponent.move(data.direction, data.newTile);
    });

    this.socket.on('gameEnded', function(data) {
        player.over = true;
        player.actuate();
    });
}
