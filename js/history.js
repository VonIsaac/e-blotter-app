const historyAlign = document.querySelector('.history-elements')


async function getHistoryListData(){
    try{
        const response = await fetch('http://localhost/e-blotter-backend/history/list');

        if(!response.ok){
            throw new Error(`This is an HTTP error: The status is ${response.status}`);
        }

        const data = await response.json()
        console.log(data);
        displayHistoryList(data)
        //call the fn inside the fetching fn

    }catch(err){
        console.error(err)
    }
}


const displayHistoryList = (data) => {
    const displayAllData = data.map(history => {
        // creat a div for append all the element that wee creat 
        const div = document.createElement('div');
        div.classList.add('container-history');

        //creat another div to wrap the data elements
        const wrapData  = document.createElement('div')
        wrapData.classList.add('wrap-container')

        // convert the date into redable format
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateHistory = new Date(history.created_at).toLocaleDateString('en-PH', options);
        const dateAndTime = document.createElement('h1')
        dateAndTime.textContent =  dateHistory

        wrapData.appendChild(dateAndTime)

        const nameHistory = document.createElement('p');
        nameHistory.textContent = `${history.description}`

        wrapData.appendChild(nameHistory)

        // then append the wrapdata by div that i return
        div.appendChild(wrapData)

        return div
    });

    displayAllData.forEach(history => historyAlign.appendChild(history))
}


getHistoryListData()