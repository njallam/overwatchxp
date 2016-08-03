//Values
xp = {
  "Quick Play": {
    "Base XP": 3.388,
    "Bronze": 50,
    "Silver": 100,
    "Gold": 150,
    "Match Finished": 250,
    "Win": 500,
    "Consecutive Match": 200,
    "Backfill": 400,
    "First Win of the Day": 1500
  },
  "Practice vs. AI": {
    "Base XP": 2.015,
    "Bronze": 30,
    "Silver": 60,
    "Gold": 90,
    "Match Finished": 150,
    "Win": 300,
    "Consecutive Match": 120,
    "Backfill": 240,
    "First Win of the Day": 1500
  },
  "Weekly Brawl": {
    "Base XP": 3.025,
    "Bronze": 45,
    "Silver": 90,
    "Gold": 135,
    "Match Finished": 225,
    "Win": 450,
    "Consecutive Match": 180,
    "Backfill": 240, //?
    "First Win of the Day": 1350
  }
};

//Selectors
mode = 'select[name="mode"]';
timeplayed = 'input[name="timeplayed"]';
basexp = 'input[name="basexp"]';
medal = 'input[name="medal"]';
medalc = medal+":checked"
medalxp = 'input[name="medalxp"]';
flags = 'input[name="flags"]';
flagsc = flags+":checked";
bonusxp = 'input[name="bonusxp"]';
group = 'input[name="group"]';
groupxp = 'input[name="groupxp"]';
totalxp = 'input[name="totalxp"]';
inputs = [mode, timeplayed, medal, flags, group].join();

//Event
$(inputs).change(calculate);

//Functions
function calculate() {
  var mod = $(mode).val()
  //base xp
  var bas = timeToSeconds($(timeplayed).val()) * xp[mod]["Base XP"]
  $(basexp).animateNumbers(Math.round(bas));
  //medal xp
  var med = ($(medalc).val() != "None") ? xp[mod][$(medalc).val()] : 0
  $(medalxp).animateNumbers(Math.round(med));
  //bonus xp
  var bon = 0;
  $(flagsc).each(function() {bon += xp[mod][$(this).val()] });
  $(bonusxp).animateNumbers(Math.round(bon));
  //group xp
  var sum = bas + med + bon
  var grp = $(group).is(':checked') ? sum * 0.2 : 0
  $(groupxp).animateNumbers(Math.round(grp));
  //total xp
  var tot = sum + grp
  $(totalxp).animateNumbers(Math.round(tot));
}

function timeToSeconds(str) {
  var p = str.split(':').map(Number);
  return p[0]*60 + p[1];
}

calculate();
