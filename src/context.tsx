import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

 type NewCocktails = {
  id: string,
  name: string,
  image: string,
  info: string,
  glass: string,
  age: number,
  emoji: string,
  agePlusEmoji: string
}[]

type ContextProviderValue = {
  loading: boolean
  cocktails: NewCocktails,
}

const defaultValue = {loading: true, cocktails: [{
  id: "string",
  name: "string",
  image: "string",
  info: "string",
  glass: "string",
  age: 1,
  emoji: "string",
  agePlusEmoji: "string"

}]}



const urlCocktails = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext<ContextProviderValue>(defaultValue)

const AppProvider = ({children}: any ) => {
  const [loading, setLoading] = useState(true)
  const [cocktails, setCocktails] = useState<NewCocktails>([])

  const fetchDrinks = useCallback( async () => {
    setLoading(true)
    try {
      const response = await fetch(`${urlCocktails}`)
      const data = await response.json()
      const { drinks } = data

       const newDrinksPromises = drinks.map(async (drink: any) => {
        let strAlcoholic = drink['strAlcoholic']
        const obj = await fetch('https://api.agify.io?name=' + strAlcoholic).then(response => response.json());
             drink.age = obj.age
      
            if(drink.age) {
             drink.agePlusEmoji = drink.age + " 🧓"
            } else {
              drink.agePlusEmoji = "<18" + " 👶"
             }
          return drink      
      }); 
        const newDrinksWithAge = await Promise.all(newDrinksPromises)
        console.log(newDrinksWithAge)


      if (newDrinksWithAge) {
        const newCocktails = newDrinksWithAge.map((item) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
            age,
            emoji,
            agePlusEmoji
          } = item

          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
            age,
            emoji,
            agePlusEmoji
          }
        })
        setCocktails(newCocktails)
      } else {
        setCocktails([])
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  },[])
  useEffect(() => {
    fetchDrinks()
  }, [fetchDrinks])
  return (
    <AppContext.Provider
      value={{ loading, cocktails} }
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
