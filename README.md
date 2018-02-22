# pair-rotation

This is a super simple app to suggest new pair rotations for your team.
The following commands are currently available:

    # This will show all possible pairs and the times they've paired
    ./bin/pair-rotation show

It will display all possible pair combinations for your team, sorted by
the number of times each two people have paired. To choose the next pair
for a particular story, just pick the top-most combination from the list
since it will be the pair that has worked together the least amount of
times.

Once you have picked your pair, just go ahead and:

    # This will increment the pair time for "name1 - name2"
    ./bin/pair-rotation new-pair <name1> <name2>

It will increment the number of times you and your pair have worked
together and save it to `rotation.json`. This file keeps track of the
historical information.


## Usage

Just clone the repo, create your `team.json` file (you can use the
`team.sample.json` as a starting point) and you're ready to roll.
