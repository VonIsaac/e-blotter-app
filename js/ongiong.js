const mainAlign = document.querySelector('.ongoing-elements')
const mainDone = document.querySelector('.done-elements')

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

async function getDoneData(){

    try{
        const response = await fetch('http://localhost/e-blotter-backend/complainant/status?status=1');

        if(!response.ok){
            throw new Error(`This is an HTTP error: The status is ${response.status}`);
        };

        const data = await response.json()
        console.log(data)
        //call the fn inside the getALlOngoingData()
        getAllDoneData(data)
    }catch(err){
        console.error(err)
    }
}

async function markAsDone(id){
    try{
        const response = await fetch('http://localhost/e-blotter-backend/complainant/done', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                complaint_no: id
            })
        });

        if(!response.ok){
            throw new Error(`This is an HTTP error: The status is ${response.status}`);
        };

        const data = await response.json()
        console.log(data)
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
        divsBtns.style.display = 'flex';  // Hide buttons initially

        //creat a buttons
        const doneBtn = document.createElement('button')
        doneBtn.textContent = 'Mark  Done'

        doneBtn.addEventListener('click', () => {
            
            markAsDone(ongoing.id)
        })

        const clearBtn = document.createElement('button')
        clearBtn.textContent = 'Add Note'

        //append the two buttons
        divsBtns.appendChild(doneBtn);
        divsBtns.appendChild(clearBtn);
        
        //then append the divsbtn by wrapdivs
        wrapDiv.appendChild(divsBtns)
        
        //lastly append the append the main divs
        divs.appendChild(wrapDiv);

        


       return divs;


    });

    displayAllOngoing.forEach(ongoing => mainAlign.appendChild(ongoing))
}

const getAllDoneData = (data) => {
    const displayAllDone = data.map((done) => {
        // Create and div element
        const divs = document.createElement('div');
        divs.classList.add('done-wrapper'); // You can change this class if needed

        // Create another div element to append the name and the type of complain
        const wrapDiv = document.createElement('div');
        wrapDiv.classList.add('complain-wrap');

        // Create a div to wrap the name and complaint
        const complainName = document.createElement('div');
        complainName.classList.add('names-complain');

        // Create an h1 element to show the complainant name
        const complainNames = document.createElement('h1');
        complainNames.classList.add('complain-name');
        complainNames.textContent = `${done.name}`;
        complainName.appendChild(complainNames);

        // Create a p element to show the type of complain
        const typeComplain = document.createElement('p');
        typeComplain.classList.add('type-complain');
        typeComplain.textContent = `${done.type_of_complaint}`;
        complainName.appendChild(typeComplain);

        wrapDiv.appendChild(complainName);

        // Create a div for buttons 
        const divsBtns = document.createElement('div');
        divsBtns.classList.add('container-btns');
        divsBtns.style.display = 'flex';  // Show buttons

        // Create buttons
        const viewNoteBtn = document.createElement('button');
        viewNoteBtn.textContent = 'View Note';

        viewNoteBtn.addEventListener('click', () => {
            viewNote(done.id); // Replace with your viewNote function
        });

        // const reOpenBtn = document.createElement('button');
        // reOpenBtn.textContent = 'Reopen Case';

        // reOpenBtn.addEventListener('click', () => {
        //     reopenCase(done.id); // Replace with your reopenCase function
        // });

        // Append the two buttons
        divsBtns.appendChild(viewNoteBtn);
        // divsBtns.appendChild(reOpenBtn);

        // Append the buttons to wrapDiv
        wrapDiv.appendChild(divsBtns);

        // Lastly append the main divs
        divs.appendChild(wrapDiv);

        return divs;
    });

    // Append all done cases to the main display area
    displayAllDone.forEach(ongoing => mainDone.appendChild(ongoing))
};


getOngoingData();
getDoneData()
