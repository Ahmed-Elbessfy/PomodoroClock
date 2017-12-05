$("document").ready(function () {
    //Estmating session and break periods
    var sessionTime = 25;
    var sessionSec = 60;
    var breakTime = 5;
    var breakSec = 60;
    var coun, breakCount; //sessionTime and breakTime time counter
    var audio = new Audio(
        "http://www.orangefreesounds.com/wp-content/uploads/2016/06/Ringing-clock.mp3?_=1"
    ); // alarm sound
    //Increase sissionTime
    $("#sp").on("click", function () {
        sessionTime++;
        $("#session").html(sessionTime + ":00");
    });
    //Reduce sissionTime
    $("#sm").on("click", function () {
        if (sessionTime > 0) {
            sessionTime--;
            $("#session").html(sessionTime + ":00");
        }
    });
    //Increase breakTime
    $("#bp").on("click", function () {
        breakTime++;
        $("#break").html(breakTime + ":00");
    });
    //Reduce breakTime
    $("#bm").on("click", function () {
        if (breakTime > 0) {
            breakTime--;
            $("#break").html(breakTime + ":00");
        }
    });
    $("#reset , #stop").hide();

    //event on click start

    $("#start").on("click", function () {
        $("#start , #sp , #sm , #bp , #bm").hide();
        $("#stop, #reset").show();
        //main conc: every second check if the minute had completed, then check for the whole time , if the session time finished , play alarm and start break time count
        sessionTime--; //Reduce the first Minute for SessionTime to start counting form 4:59 if it was 5:00
        breakTime--; //Reduce the first Minute for breakTime to start counting form 4:59 if it was 5:00
        coun = setInterval(function () {
            //Check if sessiontime is out
            if (sessionTime > -1) {
                //check if the current minute had finished
                if (sessionSec > 0) {
                    //reduce a sescond count
                    sessionSec--;
                    if (sessionSec >= 10) { //for seconds <10, add 0before this displayed number >> ex: 5:05
                        $("#session").html(sessionTime + ":" + sessionSec);
                    } else {
                        $("#session").html(sessionTime + ":0" + sessionSec);
                    }

                } else { //if sessionSec completed == if Current minute finished, reduce sessionTime -1 and set sessionSec to 59 to keep count down again and display the time for sessionTime reduced with sessionSec == 59
                    sessionTime--;
                    sessionSec = 59;
                    if (sessionTime > -1) { //to prevent displaying any negative numbers for sessionTime
                        $("#session").html(sessionTime + ":" + sessionSec);
                    }
                }
            } else { // if sessionTime finished, display the alarm and start breakTime count down 
                audio.play(); //play the alarm
                clearInterval(coun); //stop count the sessionTime function, so the alarm only displayed once
                $("#session").css("opacity", "0.5"); //Fade the sessionTime as indication for completing it 
                breakCount = setInterval(function () { //breakTime count down function
                    //check if breakTime is out
                    if (breakTime > -1) {
                        //check if the current minute had finished
                        if (breakSec > 0) {
                            //reduce a sescond count
                            breakSec--;
                            if (breakSec >= 10) { //for seconds <10, add 0before this displayed number >> ex: 5:05
                                $("#break").html(breakTime + ":" + breakSec);
                            } else {
                                $("#break").html(breakTime + ":0" + breakSec);
                            }
                        } else { //if breakSec completed == if Current minute finished, reduce breakTime -1 and set breakSec to 59 to keep count down again and display the time for breakTime reduced with breakSec == 59
                            breakTime--;
                            breakSec = 59;
                            if (breakTime > -1) { //to prevent displaying any negative numbers for breakTime
                                $("#break").html(breakTime + ":" + breakSec);
                            }
                        }
                    } else { // if breakTime finished, display the alarm 
                        audio.play(); //play the alarm
                        clearInterval(coun); //stop count the sessionTime function, so the alarm only displayed once
                        clearInterval(breakCount); //stop count the breakTime function, so the alarm only displayed once
                        $("#break").css("opacity", "0.5"); //Fade the breakTime as indication for completing the whole session ((Session time + Break Time)) and ready for reseting new one
                    }
                }, 1000);
            }
        }, 1000);
    });

    //event on click pause

    /*$("#stop").on("click", function() {
    	$("#stop").hide();
    	$("#start").show();
    	clearInterval(coun, breakCount);
    	sessionTime++;
    });*/

    //event on click reset

    $("#reset").on("click", function () { //On reset, Stop counter, show start button, reset session options and reset primary Values for counters
        clearInterval(coun, breakCount); //stop all counters 
        sessionTime = 25;
        sessionSec = 60;
        $("#session").html(sessionTime + ":00");
        breakTime = 5;
        breakSec = 60;
        $("#break").html(breakTime + ":00");
        $("#reset").hide(); //No need to be displayed
        $("#start, #sp , #sm , #bp , #bm").show(); //to start a new session
    });
});
/* Tutorials and Help Links : 
** 1-Step attri for Time Input https://www.w3schools.com/jsref/prop_input_time_step.asp   **
** 2-JavaScript timers https://developer.mozilla.org/en-US/docs/Archive/Add-ons/Code_snippets/Timers  **
** 3-SetInterval https://www.w3schools.com/js/tryit.asp?filename=tryjs_setinterval3  **
** 4-Tutorial https://mrkaluzny.com/pomodoro-clock-free-code-camp-project/  **
** 4-Example https://codepen.io/mrkaluzny/pen/mVzPeQ?editors=0010  **

*/