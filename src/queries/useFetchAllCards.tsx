
import { YGOCard } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface AxiosResult {
  data: {
    data: YGOCard[]
  }
}

const useFetchAllCards = () => {
  
  const query = useQuery({
    queryKey:[`fetch_all_cards`],
    queryFn: async () => {
      const { data: { data: cards } }:AxiosResult = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php')
      return cards
    },
  });

  return query
}

export default useFetchAllCards