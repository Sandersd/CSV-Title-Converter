if (Meteor.isClient) {

  Template.data.events({
    "change #file_upload ": function(event, template){
      event.preventDefault();

      var file = $('input[type=file]')[0].files[0]; //Grab file

      Papa.parse(file, {  //Parse CSV

        complete: function(results) {
          console.log("Parsing complete:", results);

          start = performance.now();  //start tracking time

          for(var i=1; i < (results.data.length - 1); i++) {  //iterate over rows

            var venueName = results.data[i][0];
            var spaceName = results.data[i][1];
            var usageName = results.data[i][2]; //Grab and label relevant info

            var title = spaceName + ' at ' + venueName + ' for ' + usageName; //Default title without Branding
            var length = title.length;

            if(length < 42) {                         //Add Branding if there's room
              title += ' - Hire Space';
            } else if(length < 55) {
              //Keep ideal title without branding
            }else if(length < 58) {                  //Change wording to shave off some characters
              title = usageName + ' at ' + spaceName + ', ' + venueName;
            } else if(length < 62){                   //Remove all wording
              title = usageName + ' ' + spaceName + ' ' + venueName;
            } else {
              tempString = usageName + ' ' + spaceName + ' ' + venueName;
              title = tempString.substring(0, 54);    //Worst case: put use in front and trim title
            }
            console.log(title + ' ' + title.length);
          }
          console.log('Time took to convert: ' + (performance.now()-start));
        }
      });

    }
  });

}
