
function prepareDateList(month, array) {
    // array is from state for date column being processed
    // dateList will be the dates after processing
    // for formatting depending on if STO, event or blocked
    let info = array; 
    let dateList = [];
            
    for (let i = 0; i < info.length; i++) {
    
        switch(info[i].from_table) {
            case 'BLOCKED': 
                if (String(info[i].start_date.substring(5,5)) === 0) {
                        start = info[i].start_date.substring(6,10);
                    } else {
                        start = info[i].start_date.substring(5,10)
                    }
                        dateList.push(  
                            <p>{start} RESTRICTED</p>);
                            break;

            case 'STO': 
                if (String(info[i].start_date.substring(5,5)) === 0) {
                        start = info[i].start_date.substring(6,10);
                    } else {
                        start = info[i].start_date.substring(5,10)
                    }

                if (String(info[i].end_date.substring(5,5)) === 0) {
                        end = info[i].end_date.substring(6,10);
                    } else {
                        end = info[i].end_date.substring(5,10)
                    }
                    
                //check if start and end date match
                if (info[i].start_date === info[i].end_date) {
                        dateList.push(  
                            <p>{start} {info[i].initials}</p>);
                    } else {
                      //end date is different - concantenate start & end
                        dateList.push(  
                            <p>{start} thru {end} {info[i].initials}</p>);
                    }
                        break;

            case 'EVENT':
                if (String(info[i].start_date.substring(5,5)) === 0) {
                        start = info[i].start_date.substring(6,10);
                    } else {
                        start = info[i].start_date.substring(5,10)
                    }
                        dateList.push(  
                            <p>{start} {info[i].initials}</p>);
                            break;
                default: 
                    console.log("There was an issue in the prepareDateList function.")
                }
        switch(month) {
            case 0:
                const dateList0 = [...dateList]
                return dateList0
            case 1:
                const dateList1 = [...dateList]
                return dateList1
            case 2:
                const dateList2 = [...dateList]
                return dateList2
        }
    }
}
