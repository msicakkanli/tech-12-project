//calculate start and end of week days
let day = moment().day()
let dayDiffStart = 5 - day
let dayDiffEnd = 8 - day
console.log(dayDiffStart)
console.log(dayDiffEnd)
let weekOfStart = moment().add(dayDiffStart,'d').format('YYYY-MM-DD')
let weekOfEnd = moment().add(dayDiffEnd,'d').format('YYYY-MM-DD')
let leagueValue = 62

function leagueData(leagueValue) {
    let footballApi = 'https://apifootball.com/api/?action=get_events&from='+weekOfStart+'&to='+weekOfEnd+'&league_id='+leagueValue+'&APIkey=646fd20b9e01e1179ada2415371db638f460a3fcfaa4e17d6cc9ff5ac5b454f2'
    $.getJSON(footballApi, function (events) {
        let eventDetails = events.map(function(key){
            return {
                homeTeam: key.match_hometeam_name,
                homeScore: key.match_hometeam_score,
                awayTeam: key.match_awayteam_name,
                awayScore: key.match_awayteam_score,
            }
        })
        $.each(eventDetails, function(key, value) {
            var tr = $("<tr />")
           $.each(value, function(k, v) {
             tr.append(
               $("<td />", {
                 html: v
                })[0].outerHTML
             );
            $(".team").append(tr)
           })
         })
        })
}

$(document).ready(function(){
    $('.team td').hide();
    let leagueValue= 62
    leagueData(leagueValue)
    })

$('.first-select').on('change',function(){
    $('.team td').hide();
    let leagueValue = $('.first-select').val();
    leagueData(leagueValue);
    })


   

