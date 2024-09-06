import { useEffect, useState } from "react"


const useGoogleFonts = () => {
    const [fonts, setFonts] = useState([])
    useEffect(() => {
        const fetchGoogleFonts = async () => {
            const response = await fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCHru4wXS7lFSaBWTC3cIhFFlTAwYFsLHs");
            const data = await response.json();
            const items = data.items
            const fonts = items.map((item: any) => item.family);
            setFonts(fonts)
        }
        fetchGoogleFonts();
    }, [])
  return fonts
}

export default useGoogleFonts