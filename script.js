const events = [];

function addEvent() {

    const name = document.getElementById("eventName").value;
    const date = document.getElementById("eventDate").value;

    if(name === "" || date === ""){
        alert("Please enter event details");
        return;
    }

    events.push({
        name: name,
        date: new Date(date).getTime()
    });

    document.getElementById("eventName").value = "";
    document.getElementById("eventDate").value = "";

    displayEvents();
}

function displayEvents(){

    const container = document.getElementById("eventsContainer");
    container.innerHTML = "";

    events.forEach((event,index)=>{

        container.innerHTML += `
        <div class="event-card">
            <h3>${event.name}</h3>
            <div class="timer" id="timer-${index}">
                Loading...
            </div>
        </div>
        `;
    });
}

setInterval(()=>{

    events.forEach((event,index)=>{

        const now = new Date().getTime();
        const distance = event.date - now;

        const timer = document.getElementById(`timer-${index}`);

        if(!timer) return;

        if(distance <= 0){
            timer.innerHTML = "🎉 Event Started!";
            return;
        }

        const days = Math.floor(distance/(1000*60*60*24));
        const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
        const minutes = Math.floor((distance%(1000*60*60))/(1000*60));
        const seconds = Math.floor((distance%(1000*60))/1000);

        timer.innerHTML =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
    });

},1000);