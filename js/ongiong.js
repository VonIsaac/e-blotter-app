const mainAlign = document.querySelector('.ongoing-elements')
const mainDone = document.querySelector('.done-elements')
const noteModal = document.getElementById("noteModal");
const viewNoteModal = document.getElementById("notes-modal");
const noteContent = document.getElementById("notes-container");
let selectedComplaintId = null;



function openNoteModal(complaintId) {
    selectedComplaintId = complaintId;
    noteModal.style.display = "flex";
  }

  function closeModal() {
    noteModal.style.display = "none";
    document.getElementById("noteText").value = ""; // Clear textarea
  }

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

async function submitNote() {
    const noteText = document.getElementById("noteText").value.trim();
    if (!noteText) {
      alert("Please enter a note before submitting.");
      return;
    }

    const historyData = {
      complain_id: selectedComplaintId,
      description: noteText,
    };

    try {
      const response = await fetch('http://localhost/e-blotter-backend/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(historyData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        closeModal();
        window.location.reload();
      } else {
        alert(result.message || 'Error creating history record.');
      }
    } catch (error) {
      console.error("Error:", error);
      alert('An error occurred while submitting the note.');
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
                complaint_no: id,
                
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

async function viewNote(id, description){
    
    try{
        const response = await fetch('http://localhost/e-blotter-backend/history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                complain_id: id,
                description: description // Include description
            })
        });

        console.log(response)
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }else{
            alert('Succesfully Set Apointment')
        }

        // clear the input fields when submiting

    }catch(err){
        alert(`An Error Occured${err.message}`)
        console.log('GOT AN ERROR')
    }
}


async function openViewNoteModal(complainId) {
    console.log("Opening modal..."); // Debug message
    try {
        const response = await fetch(`http://localhost/e-blotter-backend/history/single?complain_id=${complainId}`);
        const result = await response.json();

        if (response.ok && result.notes) {
            displayNotes(result.notes);  // Show all notes
        } else {
            noteContent.innerHTML = `<p>${result.message || "Failed to fetch notes."}</p>`;
        }

        viewNoteModal.style.display = "flex";  
    } catch (error) {
        console.error("Error fetching notes:", error);
        noteContent.innerHTML = "<p>Error loading notes.</p>";
        viewNoteModal.style.display = "flex";  
    }
}


function displayNotes(notes) {
    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = '';  // Clear previous notes

    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note-item'); // Optional: for styling


        // Create a paragraph for the note description
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = note.description;

        // Create a paragraph for the note date
        const dateElement = document.createElement('p');
        dateElement.textContent = new Date(note.created_at).toLocaleString(); // Format the date
        dateElement.classList.add('note-date'); // Optional: for styling

        // Append description and date to the note element
        noteElement.appendChild(dateElement);
        noteElement.appendChild(descriptionElement);


        // Append the note element to the container
        notesContainer.appendChild(noteElement);
    });

    // Show the modal
    document.getElementById('notes-modal').style.display = 'flex';
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
            
            markAsDone(ongoing.id).then(() => {
                alert('Success')
            })
        })

        const clearBtn = document.createElement('button')
        clearBtn.textContent = 'Add Note'

        clearBtn.addEventListener('click', () => {
            
            openNoteModal(ongoing.id)
        })


          //creat a tag then link the viewNote page
          const viewNoteBtn =  document.createElement('button')
          // a.href = '../dashboard/viewnote.html';
          viewNoteBtn.textContent = 'View Note'
   
   
           viewNoteBtn.addEventListener('click', () => {
              openViewNoteModal(ongoing.id)  // Replace with your viewNote function
           });

        //append the two buttons
        divsBtns.appendChild(doneBtn);
        divsBtns.appendChild(clearBtn);
        divsBtns.appendChild(viewNoteBtn)
        
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

        // Create a p element to show the type of complain
        const typeComplain = document.createElement('p');
        typeComplain.classList.add('type-complain');
        typeComplain.textContent = `${done.type_of_complaint}`;
        complainName.appendChild(typeComplain);

         // Create an h1 element to show the complainant name
         const complainNames = document.createElement('h1');
         complainNames.classList.add('complain-name');
         complainNames.textContent = `${done.name}`;
         complainName.appendChild(complainNames);

        wrapDiv.appendChild(complainName);

        // Create a div for buttons 
        const divsBtns = document.createElement('div');
        divsBtns.classList.add('container-btns');
        divsBtns.style.display = 'flex';  // Show buttons

        //creat a tag then link the viewNote page
        const viewNoteBtn =  document.createElement('button')
       // a.href = '../dashboard/viewnote.html';
       viewNoteBtn.textContent = 'View Note'


        viewNoteBtn.addEventListener('click', () => {
           openViewNoteModal(done.id)  // Replace with your viewNote function
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


function closeViewNoteModal() {
    viewNoteModal.style.display = "none";
    noteContent.innerHTML = "";  // Clear content on close
}

getOngoingData();
getDoneData()
