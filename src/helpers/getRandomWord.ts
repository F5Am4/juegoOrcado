

const words: string[] = [
    'COMPUTADORA',
    'AGUACATE',
    'BARRIO AZUL',
    'BAJIO',
    'AEROPUERTO',
    'DEPORTIVO RAMOS',
    'WINDOWS',
    'DODGE',
    'LOS PINOS'
]


export function getRandomWord(){
    const randomIndex = Math.floor (Math.random() * words.length)


    return words[randomIndex]
}