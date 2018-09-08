
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


var week = $('#week').text()
var numWeek = parseInt(week)
console.log(week)

$('#changeplusWeek').on('click', function(){
    if (numWeek >= 4) {
        numWeek = 4 
        $("a").attr("href", "/previous/"+ numWeek)
    } else {
        numWeek += 1
        $("a").attr("href", "/previous/"+ numWeek)
    }
})

$('#changeminusWeek').on('click', function(){
    if (numWeek <= 1) {
        numWeek = 1 
        $("a").attr("href", "/previous/"+ numWeek)
    } else {
        numWeek -= 1
        $("a").attr("href", "/previous/"+ numWeek)
    }
})