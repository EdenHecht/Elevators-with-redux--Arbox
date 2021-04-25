# Elevators-with-redux--Arbox
Arbox home exercise (React) - junior fullstack developer

### my work propcess documentation:

#### TLDR: 
I started by making the layout, and basic components: Building, Floor, Elevator.
Then i discovered a bug- the state is being overriden when calling several elevators at the "same" time. 
So, is decided to refactop the code using redux. That made the code more readable and bug free.
After making all mandatory parts work as they should, i made a Settings component, where the user can decide the number of floors and elevators,
and a StopWatch component, which shows the seconds count from the call to the moment an elevator arrives. 

#### 1. first layout, no functionality

This is a layout commit- full base structure layout with SCSS.
process:
First, i created 3 component- Building, Floor, Elevator.
The App component is rendering the Building component.
The building component defines the number of floors (10) and the number of elevators (5).
Then it loops to crate a Floor component for each of the 10 floors.
It also passes the floor number and the number of elevators (in redux we wouldn't need that props, we would keep it in the store).
The floors are nested inside a table tag.
The Floor component is a table row (the parent is a tr tag) with td's like so:
1. the first table data is the floor's name (1st, 2nd ...)
2. then there are the elevators cells, which are created similarly to the floor loop in the Building component)
3. the last table data in a floor row is the call button

So, for now, i only implemented the basic layout without any real logic. 

#### 2. "calling an elevator" logic implementation - almost done

I moved the floor initialization from the building component to a utils file.
There, i create an array of objects. also, i created an init function for the elevators as well.
Both of those functions are being called on page load (use effect with no dependencies) and the result arrays are saved using useState.

I also implemented a handleElevatorCall, which is being passed as props to each Floor child component, and is dispatched on "call" button click.
This is where the logic for finding the closest available elevator (using some utils functions as well).
If there is an available elevator, we update the elevators array and the floors array accordingly.
If not, the floor number is entered to the queue (an array state variable in Building component).

At this point, i implemented all the "Calling an elevator" part except the animation.

#### 3. refactor react base project to react-redux

I had a bug in the original react (without redux) project, when the user press on many floors at the same time the state is overridden.
Javascript doesn't have "lock" statement (it is one threaded) so i decided to try refactor the code to work with redux.
I managed to implement all the "Calling an elevator" and "Elevator reached the floor" parts except the audio part, but i still have bugs - some of the dispatches are being called multiple times when they only need to be called once (maybe the setTimeout is the problem, i need to keep debugging)

#### 4. finished requirements, bug fixed

I decided to refactor the code a little bit-
every call for elevator will now enter the queue.
whenever the queue is updated, the useEffect with the queue dependency, will dispatch an "elevator call" for the first value in the queue.
This way, all calls are being saved and there are no overrides.
Also, the last bug was some dispatches was being dispatched twice.
That was because the condition "if(elevatorInfo.isMoving)" in the elevator component  was not "strong" enough-  isMoving changes to false only after the 2 seconds delay.
I also re-arranged the files and folders to be more organized.
I still have left the stopwatch feature, but i will implement it with the bonus part

#### 5. finished with bonus!

i made a new component for the settings. when the user clicks on start a dispatch is fired with the relevant settings.
i also made a start watch for each floor (when calling an elevator, the count will appear on the right side, next to the call button)
