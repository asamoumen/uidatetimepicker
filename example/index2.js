var app = angular.module('app', ['ui.bootstrap', 'ui.bootstrap.datetimepicker']);

app.controller('MyController', ['$scope','$filter', function($scope,$filter) {
//Start Date validation //
    var errorMsg = {"INVALID_DAY": "Date should not be weekends",
        "INVALID_TIME": "The time should be working hours",
        "INVALID_DATE_FORMAT": "Invalid Date",
        "INVALID_DATE_SELECTION": "The wished date should not be less than current date"};
     
  this.isDateValid = function(date) { 
    if(date!= undefined){   
                 if(date.getDay() == 0 || date.getDay() == 6){
                   alert(errorMsg.INVALID_DAY);
                   return false;
                 }else{
                    if((date.getHours() == 8 && date.getMinutes() < 30) || 
                     (date.getHours() == 17 && date.getMinutes() > 30)){
                        alert(errorMsg.INVALID_TIME);
                        return false;
                    }else if(date.getHours() < 8 || date.getHours() > 18){
                        alert(errorMsg.INVALID_TIME);
                        return false;
                    }
                 }
                 return true;
   }else{
        return false;
   }
   
  };
//End Date validation//

    var that = this;
 $scope.$watch('picker.date', function(value) {
console.log(value);
  });
    // when closed picker
    this.picker = {
        date: new Date(),
        dateFormat: 'yyyy-MM-dd HH:mm',
        buttonBar: {
            show: true,
            now: {
                show: false,
                text: 'now!'
            },
            today: {
                show: true,
                text: 'Today!'
            },
            clear: {
                show: true,
                text: 'Wipe'
            },
            date: {
                show: true,
                text: 'Date'
            },
            time: {
                show: true,
                text: 'Time'
            },
            close: {
                show: true,
                text: 'Close'
            }
        },
         datepickerOptions: {
            minDate: new Date(),
        },
        closed: function(args) {
            that.closedArgs = args;
            var isDateValid = that.isDateValid(new Date(args.closeDate));
            if(!isDateValid)
                that.picker.date = null;
            else
                console.log("qsfsd"+$filter('date')(that.picker.date, 'dd-MM-yyyy HH:mm'));
        }
    };

    this.openCalendar = function(e, picker) {
        that[picker].open = true;
    };

}]);