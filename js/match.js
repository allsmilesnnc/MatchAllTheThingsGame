 //--Match All The Things!  Douglas Edge-----Version 1.0

 var IMG_OFFSET = 0;           
 var IMG_START = 18 + IMG_OFFSET;
 var IMG_STOP  = 20 + IMG_OFFSET;
 var IMG_PLUS  = 28 + IMG_OFFSET;
 var IMG_MINUS = 24 + IMG_OFFSET;
 var IMG_LEVEL = 26 + IMG_OFFSET;
 var IMG_Sec   = 33 + IMG_OFFSET;
 var IMG_Match   = 49 + IMG_OFFSET;
 var IMG_Attempt = 41 + IMG_OFFSET;
 var Images = 8;                               
 var arrHighScore    = new Array();             
 var imgArrField     = new Array(Images * 2);  
 var imgCard         = new Image();             
 var imgArrStartStop = new Array(4);            
 var imgArrPlusMinus = new Array(4);            
 var imgArrNumber    = new Array(11);           
 var Running        = false;                      
 var Level          =  4;                      
 var Seconds        =  0;                      
 var Attempts       =  0;                      
 var Match          =  0;                      
 var Selection1     = -1;                      
 var Selection2     = -1;                      
 var ShowCard       = false;                    
 var strPlayerName  = "";                    
 var strDate        = "";                       
 var Points         = 0;
 var Accurcy        = 0;                        
 var Cookies        = false;                    
 
 function loadImages()
 {
   if(document.images)
   {
     imgCard.src  = "images/backOfCard.jpg";
     
     for(var i = 0; 
             i < 4; 
             i++)
     {
       imgArrStartStop[i] = new Image();
       imgArrStartStop[i].src = "images/startstop" + (i + 1) + ".gif";
     }

     
     for(var i = 0; 
             i < 4; 
             i++)
     {
       imgArrPlusMinus[i] = new Image();
       imgArrPlusMinus[i].src = "images/plusminus" + (i + 1) + ".gif";
     }
     
     
     for(var i = 0; 
             i < 11;
             i++)
     {
       imgArrNumber[i] = new Image();
       imgArrNumber[i].src = i + ".gif";
     }

     
     for(var i = 0; 
             i < Images; 
             i++)
     {
       img = new Image();
       img.src = "images/thing" + (i + 1) + ".jpg";
    
       imgArrField[i * 2] = new Image();
       imgArrField[i * 2 + 1] = new Image();
       imgArrField[i * 2].src = img.src;
       imgArrField[i * 2 + 1].src = img.src;
     }
     
     loadHighScore();
     Level = 4;
     Seconds  =  0;
     Attempts =  0;
     Match    =  0;
     Accurcy  =  0;
     updateAll();
   }   
 }
 
 // Use JavaScript internal math function to shuffle the pictures so they are not the same 
 // each time the game is played.
 function shuffle()
 {
   if(document.images)
   {
     
     var j = Math.floor(new Date().getSeconds() * Math.random() + 60);
     for(var i = 0;
             i < j; 
             i++)
     {
       number1 = Math.round(Math.random() * (Images * 2 - 1));
       number2 = Math.round(Math.random() * (Images * 2 - 1));
       img = imgArrField[number1];
       imgArrField[number1] = imgArrField[number2];
       imgArrField[number2] = img;
     } 
   }
 }
  

 function startGame()
 {
   if(document.images)
   {
     if(!Running)
     {
       shuffle();
       clearBoard();
       Seconds = 0;
       Selection1 = -1;
       Selection2 = -1;    
       Attempts   =  0;
       Match      =  0;
       Accurcy    =  0;
       id = setInterval("countSeconds()", 1000)
       Running  = true;
       ShowCard = false;
       updateAll();
     }
   }
 }
 
 function stopGame()
 {
   if(document.images)
   {
     if(Running)
     {
       clearInterval(id);
       Running = false;
       updateAll();
     }
   }
   return;
 }
 
 function countSeconds()
 {
   Seconds++;
   showNumber(Seconds, IMG_Sec, 5);
 }
 
 function showNumber(aNumber, Position, Count)
 {
   if(document.images)
   {
     aNumber += "";
     while(aNumber.length < Count) aNumber = " " + aNumber;
     for(var i = 0; 
             i < Count; 
             i++)
     {
       var number = aNumber.charAt(i);
       if(number == " ")
       {
         document.images[Position + i].src = imgArrNumber[10].src;
       }
       else
       {
         document.images[Position + i].src = imgArrNumber[number].src;
       }
     }
   }
 }
 
 function clearBoard()
 {
   if(document.images)
   {
     for(var i = 0; 
             i < Images * 2; 
             i++)
     {
       document.images[i + IMG_OFFSET].src = imgCard.src;
     }
   }
 }   

 function showCard(aImage)
 {
   if(document.images)
   {
     if(Running && !ShowCard)
     {
       
       if(Selection1 == -1 || Selection2 == -1)
       {
         
         if(document.images[aImage + IMG_OFFSET].src == imgCard.src)
         {
           document.images[aImage + IMG_OFFSET].src = imgArrField[aImage].src;
           if(Selection1 == -1)
           {
             Selection1 = aImage;
           }
           else
           {
             Selection2 = aImage;
           }
         }
       }
              
       if(Selection1 != -1 && Selection2 != -1)
       {
         showNumber(++Attempts, IMG_Attempt, 5);
                 
         if(document.images[Selection1 + IMG_OFFSET].src == document.images[Selection2 + IMG_OFFSET].src)
         {
           showNumber(++Match, IMG_Match, 5);
           Selection1 = -1;
           Selection2 = -1;
                
           if(Match == Images)
           {
             stopGame();
             strMsg = "Enter your name so it can be displayed on the Highscore List.  Remember to press the High Score button to see the list.";
             strPlayerName = prompt(strMsg, strPlayerName);
             if(strPlayerName != null && strPlayerName != "")
             {
               strDate = getTheDate();
               Points = Math.round(100000 * (Level + 1) / Seconds / Attempts);
               Accurcy = 100 - (Math.round(100 * (Attempts / Points)));
               arrHighScore.push(new objHighScore());
             }
           }
         }
         else
         {
           ShowCard = true;
           setTimeout("clearCard()", 2000 - Level * 200);
         }
       }
     }
     else
     {
       if(!Running)
       {
         alert("Please start the game first by pressing the Start button!");
       }
     }
   }
 }
 
 function clearCard()
 {
   document.images[Selection1 + IMG_OFFSET].src = imgCard.src;
   document.images[Selection2 + IMG_OFFSET].src = imgCard.src;
   Selection1 = -1;
   Selection2 = -1;
   ShowCard = false;
  }

 function setLevel(aValue)
 {
   if(document.images && !Running)
   {
     Level += aValue;
     if(Level < 0) Level = 0;
     if(Level > 9) Level = 9;
     showNumber(Level, IMG_LEVEL, 1);
   }
 }

 function updateAll()
 {
   if(document.images)
   {
     showNumber(Level, IMG_LEVEL, 1);
     showNumber(Seconds, IMG_Sec, 5);
     showNumber(Attempts, IMG_Attempt, 5);
     showNumber(Match, IMG_Match, 5);

     if(Running)
     { 
       document.images[IMG_START].src = imgArrStartStop[1].src;
       document.images[IMG_STOP].src  = imgArrStartStop[2].src;
       document.images[IMG_PLUS].src  = imgArrPlusMinus[1].src;
       document.images[IMG_MINUS].src = imgArrPlusMinus[3].src;
     }
     else
     {  
       document.images[IMG_START].src = imgArrStartStop[0].src;
       document.images[IMG_STOP].src  = imgArrStartStop[3].src;
       document.images[IMG_PLUS].src  = imgArrPlusMinus[0].src;
       document.images[IMG_MINUS].src = imgArrPlusMinus[2].src;
     }
   }
 }
 
 function showHighScore()
 {
   sortHighScore();
   saveHighScore();
   window.open("highscore.html", "Highscore", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=964,height=700");
 }
 
 function objHighScore()
 {
   this.Points   = Points;
   this.strName  = strPlayerName;
   this.strDate  = strDate;
   this.Level    = Level;
   this.Seconds  = Seconds;
   this.Attempts = Attempts;
   this.Accurcy  = Accurcy;
 }

 function sortHighScore()
 {
   var lngth = arrHighScore.length;
   if(lngth > 1)
   {
     for(var x = 0; x < lngth - 1; x++)
     {
       for(var y = 0; y < lenth - 1; y++)
       {
         if((arrHighScore[y].Points - arrHighScore[y + 1].Points) > 0)
         {   
           var tmp = arrHighScore[y];
           arrHighScore[y] = arrHighScore[y + 1];
           arrHighScore[y + 1] = tmp;
         }
       }
     }
   }
 }

 function loadHighScore()
 {
   if(document.cookie != "")
   {
     Cookies = true;
   
     for(var i = 1; 
             i < 5; 
             i++)
     {
       var strCookieValue = getCookie("MatchScore" + i);
       if(strCookieValue != "")
       {
         var arrValues = unescape(strCookieValue).split(";");
         Points        = arrValues[0];
         strPlayerName = arrValues[1];
         strDate       = arrValues[2];
         Level         = arrValues[3];
         Seconds       = arrValues[4];
         Attempts      = arrValues[5];
         Accurcy       = arrValues[6];
         arrHighScore.push(new objHighScore());
       }
     }
     strPlayerName = getCookie("MatchPlayerName");   
   }
   else
   {
     
     setCookie("MatchPlayerName", strPlayerName);
     if(document.cookie == "")
     {
       
       Cookies = false;
     }
     else
     {
       Cookies = true;
     }
   }
 }

function getName() 
{
  name=prompt("Enter your name.","");
  if (name == "") {alert("Please enter your name or click on 'Cancel'."); GetName();  
  }
  else if (name == "null") {return;}
  WriteMessage("Player" , name);
  WriteMessage("Points" , "0");
  WriteMessage("Level Played" , "0");
  WriteMessage("Speed or Amount of Time to Finish" , "0 sec");
  WriteMessage("Number of Tries" , "0");
  WriteMessage("Accuracy" , "0%");
  Timer = new Array();
  named=true;
  WriteMessage("Response" , "<font color=#000000>Click on 'Start' to begin.");
}

 function saveHighScore()
 {
   if(Cookies)
   {
     setCookie("MatchPlayerName", strPlayerName);
        
     if(arrHighScore.length != null)
     {
       var n = arrHighScore.length - 1;
       var j = 0;
       for(var i = n; 
               i > n - 3; 
               i--)
       {
         if(i >= 0)
         {
           var strCookieValue = "";
           strCookieValue += arrHighScore[i].Points + ";";
           strCookieValue += arrHighScore[i].strName + ";";
           strCookieValue += arrHighScore[i].strDate + ";";
           strCookieValue += arrHighScore[i].Level + ";";
           strCookieValue += arrHighScore[i].Seconds + ";";
           strCookieValue += arrHighScore[i].Attempts + ";";
           strCookieValue += arrHighScore[i].Accurcy;
           setCookie("MatchScore" + ++j, strCookieValue);
         }
       }
     }
   }
 }
 
 function getCookie(strId)
 {
   var strReturn = "";

   if(document.cookie != "")
   {
     var arrCookies = document.cookie.split(";");
     for(var i = 0; 
             i < arrCookies.length; 
             i++)
     {
       var arrCookie = arrCookies[i].split("=");
       if(arrCookie.length == 2)
       {
         if(strTrim(arrCookie[0]) == strTrim(strId))
         {
           strReturn = unescape(arrCookie[1]);
         }
       }
     }
   }
   return strReturn;
 }
 
 function setCookie(strId, strValue)
 {
   document.cookie = strId + "=" + escape(strValue) + ";expires=" + new Date(2050, 12, 31).toGMTString();
 }
 
 function strTrim(str)
 {
   var strReturn = "";
   
   for(var i = 0; i < str.length; i++)
   {
     if(str.charAt(i) != " ")
     {
       strReturn += str.charAt(i);
     }
   }
   return strReturn;
 }
 
 function getTheDate()
 {
   var strReturn = "";
   var d = new Date();
   var strDate = addLeadingZero(d.getMonth() + 1 , 2) + "/" + addLeadingZero(d.getDate(), 2) + "/" + getTheYear(d);
   var strTime = addLeadingZero(d.getHours() , 2) + ":" + addLeadingZero(d.getMinutes() , 2) + ":" + addLeadingZero(d.getSeconds() , 2);
   strReturn = strDate + " " + strTime;
   return strReturn;
 }
    
 function getTheYear(d)
 {
   var year = d.getYear();
   return year;
 }
 
 function addLeadingZero(value, TotalLength)
 {
   value += "";
   while(value.length < TotalLength) value = "0" + value;
   return value;
 }