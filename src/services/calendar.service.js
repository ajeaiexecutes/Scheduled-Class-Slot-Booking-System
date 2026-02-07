const  generateMonthlyCaledar=(year,month)=>{
    const batches=[];

    let currentDate=new Date(Date.UTC(year,month-1,1))

    for(let batchNumber=1;batchNumber<=3;batchNumber++){
        let classDays=[];
        
        
        while(classDays.length<7){
            if (currentDate.getUTCDay()!==0){
               
                classDays.push(new Date(currentDate).toISOString().split('T')[0]);
                
            }
            currentDate.setUTCDate(currentDate.getUTCDate()+1);
        }
        
        batches.push({
            batchNumber,
            startDate:classDays[0],
            endDate:classDays[6],
            classDays:classDays
        })
        

        if(batchNumber<3){
            let gap=0;
            while (gap<2) {
                if(currentDate.getUTCDay()!==0){
                    gap++
                }

                currentDate.setUTCDate(currentDate.getUTCDate()+1);
            }
        }
    }
    console.log(batches) ;
    

    return batches
}

export default generateMonthlyCaledar