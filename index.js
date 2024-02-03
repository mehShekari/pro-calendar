"use strict";
class App
{
    constructor()
    {
        this.calendarWrapperElement = document.querySelector(".calendar_wrapper");
        this.nextMonthBtnEl = document.querySelector(".next_btn");
        this.prevMonthBtnEl = document.querySelector(".prev_btn");

        this.weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.calendar = [];

        this.dateConstructor = Date;
        this.dateInstance = new Date();
        this.year = this.dateInstance.getFullYear();
        this.month = this.dateInstance.getMonth() + 6;
        this.day = this.dateInstance.getDay();
        this.localDate = this.dateInstance.toLocaleDateString('fa-IR');
        
        this.daysPerMonth = (year, month) =>
        {   
            // return current day in month and length of month
            if(year == null && month == null) return new this.dateConstructor().getDate(); 
            return new this.dateConstructor(year, month + 1, 0).getDate();
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
            const prevMonthLength = this.daysPerMonth(this.year, this.month - 1)

            for (let i = this.calendar[0].dayofWeek; i > 0; i--)
            {
                prev.push({i: i- 1, prevMonth: true, dayofMonth: prevMonthLength - Math.abs(i - 1) });
            }
        }
        
        const nextDiff = totalDays - this.calendar.length - prev.length;

        for (let i = 0; i < nextDiff; i++)
        {
            next.push({i: i, nextMonth: true, dayofMonth: i + 1});
        }
        
        // final form of calendar
        this.calendar = [...prev, ...this.calendar, ...next];

        for (let i = 0; i < this.calendar.length; i++)
        {
            const _item = this.calendar[i];
            const girdEl = document.createElement("div");
            girdEl.classList.add("grid");

            if(this.daysPerMonth() === _item?.dayofMonth && !_item.nextMonth && !_item.prevMonth)
            {
                girdEl.classList.add("active")
            }
            if(_item.prevMonth || _item.nextMonth)
            {
                girdEl.classList.add("not");
            }
            if(_item?.dayofMonth)
            {
                girdEl.textContent = _item?.dayofMonth;
            }
            
            this.calendarWrapperElement.appendChild(girdEl);
        }
        // console.log("last stage", performance.now())
    }

    generateCalendar()
    {
        for (let i = 1; i <= this.daysPerMonth(this.year, this.month); i++)
        {
            let dayObj = {
                id: Math.random() * 1000,
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
        this.month = this.month + 1;
        console.log(this.month)
    }

    prevMonth()
    {
        this.month = this.month - 1;
        console.log(this.month)
    }

    jumpTo()
    {

    }

    render()
    {
        // console.log("first stage", performance.now())
        this.generateCalendar()
    }
}

const app = new App()
window.onload = () => app;