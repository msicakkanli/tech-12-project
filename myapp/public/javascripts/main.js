
//
$(document).ready(function(){
    $('.team td').hide();
    let footballApi = 'https://apifootball.com/api/?action=get_events&from=2018-08-09&to=2018-08-13&league_id=62&APIkey=646fd20b9e01e1179ada2415371db638f460a3fcfaa4e17d6cc9ff5ac5b454f2'
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
    })

$('.first-select').on('change',function(){
    $('.team td').hide();
    let leagueValue = $('.first-select').val();
    let footballApi = 'https://apifootball.com/api/?action=get_events&from=2018-08-09&to=2018-08-13&league_id='+leagueValue+'&APIkey=646fd20b9e01e1179ada2415371db638f460a3fcfaa4e17d6cc9ff5ac5b454f2'
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
    })


   

