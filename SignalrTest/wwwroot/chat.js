
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chathub")
    .build();

connection.on("ReceiveMessage", function (user, message) {
    const encodedUser = $("<div />").text(user).html();
    const encodedMessage = $("<div />").text(message).html();
    $("#messagesList").append(`<li><strong>${encodedUser}:</strong> ${encodedMessage}</li>`);
});

connection.start().catch(function (err) {
    console.error(err.toString());
});

$("#sendButton").click(function () {
    const user = $("#username").val();
    const message = $("#messageInput").val();
    connection.invoke("SendMessage", user, message).catch(function (err) {
        console.error(err.toString());
    });
    $("#messageInput").val("");
});