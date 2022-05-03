# The Manmmaru Memo
Tips and tactics I use when playing MGSR
* Note that everything here is geared towards power 3-bar characters (Bowser, Wiggler, Wario, Rosalina) and playing the game using Imperial measurements like yards and MPH for wind (not metric system)
* My style of play is largely math/calcuation based, especially on approaches and putting
* I feel this style of play is more reliable to replicate, especially when under pressure, than tactics that are based on "feel"
* Only use D-Pad for shaping unless doing a diagonal shape (can switch to analog for diagonal)

Please feel free to try out these methods

## Driving
* Find a safe reliable driving spot on every hole, go there every single time, using the exact same shaping (unless dealing with strong wind)
  * It is much easier to hit an approach that is 50yds longer from a safe, flat spot on the fairway then a more risky spot where you might end up in slopy rough or a bunker
  * For every 6mph of tailwind, add 1 downshape to the 3rd segment of your normal drive spot, or 1 upshape for every 6mph of headwind -- but with this adjustment it's fine to hit drives the same way as normal even with strong head/tail winds
* Unless the distance is absolutely required, never hit a drive in the "dorito" red zone at the top of the shot guage
* Full drive is 3D/1U/3U.  1D/1U/3U works on drives where you don't want to go too low (like some on Woods -- 5, 12, 16)
* It is much easier to calculate a good long approach (esp on Par 5s) from relatively equally elevated spot on fairway
  * Take low route on Lake 12, Dunes 18, Highlands 3, high route on Dunes 12
* Never diagonal spin unless the route always calls for it
  * Favor doing something like 0/2L/3U instead 0/0/3UL diagonal unless you need to hit around an obstacle in the middle (like Dunes 8 and 9)

## Approaches
* First, calculate the "WEC", the Wind and Elevation Coefficient
  * Step 1) Use elevation finder to get exact up/down elevation of hole
  * Step 2) Then figure out how much of a head/tail wind the shot has
    * For straight winds this is easy
    * For 45-degree diagonal winds, you take roughly 60% of the number
    * For other angles, tentatively estimate between straight and 45-degree number
  * Step 3) Divide the head/tail wind number by 2
  * Step 4) Add together the numbers from #1 and #3
    * If it is headwind and upward elevation, add them together.  If it is headwind and downward elevation, use a negative number for the elevation
  * A few examples:
    * 3yds of elevation increase, 18mph of headwind: WEC is 12 = `3 + (18 / 2)`
    * 3yds of elvation decrease, 10mph of 45 forward angled wind: WEC is -8 = `-3 + (-10 * 0.6 / 2)`
    * 6yds of elevation decrease, 12mph of headwind: WEC is 0 = `-6 + (12 /2)`
* With the WEC, decide where to hit with respect to the base of the flag icon
  * If the WEC is between -2 and 2, hit right at the bottom of the flag icon
  * If the WEC is negative -3 or less, you are hitting before the flag icon.  For every 3 of the negative WEC, aim to hit 1 green square below the flag icon
  * If the WEC is positive 3 or more, you are hitting past the bottom of the flag icon.  For every 6 of the positive WEC, aim to hit 1 green square above the bottom of the flag icon.
  * Note that the top of the flag icon is exactly two green squares above the bottom of the flag icon
    * Which means if the WEC is +12 hit exactly at the top of the flag icon -- for example, a par 3 that is 12yds elevation increase without much head/tail wind
  * Notes:
    * As you can see above, upward elevation shots need to be "overhit" less than downward elevation shots need to be "underhit".  This is a core part of the game physics.
    * If the WEC is negative by more than 10 (aka, hitting more than 3 green squares before the flag icon), the formula begins to not work as well.  For example on shots where you are hitting to a downward elevation of more than 12, it tends to become less accurate.
      * In these cases, start requiring more WEC to hit one less green square.  This is important especially on the par 3s that have large downward elevations -- this formula will not work exactly on those, so lab those ones additionally.
      * The approach on Dunes 4, which is about 12yds downward, if there is no wind you can hit 3 green squares less, not 4.
* Now you know where you are hitting on the shot meter, decide what shaping is needed
  * If the lie is downsloped, up-shape on the first segment.  Vice versa too, if the lie is upsloped, down-shape on the first segment.
    * If you see 1-2 lines in the down/upslope lie, do 1U or 1D.  3-4 lines do 2U or 2D.  5-6 lines do 3U or 3D.  If more than 6 lines, then do 3U or 3D but you will also need to overhit/underhit a bit (overhit for uphill lie, underhit for downhill lie).  There isn't a clear science how much to over/under hit here.  However, these lies (7 or more lines up/down hill) are very rare.
  * If you are hitting with a wood (3W or 5W), always downshape 1 on the third segment
    * By the way, never use the Driver on approaches.  It doesn't hit farther than the 3W and the flag position is a lie in its meter.
  * For side shaping to hit around obstacles, I don't have an exact science of how far to aim
    * What I can say is that for woods, 1 left/right on the 2nd segment will have the equivalent affect of about 15mph wind.  For irons, it is less.
* Aim left/right based on the wind and bar slant.  Unfortunately, for long/medium length approaches this is all feel that you get from playing the game, but it is a feel you should be able to build up fairly quickly.
  * On chips, tap/left by tentatively the exact number of left/right wind mph.
  * On short 3D/1U "riser" approaches with 8i or 9i, do 75% of the number of left/right wind mph.  Closer to 50% if doing this with a 5i.
* Lastly, decide the spin
  * Always use super backspin unless there is a good reason not to
  * The main reason you would consider regular backspin is if two things are true:
    * Condition 1) The slope of the green shows that around the pin is sloping upwards
    * Condition 2) There is a headwind of at least moderate strength
  * If these two things are not true, and this is a long/medium approach (not short riser approach or chip), always use standard backspin
    * For those ones, when chipping, use regular backspin by default and standard spin if the two conditions are true
* Fire away!

## Putting
* You can use the Line-Counting Method to improve the accuracy on tough putts.  It doesn't guarantee you can make them, but gives you a greater chance of making them than off "feel", and also even if you miss the 2nd putt will be close.
* How to putt based on line counting
  * Step 1) Switch to the middle-gauge (100ft) putter
  * Step 2) In the middle lane of squares, count the total number of moving "lines" or "dots" you see between you and the cup going the same direction (including the ones right at the start where the ball is)
    * Like if one square has 3 visible sliding/moving dots in the center lane, that counts as 3
    * If there are lines going both directions, they cancel each other out.  If there is a putt with 8 left-moving dots and 3 right-moving dots, treat it as having 5 left-moving dots.
  * Step 3) If it's a long putt and you cannot see exactly how many lines there are in the head-on view, use the overhead view and zoom in near cup to see the full story.  Works well for fairway putts of any length when putting with Bowser or Wiggler and you cannot see the green slope.
  * Step 4) However many lines you see, slightly tap or "click" the opposite direction once on the D-Pad.  Lightly tap.  Not miniscule tap, but not strong tap either.  Light tap.
    * To practice how much a "tap" is, use this method on short easy putts with only a few lines.  After tapping, see if it matches how you're lined up "matches" what you would've done anyway.  This builds the muscle memory of how much a "tap" is.
  * Step 5) Use elevation finder to check how many yds elevation difference there is.  Make adjustments based on elvation (see below)
  * Step 6) Fire away based on elevation
  * Step 7) Ball goes in hole.  Probably.
* How to make the adjustments mentioned in #5 above
  * If the putt is uphill the entire way, remove one "click" or tap for every 0.4yds of elevation increase
    * For example, if there are 9 rightward lines on an 0.8yds uphill putt, only click 7 left, not 9 left
  * If the putt is downhill the entire way with only a minor downslope (0.3yds or less), add one "click" or tap for every 0.1yds of elevation decrease for short putts
    * For example, if there are 6 leftwards lines on a 0.2yds downhill putt, click right 8 times
  * If the putt is downhill the entire way with a strong downslope (0.4yds or more), multiple the number of "clicks" by 1.5x
    * For example, if there are 20 rightward lines on a 0.6yds downhill putt, click left 30 times
  * If the putt has uphill and downhill parts en route, things get more complicate
    * Favor the part of the putt closer to the cup, as the slope affects the ball more the slower it goes.
  * On long putts, understand the slope near the end of the putt affects the ball more than at the start.  Though I can't articulate in a scientific way, in these cases try to make micro-adjustments of adding a few extra clicks if the slope strengthens a lot near the end, or a few less clicks if the slope trails off near the end.
    * Also applies to rain putts because they need to be hit harder, the affect of the early lines on a rain putt will be slightly lessened
* How hard to hit the putt?
  * On short putts, overhit generously unless it is downhill
  * On long uphill putts, for every 0.3yds elevation increase, overhit by the top of the flag icon by 2 green squares (or 2/3 of a green square for every 0.1yds of uphill elevation).
  * On long downhill putts, underhit 1 green square for every 0.1 yds elevation decrease
  * If raining, do what is described above then tentatively 1.3x as hard

Happy Mario Golfing!
