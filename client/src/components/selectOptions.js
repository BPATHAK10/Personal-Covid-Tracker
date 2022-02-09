const status = [
    { id: '1', title: 'Infected' },
    { id: '2', title: 'Isolation' },
    { id: '3', title: 'Recovered' },
    { id: '4', title: 'Death' },
]

const vaccinationStatus = [
    { id: 'vaccinated', title: 'Vaccinated'},
    { id: 'not Vaccinated', title: 'Not Vaccinated'},
    { id: 'unknown', title: 'unknown'},
]

const daysFromInfection = [
    {
        id: '0',
        title: "0 to 14 days",
        array: [0, 14]
    },
    {
        id: '1',
        title: "14 to 28 days",
        array: [14, 28]
    },
    {
        id: '2',
        title: "more than 28 days",
        array: [28, 100000000]
    },
    
]

export {
    status,
    vaccinationStatus,
    daysFromInfection
}