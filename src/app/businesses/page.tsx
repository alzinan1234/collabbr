// app/directory/page.tsx

import FilteringAndSuggested from "@/components/ForBusinesses/FilteringAndSuggested";
import InfluencerDirectory from "@/components/ForBusinesses/InfluencerDirectory";
import { mockInfluencers } from "@/components/ForBusinesses/mockInfluencers";


export default function DirectoryPage() {
  return (
    <div className=" bg-white">
     <InfluencerDirectory/>
    </div>
  );
}