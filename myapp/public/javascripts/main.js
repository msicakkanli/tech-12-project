
function stas(home, away, divClass) {
    let per = home/(home+away) *100
    $(divClass).css('width', per+'%')
}

//Shot on target
var homeSOT = parseInt($('.home_Sot').text())
var awaySOT = parseInt($('.away_Sot').text())

let divClass = '.sot .progress-bar'
stas(homeSOT,awaySOT,divClass)


//shot of target
var homeSOF = parseInt($('.home_Sof').text())
var awaySOF = parseInt($('.away_Sof').text())

var SofPer = homeSOF/ (homeSOF + awaySOF) * 100

$('.sof .progress-bar').css('width', SofPer+'%');

//possesion
var homePos = parseInt($('.home_Pos').text())

$('.pos .progress-bar').css('width', homePos+'%');

//corner
var homeCor = parseInt($('.home_Cor').text())
var awayCor = parseInt($('.away_Cor').text())

var CorPer = homeCor/ (homeCor + awayCor) * 100

$('.cor .progress-bar').css('width', CorPer+'%');

//Offside
var homeOff = parseInt($('.home_Off').text())
var awayOff = parseInt($('.away_Off').text())

var OffPer = homeOff/ (homeOff + awayOff) * 100

$('.cor .progress-bar').css('width', OffPer+'%');

//fouls
var homeFou = parseInt($('.home_Fou').text())
var awayFou = parseInt($('.away_Fou').text())

var FouPer = homeFou/ (homeFou + awayFou) * 100

$('.fou .progress-bar').css('width', FouPer+'%');



//calculate start and end of week days
let day = moment().day()
let dayDiffStart = 5 - day
let dayDiffEnd = 8 - day
if (day === 0 ) {
        let  dayDiffStart = -2
        let   dayDiffEnd = 1 
        weekOfStart = moment().add(dayDiffStart,'d').format('YYYY-MM-DD')
        weekOfEnd = moment().add(dayDiffEnd,'d').format('YYYY-MM-DD')
} else if (day === 1) {
        let  dayDiffStart = -3
        let   dayDiffEnd = 0
        weekOfStart = moment().add(dayDiffStart,'d').format('YYYY-MM-DD')
        weekOfEnd = moment().add(dayDiffEnd,'d').format('YYYY-MM-DD')
} else {
        weekOfStart = moment().add(dayDiffStart,'d').format('YYYY-MM-DD')
        weekOfEnd = moment().add(dayDiffEnd,'d').format('YYYY-MM-DD')
    }



function leagueData(leagueValue) {
    const homeTeam=[] 
    let footballApi ='https://apifootball.com/api/?action=get_events&from='+weekOfStart+'&to='+weekOfEnd+'&league_id='+leagueValue+'&APIkey=646fd20b9e01e1179ada2415371db638f460a3fcfaa4e17d6cc9ff5ac5b454f2'
    
    $.getJSON(footballApi, function (events) {
       console.log(footballApi)
        let eventDetails = events.map(function(key){
            return {
                date: key.match_date,
                start: key.match_time,
                homeTeam: key.match_hometeam_name,
                homeScore: key.match_hometeam_score,
                awayTeam: key.match_awayteam_name,
                awayScore: key.match_awayteam_score,
                button: "<a  href=/match_detail/" +key.match_hometeam_name +">Details</a></button>"
            }
        });
            $.each(eventDetails,function (key,value) {
                let home = eventDetails[key].homeTeam
                homeTeam.push(home);
            });

       
    // $.each(homeTeam,function(key,value){
    //     let home = homeTeam[key]
    //     let fwizzard = 'http://localhost:3000/api/teamdata/'+home
    //     var promise = $.getJSON(fwizzard)
    //         promise.then(function (weather) {
    //             let temp = weather.main.temp
    //             cityWeather.push(temp)
    //         })
    // });

 
    
        $.each(eventDetails, function(key, value) {
            
            var tr = $("<tr />")
           $.each(value, function(k, v) {
             tr.append(
               $("<td />", {
                 html: v
                })[0].outerHTML
             );
            $(".selectedteam").append(tr)
           })
         })
        })
}


$('.selectButton').on('click', function(){
    $('.team td').hide();
    $('.selectedteam td').hide();
    let leagueValue = $('.selectLeague').val();
    leagueData(leagueValue)
})

