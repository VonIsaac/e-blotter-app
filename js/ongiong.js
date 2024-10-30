const mainAlign = document.querySelector('.ongoing-elements')


async function getOngoingData(){

    try{
        const response = await fetch('http://localhost/e-blotter-backend/complainant/status?status=0');

        if(!response.ok){
            throw new Error(`This is an HTTP error: The status is ${response.status}`);
        };

        const data = await response.json()
        console.log(data)
        //call the fn inside the getALlOngoingData()
        getAllOngoingData(data)
    }catch(err){
        console.error(err)
    }
}


const getAllOngoingData = (data) => {
    const displayAllOngoing = data.map((ongoing) => {
        //creat and div element
        const divs = document.createElement('div');
        divs.classList.add('container-ongoing');

        //creat another div element to append the name and the type of complain
        const wrapDiv = document.createElement('div');
        wrapDiv.classList.add('complain-wrap');


        //creat an another div tp wrap the name and complain
        const complainName = document.createElement('div');
        complainName.classList.add('names-complain');

        //creat an h1 element to show the complainant name
       const complainNames =  document.createElement('h1');
       complainNames.classList.add('complain-name')
       complainNames.textContent = `${ongoing.name}`
       complainName.appendChild(complainNames);

       //creat an p element to show the type of complain
        const typeComplain = document.createElement('p');
        typeComplain.classList.add('type-complain')
        typeComplain.textContent =`${ongoing.type_of_complaint}`
        complainName.appendChild(typeComplain);

        wrapDiv.appendChild(complainName)

        //creat a div for buttons 
        const divsBtns = document.createElement('div');
        divsBtns.classList.add('container-btns');
        divsBtns.style.display = 'none';  // Hide buttons initially

        //creat a buttons
        const doneBtn = document.createElement('button')
        doneBtn.textContent = 'Mark  Done'
        const clearBtn = document.createElement('button')
        clearBtn.textContent = 'Add Note'

        //append the two buttons
        divsBtns.appendChild(doneBtn);
        divsBtns.appendChild(clearBtn);
        
        //then append the divsbtn by wrapdivs
        wrapDiv.appendChild(divsBtns)
        
        //lastly append the append the main divs
        divs.appendChild(wrapDiv);

        

        //toggle the buttons to show and hide
        complainName.addEventListener('click', () => {
            if( divsBtns.style.display ===  'none'){
                divsBtns.style.display = 'flex'; 
            }else{
                divsBtns.style.display = 'none'; 
            }
        });


       return divs;


    });

    displayAllOngoing.forEach(ongoing => mainAlign.appendChild(ongoing))
}

getOngoingData();

