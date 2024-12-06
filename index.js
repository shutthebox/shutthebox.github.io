var runningTotal = 0
var clicked = []
diceTotal = 0
scoreleft = 0
playernames = []
var currentplayerindex = 0
winner = []
losers = []
winningscore = 100
BetAmount = 0



function getEmpId(element)
{
    var empId = element.getAttribute("data-employee-id");
    runningTotal = runningTotal
    var allbuttons = document.getElementsByClassName("numbers")
    if (clicked.includes(empId)) {
        runningTotal = (runningTotal-parseInt(empId))
        element.style.background = "brown"
        clicked = removeElement(clicked, empId)
        

    } else {   if ((runningTotal+parseInt(empId)) <= diceTotal) {
            runningTotal = (runningTotal+parseInt(empId))
            clicked.push(empId)
            element.style.background = "yellow"
            
            if (runningTotal == diceTotal) {
                var allbuttons = document.getElementsByClassName("numbers")
                for (i=0; i<allbuttons.length; i++) {
                    if (clicked.includes(allbuttons[i].getAttribute("data-employee-id"))) {
                        allbuttons[i].style.background = "black"
                        allbuttons[i].disabled = true;
                    }
                }
             DiceRoll()   
            }
    }   else {
        runningTotal = 0
        clicked = []
        var allbuttons = document.getElementsByClassName("numbers")
        for (i=0; i<allbuttons.length; i++) {
            if (allbuttons[i].disabled == false) {
                allbuttons[i].style.background = "brown"
            }
        }

    }
    } 
    return(empId);
}

function DiceRoll() {
    
    scoreleft = 0
    var allbuttons = document.getElementsByClassName("numbers")
    for (i=0; i<allbuttons.length; i++) {
        if (allbuttons[i].disabled == false) {
            scoreleft = scoreleft + parseInt(allbuttons[i].getAttribute("data-employee-id"))
        }    

    }
    if (scoreleft > 6) {
        dice1 = Math.floor(Math.random()*6+1)
        dice2 = Math.floor(Math.random()*6+1)
        diceTotal = dice1+dice2
        document.getElementById("diceroll").innerHTML = dice1 + "+" + dice2 + "=" + diceTotal
    } else {
        dice1 = Math.floor(Math.random()*6+1)
        diceTotal = dice1
        document.getElementById("diceroll").innerHTML = dice1 + "+" + "0" + "=" + diceTotal
    }
    CheckMoves(diceTotal)
    
    return diceTotal
}

function removeElement(array, elementToRemove) {
    array.forEach((item, index) => {
        if (item === elementToRemove) {
            array.splice(index, 1);
        }
    });
    return array;
}

function CheckMoves (dicetotal) {
    var cando = false
    var tilesLeft = [0]
    var allbuttons = document.getElementsByClassName("numbers")
    for (i=0; i<allbuttons.length; i++) {
        if (allbuttons[i].disabled == false) {
            tilesLeft.push(parseInt(allbuttons[i].getAttribute("data-employee-id")))
        }
    }
    var allbuttons = document.getElementsByClassName("numbers")
    for (i=0; i<allbuttons.length; i++) {
        if (tilesLeft.includes(parseInt(allbuttons[i].getAttribute("data-employee-id")))) {
            for (a=0; a<allbuttons.length; a++) {
                if (tilesLeft.includes(parseInt(allbuttons[a].getAttribute("data-employee-id")))) {
                    if ((parseInt(allbuttons[a].getAttribute("data-employee-id"))) !== (parseInt(allbuttons[i].getAttribute("data-employee-id" )))) {
                        
                        if (parseInt(allbuttons[i].getAttribute("data-employee-id")) + parseInt(allbuttons[a].getAttribute("data-employee-id")) == parseInt(dicetotal)) {
                            var cando = true;
                        } else {
                            
                        }
                    }
                }
            }   
        
    }

}
if (cando === false) {
    document.getElementById("diceroll").innerHTML += "<br/>" + "Your Total Score Is " + scoreleft
    SetScore(playernames, scoreleft)
}

}

function playernumber() {
    playerNumber = parseInt(document.getElementById("playerform").value) + 1
    var paragraph = document.getElementById("testy")
    for (i=1; i<playerNumber; i++) {
        temp = playerNameEntries(i)
        paragraph.appendChild(temp)

    }
    document.getElementById("firstEntry").remove()
    var continueButton = document.createElement("BUTTON")
    continueButton.innerHTML = "Continue"
    continueButton.setAttribute("id", "ContinueButton")
    continueButton.setAttribute("onclick", "SavePlayerNames(playernames)")
    paragraph.append(continueButton)
}

function playerNameEntries (playerNumber) {
    var topParagraph = document.createElement("p")
    topParagraph.setAttribute("class", "input-group flex-nowrap")
    topParagraph.setAttribute("id", "span"+ i)

    var topSpan = document.createElement("span")
    topSpan.setAttribute("class", "input-group-text")
    topSpan.innerHTML = ("Player Name:")
    topParagraph.appendChild(topSpan)

    var topInput = document.createElement("input")
    topInput.innerHTML = ("player name:")
    topInput.setAttribute("type" , "text")
    topInput.setAttribute("id" , "player"+ i)
    topInput.setAttribute("class", "NameInput")
    topParagraph.appendChild(topInput)

    return topParagraph
}

function SavePlayerNames (playernames) {
     numberOfplayers = playernumber-1
     for (i=1; i<playerNumber; i++) {
        tempid = ("player"+ i)
        tempspan = ("span"+ i)
        
        temp = document.getElementById(tempid).value
        playernames.push(temp)
        document.getElementById(tempspan).remove()
     }
     document.getElementById("ContinueButton").remove()
    localStorage.setItem('players', playernames);
    LoadGame() 
    return playernames
}


function LoadGame () {
    let newloc = "MainGame.html";
    window.location.replace(newloc);
}

function CreatePlayerScores (playername) {
    
    var nameRow = document.createElement("div")
    nameRow.setAttribute("class", "row scoreboardrow w-100")
    nameRow.setAttribute("id", playername)
    var tempparagraph = document.getElementById("playersdiv")
    tempparagraph.appendChild(nameRow)
    var namePara = document.createElement("div")
    namePara.textContent = playername
    namePara.setAttribute("class", "col scoreboarditem")
    var moneyPara = document.createElement("div")
    moneyPara.setAttribute("class", "col scoreboarditem")
    moneyPara.setAttribute("id", playername+"money")
    moneyPara.textContent = "0"
    var scorePara = document.createElement("div")
    scorePara.setAttribute("class", "col scoreboarditem")
    scorePara.setAttribute("id", playername+"score")
    scorePara.textContent = "0"
    nameRow.appendChild(namePara)
    nameRow.appendChild(moneyPara)
    nameRow.appendChild(scorePara)


}

function RoundStart () {
    let playernames = localStorage.getItem("players").split(",")
    
    BetAmount = prompt("How Much Are You Betting?")
    rounds = Object.keys(playernames).length
    for (i=0; i<rounds; i++) {
        CreatePlayerScores(playernames[i])
    }
    FirstPlayer(playernames)
    DiceRoll()
}

function FirstPlayer (playername, currentplayerindex) {
    endScore = 0
    currentplayer = document.getElementById(playername[currentplayerindex])
    if (currentplayer) {
        currentplayer.style.background = "red"
    }
    return
}

function SetScore (score) {
    


    let playernames = localStorage.getItem("players").split(",")
    
    currentplayer = document.getElementById(playernames[currentplayerindex])
    
    playername = currentplayer.getAttribute("id")
    
    playername = document.getElementById(playername+"score")
    
    playername.textContent = parseInt(scoreleft)
    
    if (scoreleft < winningscore) {
        for (i=0; i<winner.length; i++) {
            losers.push(winner.shift())
        }
        winner.push(playernames[currentplayerindex])
        winningscore = scoreleft
        console.log("player won")
    } else if (scoreleft == winningscore) {
        winner.push(playernames[currentplayerindex])
        console.log("player drew")
    } else  {
        losers.push(playernames[currentplayerindex])
        console.log("player lost")
    }


    
    currentplayer.style.background = "brown"
    console.log("playing round "+(currentplayerindex+1)+" of "+(playernames.length))
    var continuebutton = document.createElement("BUTTON")
    continuebutton.setAttribute("id", "continuebutton")
    buttonplacement = document.getElementById("total")
    buttonplacement.appendChild(continuebutton)
    if (currentplayerindex+1 < (playernames.length)) {
        
        continuebutton.textContent = "Next Player"
        continuebutton.addEventListener('click', function () {
            NextPlayer(playernames)
        })
        
        currentplayerindex = Number(currentplayerindex)
        currentplayerindex = currentplayerindex + 1
}   else {
        CalculateBets(playernames)         
        continuebutton.textContent = "New Game?"
        continuebutton.addEventListener('click', function () {
        playernames.forEach(function(name){
            document.getElementById([name]+"score").innerHTML = 0
        })
        currentplayerindex = 0
        winningscore = 100
        winner = []
        losers = []
        BetAmount = prompt("How Much Are You Betting?")
        NextPlayer(playernames)
    })

}
    

    return currentplayerindex
}

function NextPlayer(playernames) {
currentplayerindex = Number(currentplayerindex)


//     if (playernames.length == currentplayerindex) {
//         CalculateBets(playernames)
// } else {
    currentplayer = document.getElementById(playernames[parseInt(currentplayerindex)])
    
    
    currentplayer.style.background = "red"
    var allbuttons = document.getElementsByClassName("numbers")
    for (i=0; i<allbuttons.length; i++) {

            allbuttons[i].style.background = "brown"
            allbuttons[i].disabled = false
        
    }

    DiceRoll()
    console.log("The winner is: "+winner)
    console.log("the losers are: "+losers)
    console.log(winningscore)
    continuebutton.remove()
    
    return currentplayerindex
}
// }

function CalculateBets (playernames) {
    console.log("Game Over")
    console.log("The winner is: "+winner)
    console.log("the losers are: "+losers)
    scores = {}
    console.log(playernames)

    losers.forEach(function (losers) {
        temp = document.getElementById([losers]+"money").innerHTML
        temp = temp - BetAmount
        document.getElementById([losers]+"money").innerHTML = temp
    })
    winningmoney = losers.length * BetAmount
    winningmoney = winningmoney / winner.length
    winner.forEach(function () {
        console.log([winner]+"money")
        temp = document.getElementById([winner]+"money").innerHTML
        temp = parseFloat(temp) + parseFloat(winningmoney)
        document.getElementById([winner]+"money").innerHTML = temp
        
    })
}