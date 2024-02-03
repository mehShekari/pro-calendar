"use strict";

class App
{
    constructor()
    {
        this.calendarWrapperElement = document.querySelector(".calendar_wrapper");
        this.weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        this.calendar = [];
        this.dateConstructor = Date;
        this.dateInstance = new Date();
        this.year = this.dateInstance.getFullYear();
        this.month = this.dateInstance.getMonth() + 1;
        this.day = this.dateInstance.getDay();
        this.localDate = this.dateInstance.toLocaleDateString('fa-IR');
        this.daysPerMonth = (year, month) =>
        {   
            // return current day in month
            // months start from 0 to 11
            if(year == null && month == null) return new this.dateConstructor().getDate(); 
            return new this.dateConstructor(year, month, 0).getDate();
        }
        this.render();
    }

    generateTemplate()
    {
        const totalDays = Math.ceil(this.calendar.length / this.weekDays.length) * this.weekDays.length;
        let prev = [];
        let next = [];
        
        this.weekDays.forEach(_day =>
        {
            const dayEl = document.createElement("div");
            dayEl.style.fontSize = "1.6rem"
            dayEl.textContent = _day
            this.calendarWrapperElement.appendChild(dayEl);
        })

        if(this.calendar[0].dayofWeek > 0)
        {
            for (let i = this.calendar[0].dayofWeek; i > 0; i--)
            {
                prev.push({i: i- 1})
            }
        }

        for (let i = this.calendar.length; i < totalDays; i++)
        {
            next.push({i: i + 1})
        }

        this.calendar = [...prev, ...this.calendar, ...next];

        this.calendar.forEach(_item =>
        {
            const girdEl = document.createElement("div");
            girdEl.classList.add("gird");   
            if(31 === _item?.dayofMonth)
            {
                girdEl.classList.add("active")
            }
            girdEl.textContent = _item?.dayofMonth 
            this.calendarWrapperElement.appendChild(girdEl);
        })

        console.log("dsfds", this.daysPerMonth(2024, 2, 0))
    }


    generateCalendar()
    {
        for (let i = 1; i <= this.daysPerMonth(this.year, this.month); i++)
        {
            let dayObj = { 
                dayName: this.weekDays[new Date(this.year, this.month, i).getDay()],
                dayofMonth: i,
                dayofWeek: new Date(this.year, this.month, i).getDay(),
                monthIndex:  this.month + 1,
                monthName: this.months[this.month],
                events: []
            }

            this.calendar.push(dayObj)
        }

        this.generateTemplate()
    }

    nextMonth()
    {

    }

    prevMonth()
    {

    }

    render()
    {
        this.generateCalendar()
    }
}


window.onload = () => new App();