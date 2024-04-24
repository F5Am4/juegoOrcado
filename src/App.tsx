import { useEffect, useState } from "react"
import { HangImage } from "./components/HangImage"
import { letters } from "./helpers/letters"
import { getRandomWord } from "./helpers/getRandomWord"

function App() {

  const [ word, setWord ] = useState ( getRandomWord() )//declaramos la palabra secreta
  const [ hiddenWord, setHiddenWord ] = useState ( '_ '.repeat(word.length) )//declaramos la separación de las letras de la palabra secreta
  const [ attempts, setAttempts ] = useState(0)//declaramos los intentos de cada sesión
  const [ lose, setLose ] = useState ( false )//declaramos si perdió el jugador
  const [ won, setWon ] = useState ( false )//declaramos que ganó el jugador

//determina si el jugador perdió
  useEffect( () => {
  if ( attempts >= 9 ){
    setLose( true )
    }
  }, [ attempts ] )

//determinar si la persona ganó
  useEffect( () => {
    console.log(hiddenWord);

    const currentHiddenWord = hiddenWord.split(' ').join(' ')
    if ( currentHiddenWord === word ){
      setWon( true )
    }
  }, [ hiddenWord, word ] )

  const chekLetter = ( letter: string ) => {//revisamos las letras de la palabra: Numero de letras
    if ( lose ) return
    if ( won ) return

    if ( !word.includes(letter) ){
      setAttempts( Math.min( attempts + 1, 9))//declaramos las oportunidades que tienes por juego: min 1, max 9
      return
    }

    const hiddenWordArray = hiddenWord.split(' ')


    for ( let i = 0; i < word.length ; i++ ) {
    if (word[i] === letter) {
      hiddenWordArray[i] = letter
      }
    }

    setHiddenWord(hiddenWordArray.join(' '));

  }

    const newGame = () => {
      const newWord = getRandomWord()

      setWord( newWord )
      setHiddenWord( '_ '.repeat(newWord.length))
      setAttempts(0)
      setLose( false )
      setWon( false )
    }

  return(
    <div className='App'>

      {/* Imagenes */}
      <HangImage imageNumber= { attempts }/>

      {/* Palabra Oculta */}
      <h3>{ hiddenWord } </h3>

      {/* Contador de intentos */}
      <h3>Intentos: { attempts }</h3>

      {/* Mensaje si perdió */}
      {
        ( lose )
        ? <h2>Perdió, la palabra era : { word }</h2>
        : ''
      }

      {/* Mensaje si ganó */}
      {
        ( won )
        ?  <h2>Ganaste! tu ganaste</h2>
        : ''
      }

      {/* Botones de Letras */}
      {
        letters.map((letter) => (
          <button
          onClick={ () => chekLetter( letter ) }
          key={letter}>
            { letter }
            </button>
        ))
      }

      <br /><br />

      <button onClick={ newGame }>¿Nuevo Juego?</button>
    </div>
  )
}

export default App

