
export const dateFetch = (date) => {

    let dateArray = [];
    if (date.length === 1){
        const newDate = new Date(date[0]);
        const month = newDate.getMonth() + 1;
        const day = newDate.getDate();
        const dayOfWeekString = newDate.toLocaleDateString('ko', { weekday: 'long' }); 

        dateArray.push({
            order : 1,
            date : month+"."+day,
            dayOfWeekString
        });
    }else if (date.length === 2){
        const firstDay = new Date(date[0]);
        const lastDay = new Date(date[1]);

        const timeDiff = Math.abs(lastDay.getTime() - firstDay.getTime());
        const daysDiff = Math.ceil(timeDiff / (24 * 60 * 60 * 1000)) + 1;
        for (let i=0;i<daysDiff;i++){
            const newDate = new Date(firstDay);
            newDate.setDate(firstDay.getDate()+i);

            const month = newDate.getMonth() + 1;
            const day = newDate.getDate();
            const dayOfWeekString = newDate.toLocaleDateString('ko', { weekday: 'long' }); 
            dateArray.push({
                order : i+1,
                date : month+"."+day,
                dayOfWeekString
            });
        }
    }
    return dateArray;
};